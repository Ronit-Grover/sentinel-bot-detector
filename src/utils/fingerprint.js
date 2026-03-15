export function collectFingerprint() {
  // WebGL renderer — Identifies GPU

  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl");
  const renderer = gl
    ? gl.getParameter(gl.RENDERER)
    : "unavailable";

  return {
    screen: `${screen.width}x${screen.height}`,
    colorDepth: screen.colorDepth,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    platform: navigator.platform,
    cores: navigator.hardwareConcurrency || "unknown",
    memory: navigator.deviceMemory || "unknown",
    gpu: renderer,
    touchSupport: "ontouchstart" in window,
    cookiesEnabled: navigator.cookieEnabled,
  };
}


// Anomalies check
export function analyzeFingerprint(fp) {
  const issues = [];

  // Headless browser check — screen 0x0
  if (fp.screen === "0x0") {
    issues.push("Screen resolution is 0x0 — headless browser");
  }

  // SwiftShader = software rendering = headless
  if (fp.gpu.toLowerCase().includes("swiftshader")) {
    issues.push("SwiftShader GPU detected — likely headless");
  }

  // Touch support on desktop platform
  if (fp.touchSupport && fp.platform.includes("Win")) {
    issues.push("Touch support on Windows — suspicious");
  }

  // No cookies — bots often disable
  if (!fp.cookiesEnabled) {
    issues.push("Cookies disabled — unusual for real user");
  }

  // Unknown cores/memory
  if (fp.cores === "unknown" || fp.memory === "unknown") {
    issues.push("Hardware info hidden — possible bot");
  }

  return {
    issues: issues,
    suspicious: issues.length > 1,
  };
}