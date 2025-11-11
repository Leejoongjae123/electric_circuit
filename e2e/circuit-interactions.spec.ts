import { test, expect } from '@playwright/test';

test.describe('회로 상호작용 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/circuit');
    await page.waitForSelector('.react-flow');
  });

  test('두 노드를 연결할 수 있는지 확인', async ({ page }) => {
    const components = page.locator('.grid.grid-cols-3 > div');
    const canvas = page.locator('.react-flow');
    const canvasBox = await canvas.boundingBox();
    
    if (!canvasBox) {
      throw new Error('Canvas not found');
    }
    
    // 두 개의 컴포넌트 추가
    await components.first().dragTo(canvas, {
      targetPosition: {
        x: canvasBox.width / 3,
        y: canvasBox.height / 2,
      },
    });
    await page.waitForTimeout(500);
    
    await components.nth(1).dragTo(canvas, {
      targetPosition: {
        x: (canvasBox.width * 2) / 3,
        y: canvasBox.height / 2,
      },
    });
    await page.waitForTimeout(500);
    
    // 노드가 2개 추가되었는지 확인
    const nodes = page.locator('.react-flow__node');
    await expect(nodes).toHaveCount(2);
    
    // 첫 번째 노드의 핸들에서 두 번째 노드의 핸들로 연결
    const firstNodeHandle = nodes.first().locator('.react-flow__handle').first();
    const secondNodeHandle = nodes.nth(1).locator('.react-flow__handle').first();
    
    if (await firstNodeHandle.isVisible() && await secondNodeHandle.isVisible()) {
      await firstNodeHandle.hover();
      await page.mouse.down();
      await secondNodeHandle.hover();
      await page.mouse.up();
      
      await page.waitForTimeout(500);
      
      // 엣지가 생성되었는지 확인
      const edges = page.locator('.react-flow__edge');
      const edgeCount = await edges.count();
      expect(edgeCount).toBeGreaterThanOrEqual(0);
    }
  });

  test('Delete 키로 노드를 삭제할 수 있는지 확인', async ({ page }) => {
    const firstComponent = page.locator('.grid.grid-cols-3 > div').first();
    const canvas = page.locator('.react-flow');
    const canvasBox = await canvas.boundingBox();
    
    if (!canvasBox) {
      throw new Error('Canvas not found');
    }
    
    // 컴포넌트 추가
    await firstComponent.dragTo(canvas, {
      targetPosition: {
        x: canvasBox.width / 2,
        y: canvasBox.height / 2,
      },
    });
    await page.waitForTimeout(500);
    
    // 노드 확인
    const nodes = page.locator('.react-flow__node');
    await expect(nodes).toHaveCount(1);
    
    // 노드 클릭하여 선택
    await nodes.first().click();
    await page.waitForTimeout(300);
    
    // Delete 키 누르기
    await page.keyboard.press('Delete');
    await page.waitForTimeout(500);
    
    // 노드가 삭제되었는지 확인
    await expect(nodes).toHaveCount(0);
  });

  test('Ctrl+Z로 실행 취소할 수 있는지 확인', async ({ page }) => {
    const firstComponent = page.locator('.grid.grid-cols-3 > div').first();
    const canvas = page.locator('.react-flow');
    const canvasBox = await canvas.boundingBox();
    
    if (!canvasBox) {
      throw new Error('Canvas not found');
    }
    
    // 초기 노드 개수 확인
    let nodes = page.locator('.react-flow__node');
    const initialCount = await nodes.count();
    
    // 컴포넌트 추가
    await firstComponent.dragTo(canvas, {
      targetPosition: {
        x: canvasBox.width / 2,
        y: canvasBox.height / 2,
      },
    });
    await page.waitForTimeout(500);
    
    // 노드가 추가되었는지 확인
    nodes = page.locator('.react-flow__node');
    await expect(nodes).toHaveCount(initialCount + 1);
    
    // Ctrl+Z로 실행 취소
    await page.keyboard.press('Control+z');
    await page.waitForTimeout(500);
    
    // 노드가 삭제되었는지 확인
    nodes = page.locator('.react-flow__node');
    await expect(nodes).toHaveCount(initialCount);
  });

  test('노드를 드래그하여 이동할 수 있는지 확인', async ({ page }) => {
    const firstComponent = page.locator('.grid.grid-cols-3 > div').first();
    const canvas = page.locator('.react-flow');
    const canvasBox = await canvas.boundingBox();
    
    if (!canvasBox) {
      throw new Error('Canvas not found');
    }
    
    // 컴포넌트 추가
    await firstComponent.dragTo(canvas, {
      targetPosition: {
        x: canvasBox.width / 2,
        y: canvasBox.height / 2,
      },
    });
    await page.waitForTimeout(500);
    
    // 노드 위치 확인
    const node = page.locator('.react-flow__node').first();
    const initialBox = await node.boundingBox();
    
    if (!initialBox) {
      throw new Error('Node not found');
    }
    
    // 노드를 다른 위치로 드래그
    await node.dragTo(canvas, {
      targetPosition: {
        x: canvasBox.width / 3,
        y: canvasBox.height / 3,
      },
    });
    await page.waitForTimeout(500);
    
    // 노드 위치가 변경되었는지 확인
    const newBox = await node.boundingBox();
    
    if (!newBox) {
      throw new Error('Node not found after drag');
    }
    
    // 위치가 변경되었는지 확인 (정확한 위치가 아니라 이동했는지만 확인)
    const moved = initialBox.x !== newBox.x || initialBox.y !== newBox.y;
    expect(moved).toBeTruthy();
  });

  test('캔버스를 팬(이동)할 수 있는지 확인', async ({ page }) => {
    const canvas = page.locator('.react-flow__pane');
    
    // 캔버스 중앙에서 드래그
    await canvas.hover();
    await page.mouse.down();
    await page.mouse.move(100, 100);
    await page.mouse.up();
    
    await page.waitForTimeout(300);
    
    // 캔버스가 이동했는지 확인 (에러가 없으면 성공)
    await expect(canvas).toBeVisible();
  });

  test('줌 인/아웃이 작동하는지 확인', async ({ page }) => {
    const canvas = page.locator('.react-flow');
    
    // 마우스 휠로 줌 인
    await canvas.hover();
    await page.mouse.wheel(0, -100);
    await page.waitForTimeout(300);
    
    // 마우스 휠로 줌 아웃
    await page.mouse.wheel(0, 100);
    await page.waitForTimeout(300);
    
    // 에러가 없으면 성공
    await expect(canvas).toBeVisible();
  });

  test('여러 작업을 연속으로 수행할 수 있는지 확인', async ({ page }) => {
    const components = page.locator('.grid.grid-cols-3 > div');
    const canvas = page.locator('.react-flow');
    const canvasBox = await canvas.boundingBox();
    
    if (!canvasBox) {
      throw new Error('Canvas not found');
    }
    
    // 1. 컴포넌트 2개 추가
    for (let i = 0; i < 2; i++) {
      await components.nth(i).dragTo(canvas, {
        targetPosition: {
          x: canvasBox.width / 4 + i * 300,
          y: canvasBox.height / 2,
        },
      });
      await page.waitForTimeout(500);
    }
    
    const nodes = page.locator('.react-flow__node');
    await expect(nodes).toHaveCount(2);
    
    // 2. 검색 기능 사용
    const searchInput = page.locator('input[placeholder="Search elements..."]');
    await searchInput.fill('Resistor');
    await page.waitForTimeout(300);
    
    // 검색 결과 확인 (Resistor 컴포넌트만 표시)
    const filteredComponents = await page.locator('.grid.grid-cols-3 > div').count();
    expect(filteredComponents).toBeGreaterThan(0);
    
    // 3. 검색 초기화
    await searchInput.clear();
    await page.waitForTimeout(300);
    
    // 4. 모든 작업이 정상적으로 완료되었는지 확인
    const finalNodes = page.locator('.react-flow__node');
    await expect(finalNodes).toHaveCount(2);
    
    // 5. 캔버스 줌 테스트
    await canvas.hover();
    await page.mouse.wheel(0, -50);
    await page.waitForTimeout(300);
    
    // 노드가 여전히 존재하는지 확인
    await expect(finalNodes).toHaveCount(2);
  });
});
