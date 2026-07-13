import { state } from "./state.js";

// Stacks for undo and redo
const undoStack = [];
const redoStack = [];
const MAX_DEPTH = 50;

// Temporary holder for the state before an interactive operation starts
let beforeState = null;

/**
 * Captures the current state of shapes before an interaction (draw, move, resize) begins.
 */
export function captureBeforeState() {
  beforeState = structuredClone(state.shapes);
}

/**
 * Discards the captured beforeState without pushing to history.
 */
export function discardBeforeState() {
  beforeState = null;
}

/**
 * Pushes a new snapshot to the undo stack.
 * If a beforeState was captured, it pushes that snapshot (representing the state before the change).
 * Otherwise, it pushes the current state.
 */
export function pushHistory() {
  const snapshot = beforeState ? beforeState : structuredClone(state.shapes);
  
  undoStack.push(snapshot);
  redoStack.length = 0; // Clear redo history on new action
  beforeState = null;   // Reset checkpoint

  if (undoStack.length > MAX_DEPTH) {
    undoStack.shift();
  }
  
  // Trigger state subscribers so UI (like Undo/Redo buttons) can update active/disabled state
  state.notify();
}

/**
 * Performs the undo operation.
 */
export function undo() {
  if (undoStack.length === 0) return;
  
  const current = structuredClone(state.shapes);
  redoStack.push(current);

  const prev = undoStack.pop();
  state.loadState({ shapes: prev });
}

/**
 * Performs the redo operation.
 */
export function redo() {
  if (redoStack.length === 0) return;

  const current = structuredClone(state.shapes);
  undoStack.push(current);

  const next = redoStack.pop();
  state.loadState({ shapes: next });
}

/**
 * Returns the current status of the history stacks.
 * @returns {{ canUndo: boolean, canRedo: boolean }}
 */
export function getHistoryStatus() {
  return {
    canUndo: undoStack.length > 0,
    canRedo: redoStack.length > 0
  };
}

/**
 * Clears the history stacks.
 */
export function clearHistory() {
  undoStack.length = 0;
  redoStack.length = 0;
  beforeState = null;
  state.notify();
}
