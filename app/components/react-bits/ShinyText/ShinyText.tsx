/*
	Installed from https://reactbits.dev/ts/tailwind/
*/

import React from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
}) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`inline-block ${disabled ? "" : "animate-shine"} ${className}`}
      style={{
        color: "transparent",
        backgroundImage:
          "linear-gradient(120deg, #9ca3af 40%, #ffffff 50%, #9ca3af 60%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        animationDuration: animationDuration,
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;
