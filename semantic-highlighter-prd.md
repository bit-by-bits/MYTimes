# 🖍️ Semantic Highlighter  
**Prompt Requirements Document (PRD)**  
**Version:** 0.1  
**Date:** July 2025

---

## 🎯 1. Project Summary  
A web app that highlights specific semantic structures in pasted text to improve readability.

**Supported tag types:**
- Definition  
- Example  
- TODO  
- Quote  

The app uses local, open-source NLP methods.  
User pastes text → backend analyzes → frontend highlights spans.

---

## 🧠 2. Core Features  
- Paste raw text into an input box  
- Click “Analyze” → backend processes and returns span positions and labels  
- Display the same text with colour-coded highlights for each tag  
- Allow the toggle of each tag type (optional)

---

## 🛠 3. Tech Stack  

### Frontend
- Vite + React  
- Tailwind CSS  
- ShadCN UI (for toggle components & layout)

### Backend
- FastAPI  
- spaCy (for NLP tagging)  
- regex (for simple patterns like TODO or inline quotes)

### Hosting & Tools
- Vercel (frontend)  
- Railway (backend)  
- GitHub (version control)

---

## 🧩 4. Tagging Logic  

### **Definition**  
Trigger phrases:
- "is defined as"  
- "refers to"  
- "is the meaning of"  

### **Example**  
Trigger phrases:
- "for example"  
- "such as"  
- "e.g."  

### **TODO**  
Trigger lines/phrases:
- "TODO:"  
- "Fix:"  
- "To be done:"  

### **Quote**  
Trigger phrases:
- "according to"  
- "as stated by"  

---

## 🔁 5. Backend API  

### `POST /analyze`

**Request body:**
```json
{
  "text": "The Semantic Web is defined as a web of linked data. For example, a weather app could use it to fetch forecasts. TODO: Add glossary."
}
```

**Response:**

```json
[
  { "start": 21, "end": 53, "tag": "Definition" },
  { "start": 55, "end": 106, "tag": "Example" },
  { "start": 108, "end": 128, "tag": "TODO" }
]
```

---

## 🎨 6. Frontend Behavior

* Textarea input for the user
* “Analyze” button triggers a POST request to the backend
* Renders output using color-coded `<span>` elements:

```html
<span class="highlight-definition">is defined as a web of linked data</span>  
<span class="highlight-example">For example, a weather app...</span>  
<span class="highlight-todo">TODO: Add glossary</span>  
```

**Tailwind Styles:**

* `.highlight-definition`: `bg-blue-100`
* `.highlight-example`: `bg-green-100`
* `.highlight-todo`: `bg-yellow-100`
* `.highlight-quote`: `bg-purple-100`

---

## 📄 7. Example

**Input text:**

> The Semantic Web is defined as a web of linked data.
> For example, a weather app could use it to fetch forecasts.
> TODO: Add glossary.

**API Output:**

```json
[
  { "start": 21, "end": 53, "tag": "Definition" },
  { "start": 55, "end": 106, "tag": "Example" },
  { "start": 108, "end": 128, "tag": "TODO" }
]
```

---

## ✅ 8. Success Criteria

* End-to-end pipeline: paste → analyze → highlight
* All processing is done locally using open tools
* Clean, intuitive UI
* No external AI API keys or billing required
* Public GitHub repo with deploy instructions
* Deployed on Vercel + Railway
* Screenshot or demo tweet ready

---

## 🚧 9. Dev Tasks

### Backend

* Set up FastAPI app and `/analyze` route
* Implement NLP tagging with spaCy
* Add fallback regex for TODO and quotes
* Return spans in `{ start, end, tag }` format

### Frontend

* Vite + React setup
* Tailwind config and styling
* Text input → API call → render highlights
* Add toggle switches for tags (optional)

---

## 📦 10. Future Enhancements

* Export as markdown or HTML
* Add more tag types (Fact, Citation, Reason)
* Session persistence (localStorage or backend DB)
* Drag-to-tag with AI suggestions (v2)
* Semantic similarity grouping (v3 using sentence-transformers)