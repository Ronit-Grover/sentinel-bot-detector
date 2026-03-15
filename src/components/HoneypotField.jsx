import { useState } from "react";

function HoneypotField({ onTriggered }) {
  const [filled, setFilled] = useState(false);

  const handleChange = (e) => {
    if (e.target.value.length > 0) {
      setFilled(true);
      onTriggered(true);
    } else {
      setFilled(false);
      onTriggered(false);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        left: -9999,
        opacity: 0,
        height: 0,
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <input
        tabIndex={-1}
        autoComplete="off"
        name="website_url"
        onChange={handleChange}
        placeholder="Your website"
      />
    </div>
  );
}

export default HoneypotField;