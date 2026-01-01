# Change: Add Food Calorie Query Feature

## Why
使用者需要一個簡單的介面來查詢食物的熱量資訊，以便追蹤飲食和管理健康。

## What Changes
- 新增食物熱量輸入介面，讓使用者可以輸入食物名稱、熱量數值（整數）和備註（繁體中文）
- 整合 OpenAPI 後端服務 (http://127.0.0.1:5001)，提供食物資料的新增（POST）與清單查詢（GET LIST）功能
- 顯示食物清單，前端依 timestamp 排序（最新在前），格式為多行顯示（名稱、熱量：XX 大卡、建立時間）
- 提交成功後清空表單，允許連續輸入
- 支援 300x500px PiP 視窗尺寸顯示
- 採用現代、清新的配色方案
- 標題使用 "Calo 醬"，搭配可愛的 JK 風格卡通醬油瓶 Logo
- 垂直排列的輸入表單（食物名稱、熱量、備註）
- 允許新增重複名稱的食物
- 空清單顯示「請輸入第一筆食物資料」

## Impact
- 新增 specs: food-query
- 新增前端元件: FoodInputForm, CalorieListDisplay
- 整合 OpenAPI 後端服務 (http://127.0.0.1:5001/api/docs/)
