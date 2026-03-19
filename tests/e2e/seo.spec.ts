import { expect, test } from '@playwright/test'

test.describe('SEO・メタデータ', () => {
  test('ホームページにmeta descriptionがある', async ({ page }) => {
    await page.goto('/')
    const description = page.locator('meta[name="description"]')
    await expect(description).toHaveAttribute('content', /Neurosphere/)
  })

  test('ホームページがindex,followである', async ({ page }) => {
    await page.goto('/')
    // Next.jsはrobots metaをデフォルトで出力しないケースもあるため、
    // noindexが無いことを確認
    const robots = page.locator('meta[name="robots"][content*="noindex"]')
    await expect(robots).toHaveCount(0)
  })

  test('お問い合わせページがindex可能である', async ({ page }) => {
    await page.goto('/contact')
    const robots = page.locator('meta[name="robots"][content*="noindex"]')
    await expect(robots).toHaveCount(0)
  })

  test('会社概要ページがindex可能である', async ({ page }) => {
    await page.goto('/company')
    const robots = page.locator('meta[name="robots"][content*="noindex"]')
    await expect(robots).toHaveCount(0)
  })

  test('OGPメタタグが設定されている', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
      'content',
      'website',
    )
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
      'content',
      'ja_JP',
    )
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute(
      'content',
      'Neurosphere',
    )
  })

  test('Twitterカードが設定されている', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image',
    )
  })

  test('faviconが設定されている', async ({ page }) => {
    await page.goto('/')
    const favicon = page.locator('link[rel="icon"]')
    await expect(favicon).toBeAttached()
  })

  test('見出し階層が正しい（h1が1つ）', async ({ page }) => {
    await page.goto('/')
    const h1Count = await page.locator('h1').count()
    expect(h1Count).toBe(1)
  })

  test('html lang属性がjaである', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('lang', 'ja')
  })

  test('canonical URLがwwwに統一されている', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://www.neurosphere.co.jp/',
    )
  })
})
