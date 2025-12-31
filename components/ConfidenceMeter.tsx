/*
==================================================
File Name:    ConfidenceMeter.tsx
Created On:   12/30/2025
Purpose:      Visualizes AI confidence score
              as an accessible progress meter,
              with smooth animation updates.
==================================================
*/

"use client";

import { useEffect, useState } from "react";

export default function ConfidenceMeter({ value }: { value: number }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setTimeout(() => setWidth(Math.round(value * 100)), 150);
  }, [value]);

  return (
    <div className="confidence-meter">
      <div className="confidence-fill" style={{ width: `${width}%` }} />
      <span>{width}% confidence</span>
    </div>
  );
}

