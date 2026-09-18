# Multilingual Question Paper Generator

## Phase 3 — Multilingual i18n + RTL/LTR Engine

Implemented:
- Bangla, English, Arabic and Urdu interface translations
- Native-language language switcher
- Automatic document language and direction
- RTL for Arabic/Urdu and LTR for Bangla/English
- Language metadata and locale architecture
- Direction-aware text component
- Unicode BiDi isolation utility
- Arabic/Urdu font-family fallbacks
- Mixed-language-safe direction architecture
- Language-aware Create Paper workflow labels
- Theme-aware responsive UI retained

### Language codes
- bn → বাংলা / bn-BD
- en → English / en-US
- ar → العربية / ar
- ur → اردو / ur

## Phase 4 — LocalStorage Database & Persistence

Implemented:
- Versioned LocalStorage envelope
- Dedicated storage keys for settings, questions, subjects, papers, drafts and templates
- Safe JSON parsing with fallbacks
- Storage error abstraction
- Generic typed LocalRepository CRUD layer
- Zustand application store
- Demo question seed for all four languages
- Automatic initial hydration from LocalStorage
- Dashboard counters now read from persisted data
- UUID-based entity ID utility

## Phase 5 — Question Bank CRUD

Implemented:
- Full Question Bank list UI
- Add, edit, duplicate and delete questions
- Bulk selection and bulk delete
- Search by question text and subject
- Filter by language, question type and difficulty
- Per-question RTL/LTR direction
- MCQ option editor
- Marks and metadata editor
- Zod validation before persistence
- LocalStorage/Zustand integration
- Responsive mobile-friendly question editor
- Demo questions are immediately editable

## Phase 6 — Advanced Question Editor Foundation

Implemented:
- Chapter and Topic fields
- Tag creation/removal
- Question sorting by newest, oldest and marks
- Expanded metadata editing
- Existing CRUD and validation retained

Next
Phase 7 — Question Paper Builder and multi-step exam workflow.

Run:

npm install
npm run dev
npm run build
