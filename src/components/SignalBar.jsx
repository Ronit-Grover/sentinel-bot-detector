function SignalBar({ label, earned, max, status }) {
  const percentage = max > 0 ? (earned / max) * 100 : 0;

  const colors = {
    human: "#00ffaa",
    suspicious: "#ffaa00",
    bot: "#ff3366",
  };

  const color = colors[status] || "#4a5568";

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 4,
      }}>
        <span style={{
          fontSize: 10,
          letterSpacing: 2,
          color: "#8892a4",
          textTransform: "uppercase",
        }}>
          {label}
        </span>
        <span style={{
          fontSize: 10,
          letterSpacing: 1.5,
          color: color,
          fontWeight: 700,
        }}>
          {status ? status.toUpperCase() : "WAITING"}
        </span>
      </div>

      <div style={{
        height: 4,
        background: "#141b2d",
        borderRadius: 2,
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: `${percentage}%`,
          background: color,
          borderRadius: 2,
          transition: "width 0.6s ease, background 0.4s ease",
        }} />
      </div>

      <div style={{
        fontSize: 9,
        color: "#4a5568",
        marginTop: 3,
      }}>
        {earned}/{max} points
      </div>
    </div>
  );
}

export default SignalBar;