import react, { useState } from "react";

import useLocalStorageState from "../Hooks/useLocalStorageState";
//🤔 multiContexts?

export const ProgressbarContext = react.createContext({
  dailyTarget: 8,
  sessionLength: 4,
  setDailyTarget: () => {},
  setSessionLength: () => {},
});

export default function ProgressbarProvider({ children }) {
  const [dailyTarget, setDailyTarget] = useLocalStorageState(
    "PROGRESSBAR_DAILY_TARGET",
    8
  );
  const [sessionLength, setSessionLength] = useLocalStorageState(
    "PROGRESSBAR_NUM_FULL_SESSION",
    4
  );

  return (
    <ProgressbarContext.Provider
      value={{
        dailyTarget,
        sessionLength,
        setDailyTarget,
        setSessionLength,
      }}
    >
      {children}
    </ProgressbarContext.Provider>
  );
}
