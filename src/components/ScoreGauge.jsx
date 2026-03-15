function ScoreGauge({ score }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color = score >= 70 ? "#00ffaa" : score >= 40 ? "#ffaa00" : "#ff3366";
  const label = score >= 70 ? "HUMAN" : score >= 40 ? "SUSPICIOUS" : "BOT";

  return (
    <div style={{ textAlign: "center", padding: "16px 0" }}>
      <svg width={170} height={170} viewBox="0 0 170 170">
        {/* Background circle — dark ring */}
        <circle
          cx={85}
          cy={85}
          r={radius}
          fill="none"
          stroke="#141b2d"
          strokeWidth={8}
        />

        {/* Score circle — colored arc */}
        <circle
          cx={85}
          cy={85}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={8}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 85 85)"
          style={{
            transition: "stroke-dashoffset 1s ease, stroke 0.5s ease",
          }}
        />

        {/* Score number */}
        <text
          x={85}
          y={78}
          textAnchor="middle"
          fill={color}
          fontSize={32}
          fontWeight={800}
          fontFamily="monospace"
        >
          {Math.round(score)}
        </text>

        {/* Label */}
        <text
          x={85}
          y={98}
          textAnchor="middle"
          fill="#4a5568"
          fontSize={8}
          letterSpacing={3}
          fontFamily="monospace"
        >
          HUMAN SCORE
        </text>
      </svg>

      {/* Status badge */}
      <div style={{
        marginTop: 4,
        fontSize: 11,
        letterSpacing: 3,
        fontWeight: 700,
        color: color,
        padding: "5px 18px",
        borderRadius: 4,
        display: "inline-block",
        border: `1px solid ${color}33`,
      }}>
        {label}
      </div>
    </div>
  );
}

export default ScoreGauge;