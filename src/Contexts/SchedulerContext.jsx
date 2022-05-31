import react, { useState, useRef } from "react";

import useLocalStorageState from "../Hooks/useLocalStorageState";

/**
 * Scheduler = {mode: "pomodoro, stopwatch, custom",
 *              currentTimer={type: countdown, stopwatch, label="study, break, etc", duration},
 *              next()}
 */
export const SchedulerContext = react.createContext({
  scheduler: {},
  setScheduler: () => {},
});

export default function SchedulerProvider({ children }) {
  const [mode, setMode] = useState("");
  const [currentTimer, setCurrentTimer] = useState({});
  const [next, setNext] = useState(() => {});

  console.log(currentTimer);
  const scheduler = { mode, currentTimer, next };
  const setScheduler = (mode, currentTimer, next) => {
    setMode(mode);
    setCurrentTimer(currentTimer);
    setNext(() => next);
  };

  return (
    <SchedulerContext.Provider
      value={{
        scheduler,
        setScheduler,
      }}
    >
      {children}
    </SchedulerContext.Provider>
  );
}
