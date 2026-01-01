import { test, expect } from '@playwright/test';

test.describe('食物熱量記錄功能', () => {
  test('應該顯示正確的標題和空清單提示', async ({ page }) => {
    await page.goto('/');
    
    // 驗證標題
    await expect(page.locator('h1')).toContainText('Calo 醬');
    
    // 驗證空清單提示
    await expect(page.locator('text=請輸入第一筆食物資料')).toBeVisible();
  });

  test('應該能夠輸入並送出食物資料', async ({ page }) => {
    await page.goto('/');
    
    // 填寫表單
    await page.fill('input[id="foodName"]', '雞胸肉');
    await page.fill('input[id="calories"]', '165');
    await page.fill('input[id="notes"]', '烤雞胸肉, 100g');
    
    // 點擊送出按鈕
    await page.click('button[type="submit"]');
    
    // 等待表單清空（驗證提交成功）
    await expect(page.locator('input[id="foodName"]')).toHaveValue('');
    await expect(page.locator('input[id="calories"]')).toHaveValue('');
    await expect(page.locator('input[id="notes"]')).toHaveValue('');
  });

  test('應該驗證必填欄位', async ({ page }) => {
    await page.goto('/');
    
    // 不填寫任何欄位直接送出
    await page.click('button[type="submit"]');
    
    // 驗證錯誤訊息
    await expect(page.locator('text=請輸入食物名稱')).toBeVisible();
  });

  test('應該驗證熱量數值範圍', async ({ page }) => {
    await page.goto('/');
    
    // 填寫食物名稱
    await page.fill('input[id="foodName"]', '測試食物');
    
    // 輸入超出範圍的熱量
    await page.fill('input[id="calories"]', '10000');
    
    // 點擊送出
    await page.click('button[type="submit"]');
    
    // 驗證錯誤訊息
    await expect(page.locator('text=請輸入 0-9999 之間的整數')).toBeVisible();
  });

  test('應該允許新增重複的食物名稱', async ({ page }) => {
    await page.goto('/');
    
    // 第一次新增
    await page.fill('input[id="foodName"]', '蘋果');
    await page.fill('input[id="calories"]', '95');
    await page.click('button[type="submit"]');
    
    // 等待一下確保第一筆已送出
    await page.waitForTimeout(500);
    
    // 第二次新增相同名稱
    await page.fill('input[id="foodName"]', '蘋果');
    await page.fill('input[id="calories"]', '100');
    await page.click('button[type="submit"]');
    
    // 應該不會有錯誤（允許重複）
    await expect(page.locator('input[id="foodName"]')).toHaveValue('');
  });

  test('驗證 PiP 視窗尺寸 300x500px', async ({ page }) => {
    await page.setViewportSize({ width: 300, height: 500 });
    await page.goto('/');
    
    // 驗證主容器的尺寸
    const container = page.locator('div').first();
    const box = await container.boundingBox();
    
    expect(box?.width).toBeLessThanOrEqual(300);
    expect(box?.height).toBeLessThanOrEqual(500);
  });

  test('清單應該顯示正確的格式', async ({ page }) => {
    await page.goto('/');
    
    // 新增一筆測試資料
    await page.fill('input[id="foodName"]', '測試食物');
    await page.fill('input[id="calories"]', '200');
    await page.fill('input[id="notes"]', '測試備註');
    await page.click('button[type="submit"]');
    
    // 等待資料顯示
    await page.waitForTimeout(1000);
    
    // 驗證顯示格式（食物名稱、熱量：XX 大卡、建立時間）
    await expect(page.locator('text=測試食物')).toBeVisible();
    await expect(page.locator('text=熱量：200 大卡')).toBeVisible();
    await expect(page.locator('text=/建立時間：.*/')).toBeVisible();
    await expect(page.locator('text=備註：測試備註')).toBeVisible();
  });
});
