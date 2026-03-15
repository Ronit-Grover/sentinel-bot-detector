// Function 1: Straightness Ratio
export function calculateStraightness(points) {
  if (points.length < 3) return 1;

  let totalDistance = 0;

  for (let i = 1; i < points.length; i++) {
    let dx = points[i].x - points[i - 1].x;
    let dy = points[i].y - points[i - 1].y;
    let dist = Math.sqrt(dx ** 2 + dy ** 2);
    totalDistance += dist;
  }

  let first = points[0];
  let last = points[points.length - 1];
  let directDistance = Math.sqrt(
    (last.x - first.x) ** 2 + (last.y - first.y) ** 2
  );

  if (directDistance === 0) return 1;

  return totalDistance / directDistance;
}


// Function 2: Speed Variance (Standard Deviation)
export function calculateSpeedVariance(points) {
  if (points.length < 3) return 0;

  // Step 1: Har pair ke beech speed nikalo
  let speeds = [];

  for (let i = 1; i < points.length; i++) {
    let dx = points[i].x - points[i - 1].x;
    let dy = points[i].y - points[i - 1].y;
    let distance = Math.sqrt(dx ** 2 + dy ** 2);
    let time = Math.max(points[i].t - points[i - 1].t, 1); // avoid divide by 0
    speeds.push(distance / time);
  }

  // Step 2: Average speed
  let avg = speeds.reduce((sum, s) => sum + s, 0) / speeds.length;

  // Step 3-4: Variance (average of squared deviations)
  let variance = speeds.reduce((sum, s) => sum + (s - avg) ** 2, 0) / speeds.length;

  // Step 5: Standard deviation
  return Math.sqrt(variance);
}