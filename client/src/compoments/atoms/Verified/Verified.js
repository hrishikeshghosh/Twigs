import React from "react";

const Verified = ({ size }) => {
  return (
    <div className="verified-root" style={{ padding: "5%" }}>
      <i
        className="fas fa-check-circle"
        style={{
          fontSize: { size },
          color: "#3c8dad",
        }}
      ></i>
    </div>
  );
};

export default Verified;
