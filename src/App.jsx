import { useState, useCallback } from "react";
import MouseTracker from "./components/MouseTracker";
import TypingAnalyzer from "./components/TypingAnalyzer";
import HoneypotField from "./components/HoneypotField";
import Fingerprint from "./components/Fingerprint";
import ScoreGauge from "./components/ScoreGauge";
import SignalBar from "./components/SignalBar";
import { calculateSignalScores, calculateTotalScore } from "./utils/scoringEngine";

function App() {
  const [signalData, setSignalData] = useState({
    mouseStraightness: null,
    mouseSpeedVar: null,
    typingSpeed: null,
    typingVariance: null,
    honeypot: null,
    fingerprint: null,
  });

  const [scores, setScores] = useState({});
  const [totalScore, setTotalScore] = useState(50);
  const [botMode, setBotMode] = useState(false);

  const updateScoring = useCallback((newData) => {
    setSignalData((prev) => {
      const updated = { ...prev, ...newData };
      const newScores = calculateSignalScores(updated);
      setScores(newScores);
      setTotalScore(calculateTotalScore(newScores));
      return updated;
    });
  }, []);

  const handleMouseAnalysis = useCallback((result) => {
    if (!botMode) {
      updateScoring({
        mouseStraightness: result.straightness,
        mouseSpeedVar: result.speedVariance,
      });
    }
  }, [updateScoring, botMode]);

  const handleTypingAnalysis = useCallback((result) => {
    if (!botMode) {
      updateScoring({
        typingSpeed: result.avgSpeed,
        typingVariance: result.variance,
      });
    }
  }, [updateScoring, botMode]);

  const handleHoneypot = useCallback((triggered) => {
    if (!botMode) {
      updateScoring({ honeypot: triggered });
    }
  }, [updateScoring, botMode]);

  const handleFingerprint = useCallback((suspicious) => {
    updateScoring({ fingerprint: suspicious });
  }, [updateScoring]);

  const simulateBot = () => {
    setBotMode(true);

    const botData = {
      mouseStraightness: 1.001,
      mouseSpeedVar: 0.002,
      typingSpeed: 15,
      typingVariance: 2,
      honeypot: true,
      fingerprint: true,
    };

    const newScores = calculateSignalScores(botData);
    setSignalData(botData);
    setScores(newScores);
    setTotalScore(calculateTotalScore(newScores));
  };

  const resetAll = () => {
    setBotMode(false);

    const emptyData = {
      mouseStraightness: null,
      mouseSpeedVar: null,
      typingSpeed: null,
      typingVariance: null,
      honeypot: null,
      fingerprint: null,
    };

    setSignalData(emptyData);
    setScores({});
    setTotalScore(50);
  };

  return (
    <div style={{ padding: "24px 20px", maxWidth: 950, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 10, letterSpacing: 5, color: "#5a8fff", marginBottom: 8 }}>
          ◈ SENTINEL v1.0 ◈
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#00ffaa", margin: 0 }}>
          BOT DETECTOR
        </h1>
        <p style={{ fontSize: 11, color: "#4a5568", marginTop: 6, letterSpacing: 1 }}>
          Real-time behavioral analysis & browser fingerprinting
        </p>

        <div style={{ marginTop: 16, display: "flex", gap: 10, justifyContent: "center" }}>
          <button
            onClick={simulateBot}
            style={{
              padding: "10px 24px",
              background: "linear-gradient(135deg, #ff3366, #ff6644)",
              border: "none",
              borderRadius: 6,
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.5,
              cursor: "pointer",
              fontFamily: "monospace",
            }}
          >
            ⚡ SIMULATE BOT
          </button>
          <button
            onClick={resetAll}
            style={{
              padding: "10px 24px",
              background: "none",
              border: "1px solid #1a2240",
              borderRadius: 6,
              color: "#4a5568",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: 1.5,
              cursor: "pointer",
              fontFamily: "monospace",
            }}
          >
            ↻ RESET
          </button>
        </div>
      </div>

      {botMode && (
        <div style={{
          marginBottom: 20,
          padding: 12,
          background: "#1a0a12",
          border: "1px solid #ff3366",
          borderRadius: 6,
          textAlign: "center",
          color: "#ff3366",
          fontSize: 12,
          letterSpacing: 1,
        }}>
          ⚠ BOT SIMULATION ACTIVE — Press RESET to return to live detection
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

        <div>
          <MouseTracker onAnalysis={handleMouseAnalysis} />
          <div style={{ marginTop: 24 }} />
          <TypingAnalyzer onAnalysis={handleTypingAnalysis} />
          <HoneypotField onTriggered={handleHoneypot} />
        </div>

        <div>
          <h3 style={{ fontSize: 12, letterSpacing: 2, color: "#5a8fff", marginBottom: 10 }}>
            ▸ ANALYSIS DASHBOARD
          </h3>

          <ScoreGauge score={totalScore} />

          <div style={{
            background: "#0d1224",
            border: "1px solid #1a2240",
            borderRadius: 8,
            padding: 16,
            marginTop: 12,
          }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: "#4a5568", marginBottom: 12 }}>
              SIGNAL BREAKDOWN
            </div>

            <SignalBar
              label="Mouse Path"
              earned={scores.mouseStraightness?.earned || 0}
              max={15}
              status={scores.mouseStraightness?.status}
            />
            <SignalBar
              label="Mouse Speed Var"
              earned={scores.mouseSpeedVar?.earned || 0}
              max={10}
              status={scores.mouseSpeedVar?.status}
            />
            <SignalBar
              label="Typing Speed"
              earned={scores.typingSpeed?.earned || 0}
              max={15}
              status={scores.typingSpeed?.status}
            />
            <SignalBar
              label="Typing Variance"
              earned={scores.typingVariance?.earned || 0}
              max={10}
              status={scores.typingVariance?.status}
            />
            <SignalBar
              label="Honeypot"
              earned={scores.honeypot?.earned || 0}
              max={20}
              status={scores.honeypot?.status}
            />
            <SignalBar
              label="Fingerprint"
              earned={scores.fingerprint?.earned || 0}
              max={5}
              status={scores.fingerprint?.status}
            />
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <Fingerprint onAnalysis={handleFingerprint} />
      </div>

      <div style={{ textAlign: "center", marginTop: 24, fontSize: 9, color: "#1e2a45", letterSpacing: 2 }}>
        SENTINEL BOT DETECTION ENGINE — BEHAVIORAL ANALYSIS + FINGERPRINTING
      </div>
    </div>
  );
}

export default App;