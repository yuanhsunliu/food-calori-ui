# Project Context

## Purpose
[Describe your project's purpose and goals]
提供簡單的 web ui 介面，讓使用者可以輸入食物名稱，並查詢該食物的熱量資訊。
此 web ui 網址可以嵌入到其他系統中，例如 Line Bot、Messenger Bot 等，讓使用者可以透過這些平台查詢食物熱量。呈現方式為 Picture-in-Picture (PiP) 視窗。視窗大小約為 300x500 px。
ui 介面不需要支援行動裝置瀏覽器, 只需要支援桌面版瀏覽器即可。
ux 介面需要簡單易用，讓使用者可以快速查詢到所需的熱量資訊。
配色方案需要符合現代設計風格，讓使用者感覺清新、健康。
卡洛里的查詢與增加功能由後端 MCP 服務提供，前端只需要負責呈現與互動。

## Tech Stack
- [List your primary technologies]
- [e.g., TypeScript, React, Node.js]
- TypeScript
- React
- shadcn/ui
- Tailwind CSS

## Project Conventions

### Code Style
[Describe your code style preferences, formatting rules, and naming conventions]

### Architecture Patterns
[Document your architectural decisions and patterns]

### Testing Strategy
[Explain your testing approach and requirements]
- MUST write BDD-style test case descriptions for playwright E2E tests
- 測試重點在於確保元件行為符合預期，並涵蓋主要使用情境即可
- 不需要覆蓋所有邊界情況
- E2E 測試可使用 Playwright 實作，重點在於模擬使用者操作流程

### Git Workflow
[Describe your branching strategy and commit conventions]

## Domain Context
[Add domain-specific knowledge that AI assistants need to understand]

## Important Constraints
[List any technical, business, or regulatory constraints]
- 不要自己寫 UI 元件，盡量使用 shadcn/ui 提供的元件來組合出所需的介面.
- 安裝需要使用的 shadcn/ui 元件庫，並參考官方文件來使用這些元件.

## External Dependencies
[Document key external services, APIs, or systems]
- 可以用 food-calorie-api 問到如何使用 api 或是使用 openapi 規格文件[http://127.0.0.1:5001/api/docs/]來了解 api 規格
