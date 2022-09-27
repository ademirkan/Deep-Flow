import React, { useState } from "react";

export const TimerStateContext = React.createContext({
  isRunning: false,
  isStarted: false,
  setIsRunning: (bool: boolean) => {},
  setIsStarted: (bool: boolean) => {},
});

export default function TimerStateProvider({ children }) {
  const [isRunning, setIsRunning] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  return (
    <TimerStateContext.Provider
      value={{
        isRunning,
        isStarted,
        setIsRunning,
        setIsStarted,
      }}
    >
      {children}
    </TimerStateContext.Provider>
  );
}
