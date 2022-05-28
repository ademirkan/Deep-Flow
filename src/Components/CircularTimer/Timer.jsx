import CircularProgress from "./CircularProgress/CircularProgress";
import useTimer from "../../Hooks/useTimer";
import styles from "./CircularTimer.module.css";
import ControlBar from "./ControlBar";
import { useContext } from "react";
import { TimerStateContext } from "./../../Contexts/TimerStateContext";
import { SessionsContext } from "./../../Contexts/SessionsContext";
import { formatTime } from "./../../Helpers/formatTime";
import { TimerModeContext } from "./../../Contexts/TimerModeContext";

// SRP -- creates callbacks and calls timer component of current mode (pomodoro, stopwatch, etc)
export default function Timer() {
  // Contexts
  const { setIsRunning, setIsStarted } = useContext(TimerStateContext);
  const { sessions, setSessions } = useContext(SessionsContext);

  // Study Schedule Handler
  const { mode } = useContext(TimerModeContext);

  // 🤔 Timer callbacks, useCallback?
  let callbacks = {
    onStart: () => {
      setIsRunning(true);
      setIsStarted(true);
    },
    onTick: () => {
      console.log("Tick!");
    },
    onFinish: (startTime) => {
      console.log("Finish");
      let prevSessions = [...sessions];
      prevSessions.push({
        startTime: startTime,
        endTime: Date.now(),
        mode: mode.scheduler.currentMode,
      });
      setSessions(prevSessions);

      setIsRunning(false);
      setIsStarted(false);
      mode.scheduler.next();
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
      console.log("Next, progress will not be counted");
      setIsRunning(false);
      setIsStarted(false);
      mode.scheduler.next();
    },
  };

  // if mode label is pomodoro, call PomodoroTimer. Else if mode label is stopwtch, call StopwatchTimer
  return (
    <div className={styles.timerContainer}>
      {(() => {
        if (mode.label === "pomodoro") {
          return (
            <PomodoroTimer
              thickness={0.03}
              duration={mode.scheduler.duration}
              callbacks={callbacks}
              label={mode.scheduler.currentMode}
            />
          );
        } else if (mode.label === "stopwatch") {
          return <StopwatchTimer />;
        }
      })()}
    </div>
  );
}

function PomodoroTimer({ thickness = 0.1, duration, callbacks, label }) {
  // Initialize useTimer hook

  const timer = useTimer(duration, callbacks);

  let remainingTime = duration - timer.time;
  return (
    <>
      <CircularProgress
        percentFilled={
          timer.isRunning
            ? (remainingTime - 900) / duration
            : remainingTime / duration
        }
        thickness={thickness}
        animationDuration={timer.isRunning ? "1s" : "0.15s"}
      />
      <div id={styles.innerUI}>
        <div className="centered-container" style={{ gridArea: "label" }}>
          <span
            className={
              styles.label +
              " " +
              (timer.isRunning ? styles.hidden : styles.visible)
            }
          >
            {label}
          </span>
        </div>
        <TextTimer
          seconds={remainingTime / 1000}
          style={{ color: "var(--title-color)" }}
        ></TextTimer>
        <ControlBar
          isRunning={timer.isRunning}
          handleStart={timer.start}
          handleStop={timer.stop}
          handleNext={timer.next}
          handleReset={timer.reset}
        />
      </div>
    </>
  );
}

function TextTimer({ seconds, style = {} }) {
  return (
    <div className={styles.textTimer} style={style}>
      {formatTime(seconds)}
    </div>
  );
}
