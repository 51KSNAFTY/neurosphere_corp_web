import { expect, test } from '@playwright/test'

test.describe('会社概要ページ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/company')
  })

  test('パンくずリストが表示される', async ({ page }) => {
    await expect(page.locator('.breadcrumb')).toContainText('会社情報')
  })

  test('ページ見出しが表示される', async ({ page }) => {
    await expect(page.locator('.hero-title')).toHaveText('会社概要')
  })

  test('会社情報テーブルが表示される', async ({ page }) => {
    await expect(page.locator('.company-table')).toBeVisible()
  })

  test('会社名が正しく表示される', async ({ page }) => {
    await expect(page.locator('.company-table')).toContainText(
      '株式会社ニューロスフィア',
    )
  })

  test('所在地が表示される', async ({ page }) => {
    await expect(page.locator('.company-table')).toContainText('東京都港区')
  })

  test('テーブルの全項目が存在する', async ({ page }) => {
    const labels = ['社名', '英文社名', '所在地', '代表者', '設立', '事業内容']
    for (const label of labels) {
      await expect(
        page.locator(`.company-table th:text("${label}")`),
      ).toBeAttached()
    }
  })
})
