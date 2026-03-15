import { useState, useEffect } from "react";
import { collectFingerprint, analyzeFingerprint } from "../utils/fingerprint";

function Fingerprint({ onAnalysis }) {
  const [fp, setFp] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const data = collectFingerprint();
    setFp(data);
    const result = analyzeFingerprint(data);
    setAnalysis(result);
    onAnalysis(result.suspicious);
  }, []);

  if (!fp) return null;

  const status = analysis.suspicious
    ? { label: "SUSPICIOUS", color: "#ffaa00" }
    : { label: "CLEAN", color: "#00ffaa" };

  return (
    <div>
      <h3 style={{ fontSize: 12, letterSpacing: 2, color: "#5a8fff", marginBottom: 10 }}>
        ▸ BROWSER FINGERPRINT
      </h3>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
      }}>
        <span style={{ color: status.color, fontSize: 12, fontWeight: 700 }}>
          {status.label}
          {analysis.issues.length > 0 && ` (${analysis.issues.length} issues)`}
        </span>
        <button
          onClick={() => setShowDetails(!showDetails)}
          style={{
            background: "none",
            border: "1px solid #1a2240",
            color: "#5a8fff",
            padding: "5px 12px",
            borderRadius: 4,
            fontSize: 10,
            letterSpacing: 1.5,
            cursor: "pointer",
            fontFamily: "monospace",
          }}
        >
          {showDetails ? "▾ HIDE" : "▸ SHOW"} DETAILS
        </button>
      </div>

      {showDetails && (
        <div style={{
          background: "#0d1224",
          border: "1px solid #1a2240",
          borderRadius: 6,
          padding: 14,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px 20px",
          fontSize: 11,
        }}>
          {Object.entries(fp).map(([key, value]) => (
            <div key={key}>
              <span style={{ color: "#4a5568" }}>{key}: </span>
              <span style={{ color: "#c9d1d9" }}>{String(value)}</span>
            </div>
          ))}

          {analysis.issues.length > 0 && (
            <div style={{ gridColumn: "1 / -1", marginTop: 8, borderTop: "1px solid #1a2240", paddingTop: 8 }}>
              <div style={{ color: "#ffaa00", fontSize: 10, marginBottom: 4 }}>ANOMALIES:</div>
              {analysis.issues.map((issue, i) => (
                <div key={i} style={{ color: "#ff3366", fontSize: 10 }}>⚠ {issue}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Fingerprint;