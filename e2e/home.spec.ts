import { test, expect } from '@playwright/test';

test.describe('홈페이지 테스트', () => {
  test('홈페이지가 정상적으로 로드되는지 확인', async ({ page }) => {
    await page.goto('/');
    
    // 페이지 타이틀 확인
    await expect(page.locator('h1')).toContainText('회로 설계 툴');
    
    // 설명 텍스트 확인
    await expect(page.locator('p')).toContainText('드래그 앤 드롭으로 쉽게 회로를 설계하세요');
    
    // 시작 버튼 확인
    const startButton = page.locator('a[href="/circuit"]');
    await expect(startButton).toBeVisible();
    await expect(startButton).toContainText('회로 캔버스 시작하기');
  });

  test('컴포넌트 카드가 표시되는지 확인', async ({ page }) => {
    await page.goto('/');
    
    // 3개의 컴포넌트 카드 확인
    const cards = page.locator('.grid.grid-cols-3 > div');
    await expect(cards).toHaveCount(3);
    
    // 각 카드의 텍스트 확인
    await expect(cards.nth(0)).toContainText('저항');
    await expect(cards.nth(1)).toContainText('전원');
    await expect(cards.nth(2)).toContainText('커패시터');
  });

  test('회로 캔버스 페이지로 이동', async ({ page }) => {
    await page.goto('/');
    
    // 시작 버튼 클릭
    await page.click('a[href="/circuit"]');
    
    // URL 확인
    await expect(page).toHaveURL('/circuit');
  });
});
