import React, { useEffect, useState } from "react";

const taglines = [
  "Because money doesn’t grow on trees.",
  "Track your cash, avoid the crash.",
  "Your wallet’s reality check.",
  "Making cents of your dollars.",
];

const DynamicTitle = () => {
  const [randomTagline, setRandomTagline] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * taglines.length);
    setRandomTagline(taglines[randomIndex]);
  }, []); // No warning since taglines is now outside

  return (
    <div
      className="relative text-center py-10"
      style={{
        backgroundImage: `url('/rainbow-image.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-4xl font-bold text-gray-100">Budget Tracker</h1>
      {randomTagline && (
        <p className="text-gray-400 italic text-sm mt-2">{randomTagline}</p>
      )}
    </div>
  );
};

export default DynamicTitle;
