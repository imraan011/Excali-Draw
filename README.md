# Excali Draw

A lightweight, browser-based drawing board (like Excalidraw) built from scratch using vanilla HTML, CSS, and JavaScript (ES Modules) without frameworks or bundlers.

## Features (Phase 1)
- **Decoupled Architecture**: Separate modules for state management (`state.js`), rendering engine (`canvas.js`), and coordinate conversions (`coordinates.js`).
- **High-DPI Support**: Canvas scaled using `window.devicePixelRatio` for sharp rendering on high-resolution screens.
- **Batched Rendering Loop**: Uses `requestAnimationFrame` to consolidate multiple state changes into a single redraw cycle.
- **Responsive Workspace**: Automatic canvas resize handling matching full-viewport constraints.
- **Dot-Grid Background**: Viewport-aligned drawing background.

## Folder Structure
```
Excali Draw/
├── index.html               # Main HTML entry
├── styles/
│   └── main.css             # Main styling & UI components
└── js/
    ├── main.js              # Application bootstrapper
    ├── core/
    │   ├── state.js         # Decoupled state store (pub-sub)
    │   ├── canvas.js        # Viewport rendering & resizing
    │   └── coordinates.js   # Screen to canvas coordinate conversions
    ├── tools/               # Drawing tools (Phase 2+)
    ├── shapes/              # Shape definition/drawing scripts (Phase 2+)
    └── persistence/         # Local storage & sync helpers (Phase 6+)
```

## Running Locally
Due to security policies in modern web browsers, running files directly using the `file://` protocol will result in CORS blocks on ES modules.

### Option 1: Using Node.js
Serve the project directory locally:
```bash
npx serve
```

### Option 2: Using Python
Serve the folder using Python's built-in server:
```bash
python -m http.server 3000
```
Navigate to `http://localhost:3000` to preview.
