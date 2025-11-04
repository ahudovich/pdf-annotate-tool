# Whisperit PDF Annotate Tool

## Goal

Build a Next.js app (frontend only) where users can upload PDFs, see a list of uploaded documents, select and annotate them (highlight, draw, comment), and interact with an AI assistant sidebar that can manage (CRUD) comments and help with PDF context.

## Tech Stack

- Framework: Next.js
- UI Kit: Shadcn UI (for consistent, accessible components)
- PDF Annotation: pdf-annotator-react
- AI Assistant: Simple sidebar with dummy API endpoints—CRUD comments, display responses in real time.

## Features & Functionalities

### 1. PDF Upload & List

- Use a Next.js page with a file-upload component (Shadcn upload button)
- Save uploaded PDFs in app state (or local array, no backend needed for demo)
- Display uploaded documents in a sidebar/list, including name, size, and upload date

### 2. PDF Annotate View

- On selecting a document, open it in the main view using pdf-annotator-react

- Support:
-- Highlight, free drawing, add comments
-- Each comment is attached to a specific location/page in the PDF

- Clearly display the current page number and total pages (“Page X of Y”)

### 3. Side AI Assistant

- Fixed (or collapsible) sidebar on the right

- Features:

-- List all comments in the PDF, searchable and paginated
-- Add (Create), Update, Delete individual comments (CRUD)
-- On selecting a comment, highlight the annotation in the PDF
-- Simple chat input box: user types questions about the PDF (e.g., “Summarize page 3”), dummy AI responds (hard-coded or use OpenAI if time allows)

- Each comment/action should update annotation in real time

### 4. UI/UX

- Use Shadcn UI components for inputs, lists, modals, notifications, etc.

- Responsive and simple layout:

-- Left: Document list
-- Center: PDF annotation
-- Right: AI assistant/comments

---

### User Flow

1. User uploads one or many PDFs.
2. User selects a PDF to view; annotator loads it.
3. User can annotate (draw, highlight, add comments).
4. Sidebar shows list of comments (with page/location info).
5. User can ask AI assistant about the PDF, create or edit/delete comments, and jump to them in the document.

--

### Stretch Goals (if time allows)

- Integrate real AI for the assistant (OpenAI API)
- Persist upload/annotations in localStorage
- Allow exporting of annotated PDFs

---

### Deliverable

- One Next.js app, all in one repo, with clear README and launch instructions.
- Demo flow: upload → list → annotate → interact with AI/comments
- 24 hours from email received in a GitHub repo - then jump on a call to discuss this.

---

**Focus on hackathon speed:** Stub or mock anything that takes too long—show UI and comment logic first, real AI and storage are optional extras.
