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

## Phase 17 — Saved Paper & Draft Workflow

Implemented:
- Saved Papers edit action
- Saved Papers Answer Key action hook
- Safe paper duplication resets status to draft
- Persisted draft collection exposed from Zustand hydration
- Paper Builder accepts an optional existing paper for edit mode
- Active draft snapshot persisted in localStorage
- Existing multi-step builder workflow retained

## Phase 17 — Saved Paper & Draft Workflow

Implemented:
- Saved Paper edit workflow wired into the application
- Existing paper updates preserve its ID instead of creating duplicates
- Saved Paper Answer Key action wired to the Answer Key UI
- Duplicate papers receive a fresh ID and draft status
- Active draft snapshot persistence
- Versioned LocalStorage envelope validation hardened
- Existing multilingual builder and export workflow retained

## Phase 18 — Production Hardening

Implemented:
- Removed duplicate application imports/state declarations that could break TypeScript compilation
- Hardened versioned LocalStorage envelope validation
- Rich DOCX export for sub-questions
- Rich DOCX export for embedded question images
- Rich DOCX export for question tables
- RTL propagation for Arabic/Urdu question and table paragraphs
- Preserved existing PDF, Print, Saved Papers and multilingual workflows
- Maintained mobile-friendly touch targets and print CSS foundations

## Phase 19 — Full QA & Security Hardening

Implemented:
- Removed duplicated paper styling blocks to reduce CSS conflicts
- Preserved mobile and print rules while consolidating renderer CSS
- Extended Zod validation to rich sub-questions, tables and media
- Added strict image data-URL and dimension validation
- Added tag trimming and validation
- Kept MCQ option validation and question field limits
- Reviewed application state wiring for duplicate declarations
- Preserved RTL/LTR, multilingual and export paths

## Phase 20 — Final Production Release

Implemented:
- Production runtime Error Boundary with safe reload recovery
- PWA manifest and installable-app metadata foundation
- Automated GitHub Actions CI for `npm ci`, lint and production build
- Final project structure and deployment documentation foundation
- Production-safe LocalStorage and export error paths retained
- Responsive, multilingual and RTL/LTR architecture retained

### Release commands
```bash
npm ci
npm run lint
npm run build
npm run dev
```

### Deployment
The project is a Vite SPA and can be deployed to Vercel, Netlify, Cloudflare Pages or any static host that supports SPA fallback to `index.html`.

### Important runtime notes
- PDF generation currently runs client-side with `html2canvas` + `jsPDF`.
- DOCX generation currently runs client-side with `docx`.
- Question and paper data are stored locally in the browser.
- Future multi-user/cloud persistence can replace the repository layer without rewriting UI components.

## Project Status
Phase 20 complete. The repository now contains the production-release foundation for the Multilingual Question Paper Generator. Before a public launch, run the CI pipeline and perform browser-level manual checks for the target export/browser matrix.

Run:

npm install
npm run dev
npm run build
