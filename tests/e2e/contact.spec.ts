import { expect, test } from '@playwright/test'

test.describe('お問い合わせページ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
  })

  test('パンくずリストが表示される', async ({ page }) => {
    await expect(page.locator('.breadcrumb')).toContainText('お問い合わせ')
  })

  test('ページ見出しが表示される', async ({ page }) => {
    await expect(page.locator('.hero-contact h1')).toHaveText('お問い合わせ')
  })

  test('フォームが表示される', async ({ page }) => {
    await expect(page.locator('.contact-form')).toBeVisible()
  })

  test('空フォームの送信がブラウザバリデーションで防がれる', async ({
    page,
  }) => {
    await page.locator('.submit-button').click()

    // ページ遷移せず、フォームページにとどまる
    await expect(page).toHaveURL('/contact')
  })

  test('必須フィールドを入力するとバリデーションが通る', async ({ page }) => {
    await page.fill('#subject', 'テスト件名')
    await page.fill('#lastname-kanji', '山田')
    await page.fill('#firstname-kanji', '太郎')
    await page.fill('#lastname-kana', 'ヤマダ')
    await page.fill('#firstname-kana', 'タロウ')
    await page.fill('#email', 'test@example.com')
    await page.fill('#email-confirm', 'test@example.com')
    await page.fill('#message', 'テストメッセージ')

    // 全フィールド入力済み - バリデーションエラーなし
    const subjectField = page.locator('#subject')
    const isValid = await subjectField.evaluate(
      (el: HTMLInputElement) => el.validity.valid,
    )
    expect(isValid).toBe(true)
  })

  test('メールアドレスフィールドが不正な形式を拒否する', async ({ page }) => {
    await page.fill('#email', 'invalid-email')

    const isValid = await page
      .locator('#email')
      .evaluate((el: HTMLInputElement) => el.validity.valid)
    expect(isValid).toBe(false)
  })
})
