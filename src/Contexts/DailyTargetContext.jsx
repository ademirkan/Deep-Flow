import react, { useState } from "react";

import useLocalStorageState from "./../Hooks/useLocalStorageState";

export const DailyTargetContext = react.createContext({
  dailyTarget: 8,
  setDailyTarget: () => {},
});

export default function DailyTargetProvider({ children }) {
  const [dailyTarget, setDailyTarget] = useLocalStorageState("dailyTarget", 8);

  return (
    <DailyTargetContext.Provider
      value={{
        dailyTarget,
        setDailyTarget,
      }}
    >
      {children}
    </DailyTargetContext.Provider>
  );
}
