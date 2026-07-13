// Base shape object design aur creation logic

/**
 * Naya serializable shape object create karne ke liye helper function
 * @param {string} type - Shape ka type ('rectangle', 'ellipse', 'line', 'arrow')
 * @param {number} x - Initial World X coordinate
 * @param {number} y - Initial World Y coordinate
 * @returns {object} plain serializable shape object
 */
export function createShape(type, x, y) {
  const base = {
    // Unique ID generate karne ke liye standard randomUUID use kar rahe hain
    id: typeof crypto.randomUUID === "function" ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
    type,
    strokeColor: "#ffffff", // Default bright white stroke for high visibility
    strokeWidth: 2
  };

  if (type === "pencil") {
    // Pencil shapes coordinates array ko direct map karega geometry ke liye
    base.points = [{ x, y }];
  } else {
    // Baki shapes standard rectangular box outline boundaries use karenge
    base.x = x;
    base.y = y;
    base.width = 0;
    base.height = 0;
    base.fillColor = "transparent";
  }

  return base;
}
