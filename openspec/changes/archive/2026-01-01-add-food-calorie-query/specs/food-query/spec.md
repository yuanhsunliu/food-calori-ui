# Food Query Capability

## ADDED Requirements

### Requirement: Food Information Input
The system SHALL provide input fields in Traditional Chinese where users can enter food name, calorie (integer only), and optional notes, with fields arranged vertically.

#### Scenario: User enters food information
- **WHEN** user enters food name (食物名稱), calorie value (熱量), and notes (備註) in vertically arranged fields
- **THEN** the input fields SHALL accept and display the text and numeric value

#### Scenario: User submits food entry
- **WHEN** user clicks the submit button with valid inputs
- **THEN** the system SHALL send POST request to /api/foods with payload `{"food_name": string, "calories": integer, "timestamp": ISO8601, "notes": string}`

#### Scenario: Successful submission clears form
- **WHEN** food entry is successfully submitted
- **THEN** the system SHALL clear all input fields to allow continuous entry

#### Scenario: Duplicate food names allowed
- **WHEN** user submits a food name that already exists
- **THEN** the system SHALL create a new entry (duplicates are allowed)

#### Scenario: Empty input validation
- **WHEN** user attempts to submit with empty food name
- **THEN** the system SHALL display an error message in Traditional Chinese on the UI

#### Scenario: Invalid calorie value
- **WHEN** user enters a non-integer or out-of-range calorie value (not between 0-9999)
- **THEN** the system SHALL display an error message in Traditional Chinese on the UI

#### Scenario: Notes field is optional
- **WHEN** user submits without entering notes
- **THEN** the system SHALL accept the submission with empty notes field

### Requirement: Food List Display
The system SHALL display a list of saved food items with their calorie information in multi-line format, sorted by timestamp on the frontend (newest first).

#### Scenario: Display saved foods
- **WHEN** the application loads
- **THEN** the system SHALL retrieve food entries from OpenAPI backend (GET /api/foods), parse the response `{"total": number, "entries": [...]}`, and display them sorted by timestamp (newest first)

#### Scenario: Multi-line display format
- **WHEN** displaying each food entry
- **THEN** the system SHALL show food name on first line, "熱量：XX 大卡" on second line, and "建立時間：YYYY-MM-DD HH:mm" on third line

#### Scenario: Empty list state
- **WHEN** no food entries exist (total = 0)
- **THEN** the system SHALL display the message "請輸入第一筆食物資料" in Traditional Chinese

### Requirement: OpenAPI Backend Integration
The system SHALL integrate with OpenAPI backend service (http://127.0.0.1:5001) for food data persistence and retrieval using JSON format.

#### Scenario: Add food via POST API
- **WHEN** user submits a valid food entry
- **THEN** the system SHALL call POST /api/foods with JSON payload `{"food_name": string, "calories": integer, "timestamp": ISO8601, "notes": string}`

#### Scenario: Query food list via GET API
- **WHEN** the application needs to display food entries
- **THEN** the system SHALL call GET /api/foods and parse JSON response `{"total": number, "entries": [{id, timestamp, food_name, calories, notes}]}`

#### Scenario: Frontend sorting by timestamp
- **WHEN** food entries are retrieved from backend
- **THEN** the frontend SHALL sort entries by timestamp field in descending order (newest first)

#### Scenario: Backend service unavailable
- **WHEN** OpenAPI backend service (http://127.0.0.1:5001) is unavailable or returns an error
- **THEN** the system SHALL display a friendly error message in Traditional Chinese on the UI

### Requirement: PiP Window Layout
The system SHALL render the interface optimized for a 300x500 pixel Picture-in-Picture window.

#### Scenario: Layout rendering
- **WHEN** the application loads in a PiP window
- **THEN** all UI elements SHALL be visible and properly sized within 300x500 pixels

#### Scenario: Content scrolling
- **WHEN** food list exceeds the visible area
- **THEN** the list area SHALL be scrollable while keeping the input form fixed at the top

### Requirement: Visual Design
The system SHALL use a modern, clean color scheme that conveys health and freshness, with all interface text in Traditional Chinese and a branded header.

#### Scenario: Header with logo and title
- **WHEN** the interface is displayed
- **THEN** the header SHALL show "Calo 醬" as title with a cute JK-style cartoon soy sauce bottle as logo

#### Scenario: Color scheme application
- **WHEN** the interface is displayed
- **THEN** the primary colors SHALL use green tones with white background and gray accents

#### Scenario: Traditional Chinese interface text
- **WHEN** displaying labels, buttons, and messages
- **THEN** all text SHALL be in Traditional Chinese (繁體中文)

#### Scenario: Vertical form layout
- **WHEN** displaying input fields
- **THEN** food name input SHALL be above calorie input, followed by notes input (vertical arrangement)

#### Scenario: Calorie unit display
- **WHEN** displaying calorie values
- **THEN** the unit "大卡" SHALL be appended to the numeric value

#### Scenario: Readability in small window
- **WHEN** displaying text and information
- **THEN** font sizes and contrast SHALL ensure readability in the 300x500px window

### Requirement: Error Message Display
The system SHALL display error messages directly on the web UI in Traditional Chinese.

#### Scenario: Input validation errors
- **WHEN** validation fails (empty name, invalid calorie value)
- **THEN** error messages SHALL appear inline near the input fields in Traditional Chinese

#### Scenario: MCP backend errors
- **WHEN** OpenAPI backend API calls (POST /api/foods or GET /api/foods) fail
- **THEN** an error message SHALL be displayed on the UI in Traditional Chinese

### Requirement: Desktop Browser Support
The system SHALL function correctly on desktop browsers (Chrome, Firefox, Edge, Safari).

#### Scenario: Desktop browser compatibility
- **WHEN** accessed from a supported desktop browser
- **THEN** all features SHALL work as specified

#### Scenario: Mobile browser access
- **WHEN** accessed from a mobile browser
- **THEN** the system MAY display a notice that the feature is optimized for desktop browsers
