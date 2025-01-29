import { useEffect, useState } from "react";

export const CountdownToast = ({
  duration = 5,
  onComplete,
}: {
  duration: number;
  onComplete: () => void;
}) => {
  const [seconds, setSeconds] = useState(duration);

  useEffect(() => {
    if (seconds <= 0) {
      onComplete(); // Perform action when countdown ends
      return;
    }

    const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds, onComplete]);

  return <span>You'll {seconds}...</span>;
};
