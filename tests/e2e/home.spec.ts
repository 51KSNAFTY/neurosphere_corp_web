import { expect, test } from '@playwright/test'

test.describe('ホームページ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('ページタイトルにNeurosphereが含まれる', async ({ page }) => {
    await expect(page).toHaveTitle(/Neurosphere/)
  })

  test('ヒーローセクションにブランド名と主要サービスが表示される', async ({
    page,
  }) => {
    await expect(page.locator('.hero-brand-name')).toHaveText(
      '株式会社ニューロスフィア',
    )
    await expect(page.locator('.hero-brand-tagline')).toHaveText(
      'AI BPO・AIエージェント開発・DX支援',
    )
  })

  test('全セクションが存在する', async ({ page }) => {
    const sections = [
      '#services',
      '#value',
      '#approach',
      '#domains',
      '#updates',
    ]
    for (const id of sections) {
      await expect(page.locator(id)).toBeAttached()
    }
  })

  test('ヘッダーがスティッキーで常に表示される', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 1000))
    await expect(page.locator('.global-header')).toBeVisible()
  })

  test('フッターリンクが正しい遷移先を持つ', async ({ page }) => {
    const companyLink = page.locator('footer a[href="/company"]')
    await expect(companyLink).toBeAttached()

    const contactLink = page.locator('footer a[href="/contact"]')
    await expect(contactLink).toBeAttached()
  })

  test('サービスカードが3枚表示される', async ({ page }) => {
    const cards = page.locator('.business-card')
    await expect(cards).toHaveCount(3)
  })

  test('CTAボタンが存在しクリック可能', async ({ page }) => {
    const ctaPrimary = page.locator('.hero-cta-wrapper a').first()
    await expect(ctaPrimary).toBeVisible()
    await expect(ctaPrimary).toHaveAttribute('href', '/contact')
  })
})

test.describe('ページナビゲーション', () => {
  test('ロゴクリックでホームに遷移する', async ({ page }) => {
    await page.goto('/contact')
    await page.locator('.header-logo').click()
    await expect(page).toHaveURL('/')
  })

  test('CONTACTリンクでお問い合わせページに遷移する', async ({ page }) => {
    await page.goto('/')
    // デスクトップ幅を確保
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.locator('.nav-list a[href="/contact"]').first().click()
    await expect(page).toHaveURL('/contact')
  })

  test('存在しないページで404が表示される', async ({ page }) => {
    const response = await page.goto('/nonexistent-page')
    expect(response?.status()).toBe(404)
  })
})

test.describe('言語切り替え', () => {
  test('デフォルトが日本語', async ({ page }) => {
    await page.goto('/')
    const jpButton = page.locator('.lang-switch-toggle a').first()
    await expect(jpButton).toHaveClass(/active/)
  })

  test('ENボタンで英語に切り替わる', async ({ page }) => {
    await page.goto('/')
    await page.locator('.lang-switch-toggle a:text("EN")').click()

    // 英語テキストが表示される
    await expect(page.locator('.hero-cta-wrapper a').first()).toContainText(
      'Book a Free Consultation',
    )
  })

  test('JPボタンで日本語に戻る', async ({ page }) => {
    await page.goto('/?lang=en')
    await page.locator('.lang-switch-toggle a:text("JP")').click()

    await expect(page.locator('.hero-cta-wrapper a').first()).toContainText(
      '無料相談を申し込む',
    )
  })
})
