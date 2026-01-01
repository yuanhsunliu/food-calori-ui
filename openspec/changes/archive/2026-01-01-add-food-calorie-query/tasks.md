# Implementation Tasks

## 1. Setup & Configuration
- [x] 1.1 設定 OpenAPI 後端服務連接 (http://127.0.0.1:5001)
- [x] 1.2 定義 API 介面 (POST /api/foods, GET /api/foods)
- [x] 1.3 準備 JK 風格卡通醬油瓶 Logo 圖片（使用 🍶 emoji）

## 2. UI Components
- [x] 2.1 建立食物輸入表單元件 (FoodInputForm) - 使用 shadcn/ui (Button, Input, Label, Card)
- [x] 2.2 建立熱量清單顯示元件 (CalorieListDisplay) - 使用 shadcn/ui (Card)
- [x] 2.3 建立 Header 元件（"Calo 醬" + JK 醬油瓶 Logo）
- [x] 2.4 實作 300x500px PiP 視窗佈局
- [x] 2.5 套用繁體中文介面文字
- [x] 2.6 套用配色方案 (使用 Tailwind CSS)

## 3. OpenAPI Integration
- [x] 3.1 實作新增食物 API 呼叫 (POST /api/foods) - 包含 food_name, calories, timestamp, notes
- [x] 3.2 實作查詢食物清單 API 呼叫 (GET /api/foods) - 解析 total 和 entries
- [x] 3.3 實作前端 timestamp 排序邏輯（最新在前）
- [x] 3.4 實作輸入驗證 (食物名稱必填、熱量整數範圍 0-9999、備註選填)
- [x] 3.5 實作提交成功後清空表單
- [x] 3.6 實作錯誤處理並在 UI 顯示繁體中文錯誤訊息
- [x] 3.7 處理 OpenAPI 後端服務不可用的情況

## 4. Testing
- [x] 4.1 撰寫 E2E 測試 (使用 Playwright)
- [x] 4.2 測試主要使用情境 (輸入食物、顯示清單、錯誤處理)
- [x] 4.3 驗證 PiP 視窗尺寸正確性
- [x] 4.4 驗證重複食物名稱可正常新增
- [x] 4.5 驗證清單依 timestamp 排序（前端排序）
- [x] 4.6 驗證提交後表單清空
- [x] 4.7 驗證空清單顯示「請輸入第一筆食物資料」
- [x] 4.8 驗證清單顯示格式（名稱、熱量：XX 大卡、建立時間）

## 5. Documentation
- [x] 5.1 更新使用說明 (README.md)
- [x] 5.2 記錄 OpenAPI 整合細節 (API 端點、請求/回應格式、前端排序邏輯)
