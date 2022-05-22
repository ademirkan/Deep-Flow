import react, { useState, useEffect, useLayoutEffect } from "react";
import { usePomdoroMode } from "./../Hooks/usePomodoroMode";
import useLocalStorageState from "./../Hooks/useLocalStorageState";

export const TimerModeContext = react.createContext({
  mode: {},
  changeStudyMode: () => {},
});

//🤔 multiContexts?
// Mode must meet certain datatype requirements
export default function TimerModeProvider({ mode, children }) {
  // declare all modes here
  const pomodoroMode = usePomdoroMode();
  // const stopwatchMode = useStopwatchMode();
  // const deepWorkMode = useDeepWorkMode();

  // put all modes in this array
  let modes = [pomodoroMode];

  const [modeIndex, setModeIndex] = useLocalStorageState("modeIndex", 0);

  const changeStudyMode = (str) => {
    // find mode with label str
    let newMode = modes.findIndex((m) => m.label === str);
    if (newMode) setModeIndex(newMode);
  };
  return (
    <TimerModeContext.Provider
      value={{
        mode: modes[modeIndex],
        changeStudyMode,
      }}
    >
      {children}
    </TimerModeContext.Provider>
  );
}
