import react, { useState } from "react";

import useLocalStorageState from "../Hooks/useLocalStorageState";
//🤔 multiContexts?

export const ScheduleContext = react.createContext({
  dailyTarget: 8,
  fullSessionLength: 4,
  setDailyTarget: () => {},
  setFullSessionLength: () => {},
});

export default function ScheduleProvider({ children }) {
  const [dailyTarget, setDailyTarget] = useLocalStorageState("dailyTarget", 8);
  const [fullSessionLength, setFullSessionLength] = useLocalStorageState(
    "fullSessionLength",
    4
  );

  return (
    <ScheduleContext.Provider
      value={{
        dailyTarget,
        fullSessionLength,
        setDailyTarget,
        setFullSessionLength,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}
