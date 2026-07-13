import { state } from "../core/state.js";
import { screenToWorld } from "../core/coordinates.js";
import { createShape } from "../shapes/Shape.js";
import { requestRender } from "../core/canvas.js";

// Closure scope variables for pencil drawing state
let activeShapeId = null;
let lastRecordedPos = null;

export const pencilTool = {
  name: "pencil",

  onPointerDown(e) {
    // Current click coordinates ko transform karein
    const coords = screenToWorld(e.clientX, e.clientY, state.viewport);
    lastRecordedPos = coords;

    // Naya pencil shape state store me add karein
    const newShape = createShape("pencil", coords.x, coords.y);
    activeShapeId = newShape.id;

    state.addShape(newShape);
    requestRender();
  },

  onPointerMove(e) {
    if (!activeShapeId || !lastRecordedPos) return;

    const coords = screenToWorld(e.clientX, e.clientY, state.viewport);
    
    // Find active shape directly from state array
    const shape = state.shapes.find(s => s.id === activeShapeId);
    if (!shape || !shape.points) return;

    // Throttle calculation: next point compile tabhi hoga jab gap minimum 3px ka ho
    const dx = coords.x - lastRecordedPos.x;
    const dy = coords.y - lastRecordedPos.y;
    const distance = Math.hypot(dx, dy);

    if (distance >= 3) {
      state.updateShape(activeShapeId, {
        points: [...shape.points, coords]
      });
      lastRecordedPos = coords;
      requestRender();
    }
  },

  onPointerUp(e) {
    if (!activeShapeId) return;

    // Final references cleanup. Single click (points.length === 1) dot form me save rahega.
    activeShapeId = null;
    lastRecordedPos = null;
    
    requestRender();
  }
};
