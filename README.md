<div align="center">

# ✎ Sketchflow

**A fast, beautiful, browser-based infinite canvas drawing tool — built from scratch with zero dependencies.**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Vanilla JS](https://img.shields.io/badge/Built%20with-Vanilla%20JS-f7df1e?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![No Build Step](https://img.shields.io/badge/No%20Build%20Step-native%20ES%20Modules-blue)](#running-locally)

</div>

---

Sketchflow is a lightweight, feature-rich whiteboard app inspired by Excalidraw. It runs entirely in the browser using vanilla HTML5 Canvas, pure CSS, and native ES Modules.

This version includes a minimal, premium portfolio landing page featuring a live display-only canvas demo, accompanied by optional scroll-driven animations and loading draw-in sequences powered by GSAP.

---

## ✨ Features

### 🖊 Drawing Tools
| Tool | How to activate | Description |
|---|---|---|
| **Select** | Click toolbar, `V`, or `1` | Select, move, and resize shapes |
| **Hand** | Click toolbar, `H`, or hold `Space` | Pan the viewport without drawing |
| **Rectangle** | Click toolbar, `R`, or `2` | Draw rectangles with rounded corners |
| **Ellipse** | Click toolbar, `O`, or `3` | Draw ellipses and circles |
| **Line** | Click toolbar, `L`, or `4` | Draw straight lines |
| **Arrow** | Click toolbar, `A`, or `5` | Draw lines with arrowheads |
| **Pencil** | Click toolbar, `P`, or `6` | Freehand strokes with smooth curves |
| **Eraser** | Click toolbar | Erase shapes by touching their outlines |

### 🖱 Select & Edit
- **Resize Handles**: Hovering handles shows appropriate resize cursors (`nwse-resize`, `nesw-resize`, etc.).
- **Smart Hover Cursors**: Shows `move` when hovering a selected shape body and `pointer` when hovering unselected shapes.
- **Multi-select**: Click and drag over empty space to marquee-select and group drag multiple elements.
- **Instant Deletes**: Hit `Delete` / `Backspace` to remove selection, or `Escape` to clear focus.

### ⌨ Keyboard Shortcuts
- `Ctrl + Z` / `Cmd + Z` : Undo drawing, moving, or resizing actions.
- `Ctrl + Y` / `Ctrl + Shift + Z` : Redo actions.
- `Ctrl + C` / `Ctrl + V` : Copy and paste selected items (shifts coordinates by a 20px offset).
- `Ctrl + S` : Trigger instant JSON project export (prevents browser default save dialog).
- `Ctrl + 0` : Reset zoom and viewport pan back to origin.
- **Input Guarding**: All shortcut keys are disabled automatically when focus lies in input fields.

### 🗺 Infinite Canvas
- **Navigation**: Pan with `Space + drag`, middle-mouse drag, or the Hand tool.
- **Zooming**: Scroll wheel zooms in/out anchored directly to your cursor.
- **Bounds**: From **10% → 500%** with zoom indicator controls.

### 💾 Persistence & Exports
- **Autosave**: Progress auto-saves to `localStorage` (debounced 800ms after editing).
- **JSON Export/Import**: Export re-editable `.json` project files, or import them via drag-and-drop.
- **PNG Export**: Downloads a transparent, content-cropped `.png` image based on the tight bounding box of your shapes.

### 🎬 Animations & Landing Page
- **Apple-Style Landing Page**: A restrained, premium marketing page centered around a live canvas rendering static shapes using the app's real `renderShape` engine.
- **Entry Drawing Animation (GSAP)**: Simulates a hand sketching out a borders rectangle around the heading and drawing a curved arrow towards the main CTA on load.
- **Parallax Background**: Layered hand-drawn SVG shapes drift at varied speeds behind the text as you scroll.
- **3D Tilt Preview**: The product canvas frame tilts forward in 3D space, leveling flat as it enters viewport center.

---

## 🏗 Architecture

Sketchflow uses a clean **pub-sub state → render pipeline** with zero coupling between modules:

```
User Interaction
      │
      ▼
  ToolManager          ← dispatches pointer events to active tool
      │
      ▼
  Active Tool          ← shapeTool / selectTool / pencilTool / eraserTool / panTool
      │
      ▼
   state.js            ← single source of truth (shapes[], viewport, selectedShapeIds[])
      │
      ▼ notify()
   canvas.js           ← requestAnimationFrame batched render loop
      │
      ▼
  renderShape.js       ← pure shape renderers (rectangle, ellipse, line, arrow, pencil)
```

History snapshots are deep-cloned via `structuredClone(state.shapes)` to prevent mutations leaking between undo states, and capped at 50 actions to limit memory load.

---

## 📁 Project Structure

```
Sketchflow/
├── index.html                    # Portfolio landing page
├── styles/
│   ├── landing.css               # Landing layout presentation styles
│   └── main.css                  # Core app styles: glassmorphic workspace, modals
├── js/
│   ├── landing.js                # Landing page live canvas demo setup
│   ├── main.js                   # Main application entry coordinator
│   ├── core/
│   │   ├── state.js              # Pub-sub store: shapes, viewport, selection
│   │   ├── history.js            # History manager: undoStack, redoStack, structuredClone
│   │   ├── canvas.js             # RAF render loop, dot-grid overlays
│   │   ├── coordinates.js        # Coordinate transformations (viewport relative)
│   │   └── keyboard.js           # Shortcut actions, input guards
│   ├── tools/                    # Tool handlers (shapes, pencil, selection, eraser, zoom)
│   ├── shapes/                   # Shape creation, hit testing, bounds caching, pure renderers
│   └── persistence/              # LocalStorage, autosave, import/export JSON & PNG
├── app/
│   └── index.html                # Isolated main drawing application page
└── animations/                   # Optional GSAP animations (removable)
    ├── entry-animation.js        # Timeline loading sketches (Letters, wobble box, arrow)
    ├── entry-animation.css       # Starting hidden classes under body.js-animating
    ├── scroll-animation.js       # Parallax SVG generation, icon bobs, 3D tilts
    ├── scroll-animation.css      # Perspective bounds for 3D transforms
    └── README.md                 # Removal guide
```

---

## 🚀 Running Locally

ES Modules require a server (browsers block local `file://` imports). Pick any option:

### Node.js (recommended)
```bash
npx serve
# → http://localhost:3000
```

### Python
```bash
python -m http.server 3000
# → http://localhost:3000
```

### VS Code
Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension and click **Go Live**.

No build step. No install. Open and draw.

---

## 🔧 Technical Decisions

| Decision | Rationale |
|---|---|
| **No Framework / Bundler** | Zero dependencies, instant load, full control over canvas rendering loop. |
| **Separated App / Landing** | Isolated layouts in `/index.html` and `/app/index.html` keeps both architectures clean and easy to maintain. |
| **WeakMap Bounds Cache** | Caches shape bounding boxes inside `bounds.js` to avoid heavy geometric recalculations on select/resize. |
| **Async Confirm Modals** | Custom `Promise`-based modal avoids standard blocking thread jank of `confirm()`. |
| **structuredClone History** | Uses native browser cloning rather than slow `JSON.parse(JSON.stringify())` to avoid reference bugs. |
| **Removable GSAP Layer** | The `animations/` folder operates as an optional layer. Deleting it and its integration lines leaves the landing page fully visible. |

---

## 📄 License

MIT — free to use, fork, and build upon.

---

<div align="center">
  <sub>Built with ✎, vanilla JavaScript, and a little help from AI.</sub>
</div>
