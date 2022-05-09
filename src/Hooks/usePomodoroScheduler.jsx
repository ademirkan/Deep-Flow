import { useContext, useState, useLayoutEffect } from "react";
import { TimerConfigContext } from "../Contexts/TimerConfigContext";
import useSessionStorageState from "./useSessionStorageState";
import { SESSION_MODE } from "./../Helpers/enum";

export default function usePomodoroScheduler(callbacks) {
  const {
    studyDurationMs,
    shortBreakDurationMs,
    longBreakDurationMs,
    longBreakReq,
  } = useContext(TimerConfigContext);

  const [currentMode, setCurrentMode] = useState(SESSION_MODE.STUDY);

  const [duration, setDuration] = useState(studyDurationMs);

  const [numStudyComplete, setNumStudyComplete] = useSessionStorageState(
    "currentNumCompleted",
    0
  );

  useLayoutEffect(() => {
    switch (currentMode) {
      case SESSION_MODE.STUDY:
        setDuration(studyDurationMs);
        break;
      case SESSION_MODE.SHORT_BREAK:
        setDuration(shortBreakDurationMs);
        break;
      default:
        setDuration(longBreakDurationMs);
    }
  }, [
    currentMode,
    studyDurationMs,
    shortBreakDurationMs,
    longBreakDurationMs,
    setDuration,
  ]);

  function next() {
    let newNumComplete;
    let nextSessionMode;

    if (currentMode === SESSION_MODE.STUDY) {
      newNumComplete = numStudyComplete + 1;
      setNumStudyComplete(newNumComplete);
      nextSessionMode =
        newNumComplete % longBreakReq === 0
          ? SESSION_MODE.LONG_BREAK
          : SESSION_MODE.SHORT_BREAK;

      setCurrentMode(nextSessionMode);

      return nextSessionMode;
    }

    setCurrentMode(SESSION_MODE.STUDY);
    return SESSION_MODE.STUDY;
  }

  return { duration, next, currentMode };
}
