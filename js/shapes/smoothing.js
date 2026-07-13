// Bezier line smoothing algorithm library

/**
 * Raw point array ko quadratic Bezier curve standard dynamic curve paths representation me convert karta hai
 * @param {Array<{x: number, y: number}>} points 
 * @returns {string} SVG compatible path description string
 */
export function getSmoothedPath(points) {
  if (!points || points.length === 0) return "";
  
  // Single point case me sirf starting position shift register karein
  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`;
  }

  let pathData = `M ${points[0].x} ${points[0].y}`;

  // Loop through middle points to draw curved paths using midpoints as endpoints
  for (let i = 1; i < points.length - 1; i++) {
    const xc = (points[i].x + points[i + 1].x) / 2;
    const yc = (points[i].y + points[i + 1].y) / 2;
    pathData += ` Q ${points[i].x} ${points[i].y}, ${xc} ${yc}`;
  }

  // Final points segment line connection join settings
  pathData += ` L ${points[points.length - 1].x} ${points[points.length - 1].y}`;

  return pathData;
}
