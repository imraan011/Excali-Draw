/**
 * Screen space coordinates ko canvas/world space me convert karta hai
 * @param {number} clientX 
 * @param {number} clientY 
 * @param {{ x: number, y: number, zoom: number }} viewport 
 * @returns {{ x: number, y: number }}
 */
export function screenToWorld(clientX, clientY, viewport) {
  return {
    x: (clientX - viewport.x) / viewport.zoom,
    y: (clientY - viewport.y) / viewport.zoom
  };
}

/**
 * World space coordinates ko screen space representation me transform karta hai
 * @param {number} worldX 
 * @param {number} worldY 
 * @param {{ x: number, y: number, zoom: number }} viewport 
 * @returns {{ x: number, y: number }}
 */
export function worldToScreen(worldX, worldY, viewport) {
  return {
    x: worldX * viewport.zoom + viewport.x,
    y: worldY * viewport.zoom + viewport.y
  };
}
