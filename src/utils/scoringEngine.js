const WEIGHTS = {
  mouseStraightness: 15,
  mouseSpeedVar: 10,
  typingSpeed: 15,
  typingVariance: 10,
  honeypot: 20,
  fingerprint: 5,
};



export function calculateSignalScores(data) {
  const scores = {};

  // 1. Mouse Straightness
  if (data.mouseStraightness !== null) {
    const r = data.mouseStraightness;
    if (r < 1.05) {
      scores.mouseStraightness = { earned: 2, max: 15, status: "bot" };
    } else if (r < 1.2) {
      scores.mouseStraightness = { earned: 8, max: 15, status: "suspicious" };
    } else {
      scores.mouseStraightness = { earned: 15, max: 15, status: "human" };
    }
  }

  // 2. Mouse Speed Variance
  if (data.mouseSpeedVar !== null) {
    const v = data.mouseSpeedVar;
    if (v < 0.01) {
      scores.mouseSpeedVar = { earned: 1, max: 10, status: "bot" };
    } else if (v < 0.05) {
      scores.mouseSpeedVar = { earned: 5, max: 10, status: "suspicious" };
    } else {
      scores.mouseSpeedVar = { earned: 10, max: 10, status: "human" };
    }
  }

  // 3. Typing Speed (average inter-key delay)
  if (data.typingSpeed !== null) {
    const s = data.typingSpeed;
    if (s < 20) {
      scores.typingSpeed = { earned: 1, max: 15, status: "bot" };
    } else if (s < 50) {
      scores.typingSpeed = { earned: 8, max: 15, status: "suspicious" };
    } else {
      scores.typingSpeed = { earned: 15, max: 15, status: "human" };
    }
  }

  // 4. Typing Variance
  if (data.typingVariance !== null) {
    const v = data.typingVariance;
    if (v < 5) {
      scores.typingVariance = { earned: 1, max: 10, status: "bot" };
    } else if (v < 20) {
      scores.typingVariance = { earned: 5, max: 10, status: "suspicious" };
    } else {
      scores.typingVariance = { earned: 10, max: 10, status: "human" };
    }
  }

  // 5. Honeypot
  if (data.honeypot !== null) {
    if (data.honeypot) {
      // triggered = bot
      scores.honeypot = { earned: 0, max: 20, status: "bot" };
    } else {
      scores.honeypot = { earned: 20, max: 20, status: "human" };
    }
  }

  // 6. Fingerprint
  if (data.fingerprint !== null) {
    if (data.fingerprint) {
      // suspicious = true
      scores.fingerprint = { earned: 1, max: 5, status: "suspicious" };
    } else {
      scores.fingerprint = { earned: 5, max: 5, status: "human" };
    }
  }

  return scores;
}


// Final score — 0 to 100
export function calculateTotalScore(scores) {
  const entries = Object.values(scores);

  if (entries.length === 0) return 50; // no data yet, neutral

  const totalEarned = entries.reduce((sum, s) => sum + s.earned, 0);
  const totalMax = entries.reduce((sum, s) => sum + s.max, 0);

  return Math.round((totalEarned / totalMax) * 100);
}