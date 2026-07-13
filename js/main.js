/**
 * Excali Draw - Entry point (main.js)
 * 
 * NOTE: ES Modules direct local files pe CORS restriction block karte hain (file://).
 * Chrome aur modern browsers standard protocols request access allow nahi karte script tag module ke liye.
 * Solution: Run this project using a local server:
 *   - run: `npx serve .` or `python -m http.server`
 *   - or use VS Code Live Server extension.
 */

import { state } from "./core/state.js";
import { initCanvas, resizeCanvas, requestRender } from "./core/canvas.js";

// Initialize canvas flow
const canvasElement = document.getElementById("app-canvas");
if (canvasElement) {
  initCanvas(canvasElement);
} else {
  console.error("Critical Error: canvas element with id 'app-canvas' not found.");
}

// State changes ko subscribe karo updates coordinate coordinate / drawing clear cycles trigger karne ke liye
state.subscribe(() => {
  requestRender();
});

// Window resize handler updates grid dynamic mapping
window.addEventListener("resize", () => {
  resizeCanvas();
  requestRender();
});

// Canvas screen updates initial trigger
requestRender();

console.log("Excali Draw initialized");
export {};
