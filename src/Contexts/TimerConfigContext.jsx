import react, { useState } from "react";
import useLocalStorageState from "./../Hooks/useLocalStorageState";

export const TimerConfigContext = react.createContext({
  studyDurationMs: 0,
  shortBreakDurationMs: 0,
  longBreakDurationMs: 0,
  longBreakReq: 4,
  setStudyDurationMs: () => {},
  setShortBreakDurationMs: () => {},
  setLongBreakDurationMs: () => {},
  setLongBreakReq: () => {},
});

export default function TimerConfigProvider({ children }) {
  // const [studyDurationMs, setStudyDurationMs] = useState(90 * 60 * 1000);
  // const [shortBreakDurationMs, setShortBreakDurationMs] = useState(
  //   20 * 60 * 1000
  // );
  // const [longBreakDurationMs, setLongBreakDurationMs] = useState(
  //   45 * 60 * 1000
  // );
  // const [longBreakReq, setLongBreakReq] = useState(4);

  const [studyDurationMs, setStudyDurationMs] = useLocalStorageState(
    "studyDuration",
    25 * 60 * 1000
  );
  const [shortBreakDurationMs, setShortBreakDurationMs] = useLocalStorageState(
    "shortBreakDuration",
    5 * 60 * 1000
  );
  const [longBreakDurationMs, setLongBreakDurationMs] = useLocalStorageState(
    "longBreakDuration",
    15 * 60 * 1000
  );
  const [longBreakReq, setLongBreakReq] = useLocalStorageState(
    "longBreakReq",
    4
  );

  return (
    <TimerConfigContext.Provider
      value={{
        studyDurationMs,
        shortBreakDurationMs,
        longBreakDurationMs,
        longBreakReq,
        setStudyDurationMs,
        setShortBreakDurationMs,
        setLongBreakDurationMs,
        setLongBreakReq,
      }}
    >
      {children}
    </TimerConfigContext.Provider>
  );
}
