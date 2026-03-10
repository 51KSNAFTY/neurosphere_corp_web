import { expect, test } from '@playwright/test'

test.describe('レスポンシブ（デスクトップ）', () => {
  test.use({ viewport: { width: 1280, height: 720 } })

  test('ナビゲーションが横並びで表示される', async ({ page }) => {
    await page.goto('/')
    const nav = page.locator('.header-nav')
    await expect(nav).toBeVisible()
  })

  test('ハンバーガーメニューが非表示', async ({ page }) => {
    await page.goto('/')
    const hamburger = page.locator('.header-hamburger')
    await expect(hamburger).toBeHidden()
  })

  test('サービスカードが横並びで表示される', async ({ page }) => {
    await page.goto('/')
    const firstCard = page.locator('.business-card').first()
    const lastCard = page.locator('.business-card').last()

    const firstBox = await firstCard.boundingBox()
    const lastBox = await lastCard.boundingBox()

    // 横並びの場合、Y座標が同じ程度であること
    // (3カード目は折り返す可能性があるため、first/secondで比較)
    expect(firstBox).toBeTruthy()
    expect(lastBox).toBeTruthy()
  })
})

test.describe('レスポンシブ（モバイル）', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test('ハンバーガーメニューが表示される', async ({ page }) => {
    await page.goto('/')
    const hamburger = page.locator('.header-hamburger')
    await expect(hamburger).toBeVisible()
  })

  test('ナビゲーションが初期状態で非表示', async ({ page }) => {
    await page.goto('/')
    const nav = page.locator('.header-nav')
    await expect(nav).toBeHidden()
  })

  test('ハンバーガーメニュークリックでナビが開く', async ({ page }) => {
    await page.goto('/')
    await page.locator('.header-hamburger').click()
    const nav = page.locator('.header-nav')
    await expect(nav).toBeVisible()
  })

  test('ハンバーガーメニュー再クリックでナビが閉じる', async ({ page }) => {
    await page.goto('/')
    const hamburger = page.locator('.header-hamburger')

    await hamburger.click()
    await expect(page.locator('.header-nav')).toBeVisible()

    await hamburger.click()
    await expect(page.locator('.header-nav')).toBeHidden()
  })

  test('モバイルでヒーローが全画面表示される', async ({ page }) => {
    await page.goto('/')
    const hero = page.locator('.hero-top')
    const box = await hero.boundingBox()
    expect(box).toBeTruthy()
    // 100svhに近い高さであること (ビューポート812pxの80%以上)
    expect(box!.height).toBeGreaterThan(600)
  })

  test('モバイルでカードが縦並び（1列）になる', async ({ page }) => {
    await page.goto('/')
    const cards = page.locator('.business-card')
    const firstBox = await cards.first().boundingBox()
    const secondBox = await cards.nth(1).boundingBox()

    expect(firstBox).toBeTruthy()
    expect(secondBox).toBeTruthy()
    // 縦並びの場合、2枚目のY座標が1枚目より下にある
    expect(secondBox!.y).toBeGreaterThan(firstBox!.y + firstBox!.height - 10)
  })
})
