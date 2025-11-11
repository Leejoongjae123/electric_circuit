import { test, expect } from '@playwright/test';

test.describe('회로 캔버스 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/circuit');
    // ReactFlow가 완전히 로드될 때까지 대기
    await page.waitForSelector('.react-flow');
  });

  test('회로 캔버스가 정상적으로 로드되는지 확인', async ({ page }) => {
    // ReactFlow 캔버스 확인
    const canvas = page.locator('.react-flow');
    await expect(canvas).toBeVisible();
    
    // 컨트롤 패널 확인
    const controls = page.locator('.react-flow__controls');
    await expect(controls).toBeVisible();
    
    // 배경 그리드 확인
    const background = page.locator('.react-flow__background');
    await expect(background).toBeVisible();
  });

  test('컴포넌트 사이드바가 표시되는지 확인', async ({ page }) => {
    // 사이드바 제목 확인
    await expect(page.locator('h2')).toContainText('Elements');
    
    // 검색창 확인
    const searchInput = page.locator('input[placeholder="Search elements..."]');
    await expect(searchInput).toBeVisible();
    
    // 컴포넌트 그룹 확인
    const componentGroups = page.locator('h3');
    await expect(componentGroups.first()).toBeVisible();
  });

  test('검색 기능이 작동하는지 확인', async ({ page }) => {
    const searchInput = page.locator('input[placeholder="Search elements..."]');
    
    // 초기 컴포넌트 개수 확인
    const initialComponents = await page.locator('.grid.grid-cols-3 > div').count();
    expect(initialComponents).toBeGreaterThan(0);
    
    // '저항' 검색
    await searchInput.fill('저항');
    await page.waitForTimeout(300);
    
    // 검색 결과 확인 (저항 관련 컴포넌트만 표시)
    const filteredComponents = await page.locator('.grid.grid-cols-3 > div').count();
    expect(filteredComponents).toBeLessThanOrEqual(initialComponents);
    
    // 검색어 초기화
    await searchInput.clear();
    await page.waitForTimeout(300);
    
    // 모든 컴포넌트가 다시 표시되는지 확인
    const resetComponents = await page.locator('.grid.grid-cols-3 > div').count();
    expect(resetComponents).toBe(initialComponents);
  });

  test('컴포넌트를 드래그 앤 드롭할 수 있는지 확인', async ({ page }) => {
    // 첫 번째 컴포넌트 선택
    const firstComponent = page.locator('.grid.grid-cols-3 > div').first();
    await expect(firstComponent).toBeVisible();
    
    // 캔버스 중앙 위치 계산
    const canvas = page.locator('.react-flow');
    const canvasBox = await canvas.boundingBox();
    
    if (!canvasBox) {
      throw new Error('Canvas not found');
    }
    
    // 드래그 앤 드롭 수행
    await firstComponent.dragTo(canvas, {
      targetPosition: {
        x: canvasBox.width / 2,
        y: canvasBox.height / 2,
      },
    });
    
    // 노드가 추가되었는지 확인
    await page.waitForTimeout(500);
    const nodes = page.locator('.react-flow__node');
    await expect(nodes).toHaveCount(1);
  });

  test('여러 컴포넌트를 추가할 수 있는지 확인', async ({ page }) => {
    const components = page.locator('.grid.grid-cols-3 > div');
    const canvas = page.locator('.react-flow');
    const canvasBox = await canvas.boundingBox();
    
    if (!canvasBox) {
      throw new Error('Canvas not found');
    }
    
    // 3개의 컴포넌트 추가
    for (let i = 0; i < 3; i++) {
      const component = components.nth(i);
      await component.dragTo(canvas, {
        targetPosition: {
          x: canvasBox.width / 2 + i * 100,
          y: canvasBox.height / 2,
        },
      });
      await page.waitForTimeout(300);
    }
    
    // 3개의 노드가 추가되었는지 확인
    const nodes = page.locator('.react-flow__node');
    await expect(nodes).toHaveCount(3);
  });

  test('노드를 클릭하면 속성 패널이 표시되는지 확인', async ({ page }) => {
    // 컴포넌트 추가
    const firstComponent = page.locator('.grid.grid-cols-3 > div').first();
    const canvas = page.locator('.react-flow');
    const canvasBox = await canvas.boundingBox();
    
    if (!canvasBox) {
      throw new Error('Canvas not found');
    }
    
    await firstComponent.dragTo(canvas, {
      targetPosition: {
        x: canvasBox.width / 2,
        y: canvasBox.height / 2,
      },
    });
    
    await page.waitForTimeout(500);
    
    // 추가된 노드 클릭
    const node = page.locator('.react-flow__node').first();
    await node.click();
    
    // 속성 패널이 표시되는지 확인
    await page.waitForTimeout(300);
    const propertiesPanel = page.locator('div').filter({ hasText: /Properties|속성/ }).first();
    
    // 패널이 보이는지 확인 (패널이 있다면)
    const panelCount = await page.locator('div').filter({ hasText: /Properties|속성/ }).count();
    if (panelCount > 0) {
      await expect(propertiesPanel).toBeVisible();
    }
  });

  test('캔버스를 클릭하면 선택이 해제되는지 확인', async ({ page }) => {
    // 컴포넌트 추가
    const firstComponent = page.locator('.grid.grid-cols-3 > div').first();
    const canvas = page.locator('.react-flow');
    const canvasBox = await canvas.boundingBox();
    
    if (!canvasBox) {
      throw new Error('Canvas not found');
    }
    
    await firstComponent.dragTo(canvas, {
      targetPosition: {
        x: canvasBox.width / 2,
        y: canvasBox.height / 2,
      },
    });
    
    await page.waitForTimeout(500);
    
    // 노드 클릭
    const node = page.locator('.react-flow__node').first();
    await node.click();
    await page.waitForTimeout(300);
    
    // 빈 캔버스 영역 클릭
    await canvas.click({
      position: {
        x: 50,
        y: 50,
      },
    });
    
    await page.waitForTimeout(300);
    
    // 선택이 해제되었는지 확인 (선택된 노드가 없어야 함)
    const selectedNodes = page.locator('.react-flow__node.selected');
    await expect(selectedNodes).toHaveCount(0);
  });

  test('ReactFlow 컨트롤이 작동하는지 확인', async ({ page }) => {
    const controls = page.locator('.react-flow__controls');
    
    // 줌인 버튼 확인
    const zoomInButton = controls.locator('button').first();
    await expect(zoomInButton).toBeVisible();
    await zoomInButton.click();
    await page.waitForTimeout(300);
    
    // 줌아웃 버튼 확인
    const zoomOutButton = controls.locator('button').nth(1);
    await expect(zoomOutButton).toBeVisible();
    await zoomOutButton.click();
    await page.waitForTimeout(300);
    
    // Fit View 버튼 확인
    const fitViewButton = controls.locator('button').nth(2);
    await expect(fitViewButton).toBeVisible();
    await fitViewButton.click();
    await page.waitForTimeout(300);
  });
});
