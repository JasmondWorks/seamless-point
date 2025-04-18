import React, { useState, useEffect } from "react";

interface CountdownProps {
  initialSeconds: number; // Start time in seconds,
  onSetTimeLeft?: () => void;
}

const CountdownTimer: React.FC<CountdownProps> = ({
  initialSeconds,
  onSetTimeLeft = "",
}) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    // Stop countdown if timeLeft is 0
    if (timeLeft <= 0) return;

    // Set interval to decrease timeLeft
    const intervalId = setInterval(() => {
      const newTime = timeLeft - 1;
      setTimeLeft((prevTime) => prevTime - 1);
      onSetTimeLeft && onSetTimeLeft(newTime);
    }, 1000);

    // Cleanup interval on unmount or when timeLeft changes
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // Format time as mm:ss
  // const formatTime = (time: number) => {
  //   const minutes = Math.floor(time / 60);
  //   const seconds = time % 60;
  //   return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
  //     2,
  //     "0"
  //   )}`;
  // };

  return <span>{timeLeft}</span>;
};

export default CountdownTimer;
