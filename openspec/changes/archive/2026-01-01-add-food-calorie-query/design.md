# Design: Food Calorie Query Feature

## Context
這是專案的首個核心功能，目標是提供簡單易用的食物熱量查詢介面。該介面將嵌入到 Line Bot 或 Messenger Bot 中，以 PiP 視窗形式呈現，因此需要在有限的空間內提供良好的使用體驗。

## Goals / Non-Goals

### Goals
- 提供直覺的食物搜尋介面
- 快速顯示熱量資訊
- 適配 300x500px PiP 視窗尺寸
- 採用清新、健康的配色方案
- 支援桌面瀏覽器

### Non-Goals
- 行動裝置瀏覽器支援
- 複雜的營養分析功能 (此階段僅顯示基本熱量資訊)
- 使用者帳號系統
- 歷史記錄功能

## Decisions

### Decision 1: UI Framework
- **選擇**: React + shadcn/ui + Tailwind CSS
- **理由**: 符合 project.md 中定義的技術棧，shadcn/ui 提供現代化元件，Tailwind CSS 方便快速調整樣式
- **替代方案**: 
  - Vue.js: 團隊已選定 React
  - Material-UI: shadcn/ui 更輕量且客製化彈性更高

### Decision 2: Data Source
- **選擇**: OpenAPI 後端服務 (http://127.0.0.1:5001/api/docs/)
- **理由**: 
  - 後端提供 RESTful API，支援食物新增與清單查詢
  - 前端專注於 UI 呈現與使用者互動
  - 資料集中管理
- **API 端點**:
  - 新增食物：POST /api/foods
  - 查詢清單：GET /api/foods (LIST)
- **資料模型**: 
  - POST 請求格式：`{"food_name": string, "calories": number, "timestamp": ISO8601, "notes": string}`
  - GET 回應格式：`{"total": number, "entries": [{id, timestamp, food_name, calories, notes}]}`
  - 前端負責依 timestamp 排序（最新在前）

### Decision 3: Layout Structure
- **選擇**: 單頁面應用，垂直佈局
- **理由**: 300x500px 空間有限，垂直滾動更適合小視窗瀏覽
- **輸入表單佈局**: 垂直排列（食物名稱在上、熱量在下、備註在最下）
- **標題**: "Calo 醬"（搭配可愛的 JK 風格卡通醬油瓶 Logo）
- **結構**:
  ```
  ┌─────────────┐
  │   Header    │ (Logo: JK醬油瓶 + Title: "Calo 醬")
  ├─────────────┤
  │   Input     │ 
  │  [食物名稱] │ (垂直排列)
  │  [熱量數值] │ (整數 0-9999)
  │  [備註]     │
  │  [送出按鈕] │
  ├─────────────┤
  │   List      │ (依 timestamp 排序)
  │  雞胸肉     │
  │  熱量：165 大卡
  │  建立時間：2026-01-01 08:00
  │     ...     │ (Scrollable)
  └─────────────┘
  ```

### Decision 4: Color Scheme
- **選擇**: 綠色系為主，搭配白色和淺灰
- **理由**: 
  - 綠色傳達健康、自然的感覺
  - 高對比度確保在小視窗中可讀性
  - 符合現代 UI 趨勢
- **色彩參考**:
  - Primary: Green-500 (#22c55e)
  - Background: White (#ffffff)
  - Text: Gray-900 (#111827)
  - Secondary: Gray-100 (#f3f4f6)

## Risks / Trade-offs

### Risk 1: 資料準確性
- **風險**: 使用者輸入的熱量資料可能不準確
- **緩解**: 提供輸入驗證，確保數值合理 (例如：0-9999 卡路里範圍)

### Risk 2: OpenAPI 後端依賴
- **風險**: 前端依賴 OpenAPI 後端服務 (http://127.0.0.1:5001) 可用性
- **緩解**: 實作錯誤處理機制，當 API 失敗時顯示友善錯誤訊息

### Risk 3: PiP 視窗相容性
- **風險**: 不同瀏覽器的 PiP 實作可能有差異
- **緩解**: 優先支援主流桌面瀏覽器 (Chrome, Firefox, Edge)

## Migration Plan
此為新功能，無需遷移計畫。

## Resolved Questions
1. ✅ **資料來源**: OpenAPI 後端服務 (http://127.0.0.1:5001/api/docs/)，提供新增（POST）與清單查詢（GET LIST）
2. ✅ **介面語言**: 繁體中文
3. ✅ **營養資訊範圍**: 僅顯示熱量 (卡路里)
4. ✅ **錯誤訊息呈現**: 在 Web UI 畫面上直接顯示文字提示
5. ✅ **CRUD 功能**: 僅支援新增與查詢，不提供刪除與編輯功能
6. ✅ **重複食物處理**: 允許重複，每次都新增一筆記錄
7. ✅ **排序方式**: 前端依 timestamp 排序（最新在前）
8. ✅ **表單佈局**: 垂直排列（食物名稱、熱量、備註）
9. ✅ **API 請求格式**: POST `{"food_name": string, "calories": number, "timestamp": ISO8601, "notes": string}`
10. ✅ **API 回應格式**: GET `{"total": number, "entries": [{id, timestamp, food_name, calories, notes}]}`
11. ✅ **提交後行為**: 清空表單，允許繼續輸入
12. ✅ **清單顯示格式**: 多行顯示（食物名稱、熱量：XX 大卡、建立時間：YYYY-MM-DD HH:mm）
13. ✅ **熱量數值**: 僅接受整數 (0-9999)
14. ✅ **Header**: 標題 "Calo 醬"，Logo 使用 🍶 emoji (代替 JK 風格卡通醬油瓶)
15. ✅ **空清單提示**: 「請輸入第一筆食物資料」
16. ✅ **UI 元件庫**: 使用 shadcn/ui 元件（Button, Input, Label, Card）
