import React, { useEffect, useRef, useState } from "react";

interface TimeProps {
  initialtime?: number;
}

const Timer: React.FC<TimeProps> = ({ initialtime = 0 }) => {
  const [time, setTime] = useState<number>(initialtime);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
  };

  const resetTime = () => {
    stopTimer();
    setTime(initialtime);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  },[]);

  return (
    <div>
      <h1> Time App(Typescript+React)</h1>
      <h2>Elapsed Time: {time} sec</h2>
      <div>
        <button onClick={startTimer} disabled={isRunning}>
          Start
        </button>
        <button onClick={stopTimer} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={resetTime}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;
