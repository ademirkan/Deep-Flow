import react, { useState, useRef } from "react";

import useLocalStorageState from "../Hooks/useLocalStorageState";

export const SchedulerContext = react.createContext({
  scheduler: {},
  setScheduler: () => {},
});

export default function SchedulerProvider({ children }) {
  const [mode, setMode] = useState("");
  const [currentTimer, setCurrentTimer] = useState(0);
  const [next, setNext] = useState(() => {});
  const [config, setConfig] = useState();

  const scheduler = { mode, currentTimer, next, config };
  const setScheduler = (mode, currentTimer, next, config) => {
    setMode(mode);
    setCurrentTimer(currentTimer);
    setNext(next);
    setConfig(config);
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
