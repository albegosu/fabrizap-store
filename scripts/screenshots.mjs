import { chromium } from 'playwright'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { mkdirSync, writeFileSync, readdirSync, unlinkSync } from 'fs'
import { appRoutes } from '../src/router/routes.config.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT_DIR = join(__dirname, '..', 'screenshots')
const BASE_URL = process.env.BASE_URL || 'http://localhost:5174'

/**
 * Viewport móvil. deviceScaleFactor 1 evita fallos de recorte en fullPage de Chromium
 * (con 2x a veces se cortaba el menú / header en el PNG largo).
 */
const MOBILE_VIEWPORT = { width: 390, height: 844, deviceScaleFactor: 1 }

const DEMO_FAVORITES = [
  'heritage-low-top',
  'terra-classic',
  'vienna-ballet',
  'milano-loafer',
  'oxford-elena',
]

const DEMO_CART = [
  {
    id: 'demo-cart-1',
    productId: 'heritage-low-top',
    name: 'Heritage Low-Top',
    image:
      'https://images.unsplash.com/photo-1616406432452-07bc5938759d?w=200&h=200&fit=crop',
    price: 189,
    currency: '€',
    size: 40,
    color: '#1B2631',
    quantity: 2,
  },
]

function pathToScreenshotSlug(urlPath) {
  if (urlPath === '/') return 'home'
  return urlPath.replace(/^\//, '').replace(/\//g, '-')
}

const SCREENSHOT_TARGETS = appRoutes.map((r) => {
  const path = r.screenshotPath ?? r.path
  return {
    path,
    slug: pathToScreenshotSlug(path),
    isOnboarding: r.name === 'Onboarding',
  }
})

function routeHasMainChrome(urlPath) {
  if (urlPath === '/onboarding' || urlPath === '/carrito') return false
  if (urlPath.startsWith('/producto/')) return false
  return true
}

async function seedScreenshotDemoState(page) {
  await page.evaluate(
    ({ favorites, cart }) => {
      localStorage.setItem('fz_onboarded', JSON.stringify(true))
      localStorage.setItem('fz_style', JSON.stringify(['casual']))
      localStorage.setItem('fz_contexts', JSON.stringify(['diario']))
      localStorage.setItem('fz_shoe_features', JSON.stringify(['impermeable', 'tacon']))
      localStorage.setItem('fz_favorites', JSON.stringify(favorites))
      localStorage.setItem('fz_cart', JSON.stringify(cart))
    },
    { favorites: DEMO_FAVORITES, cart: DEMO_CART }
  )
}

async function clearStateForOnboardingShot(page) {
  await page.evaluate(() => {
    localStorage.removeItem('fz_onboarded')
    localStorage.removeItem('fz_style')
    localStorage.removeItem('fz_contexts')
    localStorage.removeItem('fz_shoe_features')
    localStorage.removeItem('fz_cart')
    localStorage.removeItem('fz_favorites')
  })
}

/** Convierte header/nav fixed en absolute respecto a la columna alta = scroll completo sin duplicar UI en fullPage. */
async function prepareFullScrollLayout(page) {
  await page.evaluate(() => {
    function pin(el, vertical) {
      if (!el) return
      el.style.setProperty('position', 'absolute', 'important')
      el.style.setProperty('left', '0', 'important')
      el.style.setProperty('right', '0', 'important')
      el.style.setProperty('margin-left', '0', 'important')
      el.style.setProperty('margin-right', '0', 'important')
      el.style.setProperty('transform', 'none', 'important')
      el.style.setProperty('-webkit-transform', 'none', 'important')
      el.style.setProperty('translate', 'none', 'important')
      el.style.setProperty('rotate', 'none', 'important')
      el.style.setProperty('scale', 'none', 'important')
      el.style.setProperty('width', '100%', 'important')
      el.style.setProperty('max-width', 'none', 'important')
      el.style.setProperty('box-sizing', 'border-box', 'important')
      if (vertical === 'top') el.style.setProperty('top', '0', 'important')
      if (vertical === 'bottom') el.style.setProperty('bottom', '0', 'important')
    }

    const column = document.querySelector('#app-layout-column')
    const h = Math.max(
      document.documentElement.scrollHeight,
      document.body?.scrollHeight ?? 0,
      column?.scrollHeight ?? 0
    )
    if (column) {
      column.style.position = 'relative'
      column.style.minHeight = `${h}px`
      column.style.setProperty('overflow-x', 'hidden', 'important')
    }
    document.documentElement.classList.add('fz-screenshot')
    pin(document.querySelector('header.app-top-header'), 'top')
    pin(document.querySelector('nav.app-bottom-nav'), 'bottom')
    const fab = document.querySelector('.app-floating-cart')
    if (fab) {
      fab.style.display = 'none'
    }
  })
}

/**
 * Margen antes del redondeo para que el arco no recorte header ni barra inferior.
 */
/**
 * Recorta el PNG fullPage al ancho/posición real de #app-layout-column (evita menú desplazado).
 */
async function extractLayoutColumnFromFullPage(page, rawBuffer) {
  const dpr = MOBILE_VIEWPORT.deviceScaleFactor
  const box = await page.evaluate(() => {
    const col = document.querySelector('#app-layout-column')
    if (!col) return null
    const r = col.getBoundingClientRect()
    const docH = Math.max(
      document.documentElement.scrollHeight,
      document.body?.scrollHeight ?? 0
    )
    return {
      left: r.left + window.scrollX,
      width: r.width,
      height: docH,
    }
  })
  if (!box) return rawBuffer

  const meta = await sharp(rawBuffer).metadata()
  const imgW = meta.width ?? 0
  const imgH = meta.height ?? 0
  if (!imgW || !imgH) return rawBuffer

  let left = Math.round(box.left * dpr)
  let width = Math.round(box.width * dpr)
  let height = Math.round(box.height * dpr)

  left = Math.max(0, Math.min(left, Math.max(0, imgW - 1)))
  width = Math.max(1, Math.min(width, imgW - left))
  height = Math.max(1, Math.min(height, imgH))

  if (left === 0 && width === imgW && height === imgH) return rawBuffer

  return sharp(rawBuffer)
    .extract({ left, top: 0, width, height })
    .png()
    .toBuffer()
}

async function padAndRoundMobileFrame(pngBuffer) {
  const meta = await sharp(pngBuffer).metadata()
  const w = meta.width ?? 0
  const h = meta.height ?? 0
  if (!w || !h) return pngBuffer

  const rxContent = Math.min(52, Math.round(w * 0.065))
  const pad = rxContent + 36

  const padded = await sharp(pngBuffer)
    .extend({
      top: pad,
      bottom: pad,
      left: pad,
      right: pad,
      background: '#FAF8F5',
    })
    .toBuffer()

  const m2 = await sharp(padded).metadata()
  const w2 = m2.width ?? 0
  const h2 = m2.height ?? 0
  const rx = Math.min(52, Math.round(Math.min(w2, h2) * 0.05))

  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w2}" height="${h2}">
      <rect x="0" y="0" width="${w2}" height="${h2}" rx="${rx}" ry="${rx}" fill="white"/>
    </svg>`
  )

  return sharp(padded)
    .ensureAlpha()
    .composite([{ input: mask, blend: 'dest-in' }])
    .flatten({ background: '#FAF8F5' })
    .png()
    .toBuffer()
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function removeLegacyDesktopScreenshots(dir) {
  for (const name of readdirSync(dir)) {
    if (name.endsWith('-desktop.png')) {
      unlinkSync(join(dir, name))
      console.log(`(eliminado legado) ${name}`)
    }
  }
}

async function run() {
  mkdirSync(OUTPUT_DIR, { recursive: true })
  removeLegacyDesktopScreenshots(OUTPUT_DIR)

  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: MOBILE_VIEWPORT.width, height: MOBILE_VIEWPORT.height },
    deviceScaleFactor: MOBILE_VIEWPORT.deviceScaleFactor,
    isMobile: true,
    hasTouch: true,
  })

  const page = await context.newPage()

  await page.addStyleTag({
    content: `
      /* visible en X hace crecer scrollWidth y el fullPage sale descentrado / corta el menú */
      html, body, #app {
        overflow-x: hidden !important;
        max-width: 100% !important;
      }
      html.fz-screenshot main.flex-1 {
        padding-bottom: 0 !important;
      }
      header.app-top-header {
        -webkit-backdrop-filter: none !important;
        backdrop-filter: none !important;
        background-color: rgba(250, 248, 245, 0.98) !important;
        box-shadow: 0 1px 0 rgba(200, 193, 212, 0.4) !important;
      }
    `,
  })

  await page.goto(BASE_URL)
  await seedScreenshotDemoState(page)

  let count = 0
  for (const route of SCREENSHOT_TARGETS) {
    if (route.isOnboarding) {
      await clearStateForOnboardingShot(page)
    } else {
      await seedScreenshotDemoState(page)
    }

    await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle' })
    await delay(400)

    if (routeHasMainChrome(route.path)) {
      await page
        .locator('header.app-top-header img')
        .first()
        .waitFor({ state: 'visible', timeout: 20000 })
        .catch(() => {})
      await page
        .locator('header.app-top-header img')
        .first()
        .evaluate((img) => (img.decode ? img.decode() : Promise.resolve()))
        .catch(() => {})
    }

    await page.evaluate(async () => {
      if (document.fonts?.ready) await document.fonts.ready
    })
    await delay(400)
    await prepareFullScrollLayout(page)
    await delay(200)

    const raw = await page.screenshot({ type: 'png', fullPage: true })
    const cropped = await extractLayoutColumnFromFullPage(page, raw)
    const rounded = await padAndRoundMobileFrame(cropped)
    const filename = `${route.slug}.png`
    writeFileSync(join(OUTPUT_DIR, filename), rounded)
    count += 1
    console.log(`✓ ${filename}`)
  }

  await browser.close()
  const expected = appRoutes.length
  console.log(
    `\nDone! ${count} capturas móvil (demo perfil/carrito + scroll + menú) → ./screenshots/`
  )
  if (count !== expected) {
    console.warn(`Advertencia: se esperaban ${expected} archivos.`)
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
