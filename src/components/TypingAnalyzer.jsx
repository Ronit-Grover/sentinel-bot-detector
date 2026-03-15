import { useState, useRef, useCallback } from "react";
import { calculateTypingSpeed, calculateTypingVariance } from "../utils/keystrokeAnalysis";

function TypingAnalyzer({ onAnalysis }) {
  const [keyTimings, setKeyTimings] = useState([]);
  const [analysis, setAnalysis] = useState({ avgSpeed: 0, variance: 0 });
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const lastKeyTime = useRef(0);

  const handleKeyDown = useCallback(() => {
    const now = Date.now();

    if (lastKeyTime.current > 0) {
      const gap = now - lastKeyTime.current;

      setKeyTimings((prev) => {
        const updated = [...prev, gap].slice(-50);

        if (updated.length > 3) {
          const result = {
            avgSpeed: calculateTypingSpeed(updated),
            variance: calculateTypingVariance(updated),
          };
          setAnalysis(result);
          onAnalysis(result);
        }

        return updated;
      });
    }

    lastKeyTime.current = now;
  }, [onAnalysis]);

  const getSpeedStatus = (avg) => {
    if (avg === 0) return { label: "WAITING", color: "#4a5568" };
    if (avg < 20) return { label: "BOT", color: "#ff3366" };
    if (avg < 50) return { label: "SUSPICIOUS", color: "#ffaa00" };
    return { label: "HUMAN", color: "#00ffaa" };
  };

  const speedStatus = getSpeedStatus(analysis.avgSpeed);

  return (
    <div>
      <h3 style={{ fontSize: 12, letterSpacing: 2, color: "#5a8fff", marginBottom: 10 }}>
        ▸ KEYSTROKE ANALYSIS
      </h3>

      <div style={{ marginBottom: 10 }}>
        <label style={{ fontSize: 9, letterSpacing: 1.5, color: "#4a5568", display: "block", marginBottom: 4 }}>
          USERNAME
        </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type something here..."
          style={{
            width: "100%",
            padding: "10px 14px",
            background: "#0d1224",
            border: "1px solid #1a2240",
            borderRadius: 6,
            color: "#c9d1d9",
            fontSize: 13,
            fontFamily: "monospace",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label style={{ fontSize: 9, letterSpacing: 1.5, color: "#4a5568", display: "block", marginBottom: 4 }}>
          EMAIL
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="your@email.com"
          style={{
            width: "100%",
            padding: "10px 14px",
            background: "#0d1224",
            border: "1px solid #1a2240",
            borderRadius: 6,
            color: "#c9d1d9",
            fontSize: 13,
            fontFamily: "monospace",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div style={{
        marginTop: 12,
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 10,
        fontSize: 11,
      }}>
        <div style={{ background: "#0d1224", padding: 10, borderRadius: 6, border: "1px solid #1a2240" }}>
          <div style={{ color: "#4a5568", fontSize: 9, letterSpacing: 1.5, marginBottom: 4 }}>AVG SPEED</div>
          <div style={{ color: "#c9d1d9" }}>{analysis.avgSpeed.toFixed(0)}ms</div>
        </div>
        <div style={{ background: "#0d1224", padding: 10, borderRadius: 6, border: "1px solid #1a2240" }}>
          <div style={{ color: "#4a5568", fontSize: 9, letterSpacing: 1.5, marginBottom: 4 }}>VARIANCE</div>
          <div style={{ color: "#c9d1d9" }}>{analysis.variance.toFixed(1)}</div>
        </div>
        <div style={{ background: "#0d1224", padding: 10, borderRadius: 6, border: "1px solid #1a2240" }}>
          <div style={{ color: "#4a5568", fontSize: 9, letterSpacing: 1.5, marginBottom: 4 }}>STATUS</div>
          <div style={{ color: speedStatus.color, fontWeight: 700 }}>{speedStatus.label}</div>
        </div>
      </div>
    </div>
  );
}

export default TypingAnalyzer;