"use client";

import { useEffect, useState } from "react";

export function useIncreaseCount(
  end: number,
  start: number = 0,
  duration: number = 1000,
) {
  const [count, setCount] = useState(start);
  const frameRate = 1000 / 60;
  const totalFrame = Math.round(duration / frameRate);
  const step = Math.abs(Math.floor(duration / (end - start)));

  useEffect(() => {
    let currentNumber = start;
    const counter = setInterval(() => {
      const progress = ++currentNumber / totalFrame;
      setCount(Math.round(end * progress));

      if (progress === 1) {
        clearInterval(counter);
      }
    }, frameRate);
  }, [end, frameRate, start, step]);

  return count;
}
