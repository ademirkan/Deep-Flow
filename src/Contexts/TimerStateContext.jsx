import react, { useState } from "react";

export const TimerStateContext = react.createContext({
  isRunning: false,
  isStarted: false,
  setIsRunning: () => {},
  setIsStarted: () => {},
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
