"use client";

import { useState, useEffect } from "react";

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export default function Counter({
  end,
  duration = 2000,
  suffix = "",
  className = "",
}: CounterProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Start animation when component mounts
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, 500); // Small delay before starting

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, hasStarted]);

  return (
    <span className={className}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
