import { useState, useRef, useCallback } from "react";
import { calculateStraightness, calculateSpeedVariance } from "../utils/mouseAnalysis";

function MouseTracker({ onAnalysis }) {
  const [points, setPoints] = useState([]);
  const [analysis, setAnalysis] = useState({ straightness: 0, speedVariance: 0 });
  const areaRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const rect = areaRef.current.getBoundingClientRect();

    const newPoint = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      t: Date.now(),
    };

    setPoints((prev) => {
      const updated = [...prev, newPoint].slice(-200);

      if (updated.length > 10) {
        const result = {
          straightness: calculateStraightness(updated),
          speedVariance: calculateSpeedVariance(updated),
        };
        setAnalysis(result);
        onAnalysis(result);
      }

      return updated;
    });
  }, [onAnalysis]);

  const getStatus = (straightness) => {
    if (straightness === 0) return { label: "WAITING", color: "#4a5568" };
    if (straightness < 1.05) return { label: "BOT", color: "#ff3366" };
    if (straightness < 1.2) return { label: "SUSPICIOUS", color: "#ffaa00" };
    return { label: "HUMAN", color: "#00ffaa" };
  };

  const status = getStatus(analysis.straightness);

  return (
    <div>
      <h3 style={{ fontSize: 12, letterSpacing: 2, color: "#5a8fff", marginBottom: 10 }}>
        ▸ MOUSE TRACKING
      </h3>

      <div
        ref={areaRef}
        onMouseMove={handleMouseMove}
        style={{
          height: 200,
          background: "#0d1224",
          border: "1px solid #1a2240",
          borderRadius: 8,
          position: "relative",
          overflow: "hidden",
          cursor: "crosshair",
        }}
      >
        <div style={{ position: "absolute", top: 10, left: 12, fontSize: 10, color: "#1e2a45" }}>
          Move your mouse here
        </div>

        <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
          {points.slice(-80).map((p, i, arr) =>
            i > 0 ? (
              <line
                key={i}
                x1={arr[i - 1].x}
                y1={arr[i - 1].y}
                x2={p.x}
                y2={p.y}
                stroke="#00ffaa"
                strokeWidth={1.5}
                opacity={0.15 + (i / arr.length) * 0.6}
              />
            ) : null
          )}
        </svg>

        <div style={{ position: "absolute", bottom: 8, right: 12, fontSize: 10, color: "#1e2a45" }}>
          {points.length} points
        </div>
      </div>

      <div style={{
        marginTop: 12,
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 10,
        fontSize: 11,
      }}>
        <div style={{ background: "#0d1224", padding: 10, borderRadius: 6, border: "1px solid #1a2240" }}>
          <div style={{ color: "#4a5568", fontSize: 9, letterSpacing: 1.5, marginBottom: 4 }}>STRAIGHTNESS</div>
          <div style={{ color: "#c9d1d9" }}>{analysis.straightness.toFixed(3)}</div>
        </div>
        <div style={{ background: "#0d1224", padding: 10, borderRadius: 6, border: "1px solid #1a2240" }}>
          <div style={{ color: "#4a5568", fontSize: 9, letterSpacing: 1.5, marginBottom: 4 }}>SPEED VARIANCE</div>
          <div style={{ color: "#c9d1d9" }}>{analysis.speedVariance.toFixed(4)}</div>
        </div>
        <div style={{ background: "#0d1224", padding: 10, borderRadius: 6, border: "1px solid #1a2240" }}>
          <div style={{ color: "#4a5568", fontSize: 9, letterSpacing: 1.5, marginBottom: 4 }}>STATUS</div>
          <div style={{ color: status.color, fontWeight: 700 }}>{status.label}</div>
        </div>
      </div>
    </div>
  );
}

export default MouseTracker;