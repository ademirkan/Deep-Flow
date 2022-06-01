import CircularProgress from "./CircularProgress/CircularProgress";
import useCountdown from "../../Hooks/useCountdown";
import styles from "./CircularTimer.module.css";
import ControlBar from "./ControlBar";
import { useContext } from "react";
import { TimerStateContext } from "../../Contexts/TimerStateContext";
import { SessionsContext } from "../../Contexts/SessionsContext";
import { formatTime } from "../../Helpers/formatTime";

// SRP -- creates callbacks and delegates to
export default function CountdownTimer({
  duration,
  label = "",
  onFinish = () => {},
}) {
  // Contexts
  const { setIsRunning, setIsStarted } = useContext(TimerStateContext);
  const { sessions, setSessions } = useContext(SessionsContext);

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
        mode: label,
      });
      setSessions(prevSessions);

      setIsRunning(false);
      setIsStarted(false);
      onFinish();
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
      onFinish();
    },
  };

  return (
    <div className={styles.timerContainer}>
      <CircularCountdownTimer
        duration={duration}
        label={label}
        callbacks={callbacks}
      />
    </div>
  );
}

function CircularCountdownTimer({ duration, callbacks, label }) {
  // Initialize useCountdown hook

  const timer = useCountdown(duration, callbacks);

  let remainingTime = duration - timer.time;
  return (
    <>
      <CircularProgress
        percentFilled={
          timer.isRunning
            ? (remainingTime - 900) / duration
            : remainingTime / duration
        }
        thickness={0.03}
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
        />
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
