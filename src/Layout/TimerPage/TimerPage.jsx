import { useContext, useState, useRef, useLayoutEffect } from "react";
import { TimerConfigContext } from "../../Contexts/TimerConfigContext";
import { TimerStateContext } from "../../Contexts/TimerStateContext";
import { SESSION_MODE } from "../../Helpers/enum";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import useLocalStorageState from "../../Hooks/useLocalStorageState";
import Timer from "../../Components/CircularTimer/Timer";

// SHOULD RERENDER EVERY ... CHANGE
// Navbar -- durations, isRunning, (currentSession)
// TimerPage
// Circular Timer -- rerender every tick (useTimer), or when duration changes
// Progress Bar -- rerender only when a new session has been completed

// useLocalStorageState -- only progressBar should have to rerender when set is called
// TimerConfig (durations) -- config, timer,
// TimerState -- entire navbar, (timerPage out of necessity because of setters)

// SRP -- responsible for displaying timer and progress bar
function TimerPage() {
  // Contexts
  const {
    studyDurationMs,
    shortBreakDurationMs,
    longBreakDurationMs,
    longBreakReq,
  } = useContext(TimerConfigContext);
  const { setIsRunning, setIsStarted } = useContext(TimerStateContext);

  // States
  const [numStudyComplete, setNumStudyComplete] = useState(0); // SMELLY -- progress bar shouldn't rerender when this changes
  const [currentSession, setCurrentSession] = useState(SESSION_MODE.STUDY);
  const [duration, setDuration] = useState(studyDurationMs);
  const [sessions, setSessions] = useLocalStorageState(
    "sessions",
    JSON.parse(localStorage.getItem("sessions"))
  );

  // Effects
  useLayoutEffect(() => {
    switch (currentSession) {
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
    currentSession,
    studyDurationMs,
    shortBreakDurationMs,
    longBreakDurationMs,
    setDuration,
  ]);

  // HELPERS
  // Marks current session as complete, returns next chronological session mode
  function nextSession() {
    let newNumComplete;
    let nextSessionMode;

    if (currentSession === SESSION_MODE.STUDY) {
      setNumStudyComplete((prev) => {
        newNumComplete = prev + 1;
        return newNumComplete;
      });

      nextSessionMode =
        newNumComplete % longBreakReq === 0
          ? SESSION_MODE.LONG_BREAK
          : SESSION_MODE.SHORT_BREAK;

      setCurrentSession(nextSessionMode);

      return nextSessionMode;
    }

    setCurrentSession(SESSION_MODE.STUDY);
    return SESSION_MODE.STUDY;
  }

  // any way to optimize this?
  // let callbacks = {
  //   onStart: () => {
  //     console.log("Started!");
  //     setIsRunning(true);
  //     setIsStarted(true);
  //   },
  //   onTick: () => {
  //     console.log("Tick!");
  //   },
  //   onFinish: (startTime) => {
  //     let prevSessions = sessions;
  //     prevSessions.push({
  //       startTime: startTime,
  //       endTime: Date.now(),
  //       mode: currentSession,
  //     });
  //     setSessions(prevSessions);

  //     setIsRunning(false);
  //     setIsStarted(false);
  //     setCurrentSession(nextSession());
  //   },
  //   onReset: () => {
  //     console.log("Reset!");
  //     setIsRunning(false);
  //     setIsStarted(false);
  //   },
  //   onStop: () => {
  //     console.log("Stopped!");
  //     setIsRunning(false);
  //   },
  //   onNext: () => {
  //     console.log("Next");
  //     setCurrentSession(nextSession());
  //   },
  // };

  console.log(sessions);
  return (
    <div
      className="flex justify-center items-center flex-col mt-16"
      style={{ gridArea: "main" }}
    >
      {/* <div className="timer-container flex justify-center items-center">
        <CircularTimer
          thickness={0.03}
          duration={duration}
          callbacks={callbacks}
        />
      </div> */}
      <Timer />

      {/* <div className="progress-container w-72 mt-10">
        <ProgressBar
          target={4}
          completed={sessions.reduce(
            (sum, session) =>
              session.mode === SESSION_MODE.STUDY ? sum + 1 : sum,
            0
          )}
          longReq={longBreakReq}
        />
      </div> */}
      <ProgressBar />
    </div>
  );
}

export default TimerPage;
