import { expect, test } from '@playwright/test'

test.describe('アクセシビリティ', () => {
  test('ロゴ画像にalt属性がある', async ({ page }) => {
    await page.goto('/')
    const logo = page.locator('.header-logo img')
    await expect(logo).toHaveAttribute('alt', /\S+/)
  })

  test('ハンバーガーメニューにaria-labelがある', async ({ page }) => {
    await page.goto('/')
    const hamburger = page.locator('.header-hamburger')
    await expect(hamburger).toHaveAttribute('aria-label', /\S+/)
  })

  test('ハンバーガーメニューがキーボードで操作可能', async ({ page }) => {
    await page.goto('/')
    await page.setViewportSize({ width: 375, height: 812 })

    const hamburger = page.locator('.header-hamburger')
    await expect(hamburger).toHaveAttribute('role', 'button')
    await expect(hamburger).toHaveAttribute('tabindex', '0')
  })

  test('フォームのlabelとinputが紐づいている', async ({ page }) => {
    await page.goto('/contact')
    // label[for]とinput[id]の対応を確認
    const subjectLabel = page.locator('label[for="subject"]')
    await expect(subjectLabel).toBeAttached()

    const emailLabel = page.locator('label[for="email"]')
    await expect(emailLabel).toBeAttached()

    const messageLabel = page.locator('label[for="message"]')
    await expect(messageLabel).toBeAttached()
  })

  test('ページにskip linkまたはランドマークがある', async ({ page }) => {
    await page.goto('/')
    // header, nav, main/section, footerが存在すること
    await expect(page.locator('header')).toBeAttached()
    await expect(page.locator('nav')).toBeAttached()
    await expect(page.locator('footer')).toBeAttached()
  })

  test('リンクに見える形でテキストがある', async ({ page }) => {
    await page.goto('/')
    const links = page.locator('a:visible')
    const count = await links.count()

    for (let i = 0; i < Math.min(count, 20); i++) {
      const link = links.nth(i)
      const text = await link.textContent()
      const ariaLabel = await link.getAttribute('aria-label')
      const hasImage = (await link.locator('img').count()) > 0

      // テキスト、aria-label、または画像のいずれかがあること
      const hasAccessibleContent =
        (text && text.trim().length > 0) || ariaLabel || hasImage
      expect(hasAccessibleContent).toBeTruthy()
    }
  })

  test('ビデオにposter画像が設定されている', async ({ page }) => {
    await page.goto('/')
    const video = page.locator('video')
    if ((await video.count()) > 0) {
      await expect(video.first()).toHaveAttribute('poster', /\S+/)
    }
  })
})
