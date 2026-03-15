// Function 1: Average inter-key delay
export function calculateTypingSpeed(keyTimings) {
  if (keyTimings.length < 3) return 0;

  let sum = keyTimings.reduce((a, b) => a + b, 0);
  return sum / keyTimings.length;
}


// Function 2: Typing variance (standard deviation of gaps)
export function calculateTypingVariance(keyTimings) {
  if (keyTimings.length < 3) return 0;

  let avg = keyTimings.reduce((a, b) => a + b, 0) / keyTimings.length;

  let variance = keyTimings.reduce((sum, t) => sum + (t - avg) ** 2, 0) / keyTimings.length;

  return Math.sqrt(variance);
}