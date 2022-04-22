import CircularTimer from "../../CircularTimer/CircularTimer";
import { TimerConfigContext } from "../../../Contexts/TimerConfigContext";
import { useContext, useState, useRef, useLayoutEffect } from "react";
import { TimerStateContext } from "./../../../Contexts/TimerStateContext";
import { SESSION_MODE } from "../../../Helpers/enum";

function MainContent() {
  // Contexts
  const {
    studyDurationMs,
    longBreakReq,
    shortBreakDurationMs,
    longBreakDurationMs,
  } = useContext(TimerConfigContext);
  const { setIsRunning, setIsStarted } = useContext(TimerStateContext);

  // States
  const [numStudyComplete, setNumStudyComplete] = useState(0);
  const [currSession, setCurrSession] = useState(SESSION_MODE.STUDY);

  // Refs
  const [duration, setDuration] = useState(studyDurationMs);

  // Effects
  useLayoutEffect(() => {
    switch (currSession) {
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
    currSession,
    studyDurationMs,
    shortBreakDurationMs,
    longBreakDurationMs,
    setDuration,
  ]);
  // Marks current session as complete, returns next chronological session mode
  function nextSession() {
    let newNumComplete;
    let nextSessionMode;

    if (currSession == SESSION_MODE.STUDY) {
      setNumStudyComplete((prev) => {
        newNumComplete = prev + 1;
        return newNumComplete;
      });

      nextSessionMode =
        newNumComplete % longBreakReq === 0
          ? SESSION_MODE.LONG_BREAK
          : SESSION_MODE.SHORT_BREAK;

      setCurrSession(nextSessionMode);

      return nextSessionMode;
    }

    setCurrSession(SESSION_MODE.STUDY);
    return SESSION_MODE.STUDY;
  }

  // any way to optimize this?
  let callbacks = {
    onStart: () => {
      console.log("Started!");
      setIsRunning(true);
      setIsStarted(true);
    },
    onTick: () => {
      console.log("Tick!");
    },
    onFinish: (startTime) => {
      // startTime
      // endTime
      // Json -- stringify
      // look up json video
      const prevSessionsString = localStorage.getItem("sessions");
      const prevSessions = prevSessionsString
        ? JSON.parse(prevSessionsString)
        : [];

      prevSessions.push({ startTime: startTime, endTime: Date.now() });
      const sessionsString = JSON.stringify(prevSessions);
      localStorage.setItem("sessions", sessionsString);
      setIsRunning(false);
      setIsStarted(false);
      setCurrSession(nextSession());
    },
    onReset: () => {
      console.log("Reset!");
      setIsRunning(false);
      setIsStarted(false);
    },
    onStop: () => {
      console.log("Stopped!");
      setIsRunning(false);
    },
    onNext: () => {
      console.log("Next");
      setCurrSession(nextSession());
    },
  };

  return (
    <div
      className="main-container centered-container"
      style={{ gridArea: "main" }}
    >
      <div className="timer-container centered-container">
        <CircularTimer
          thickness={0.03}
          duration={duration}
          callbacks={callbacks}
        ></CircularTimer>
      </div>
    </div>
  );
}

export default MainContent;
