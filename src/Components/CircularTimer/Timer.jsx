import CircularProgress from "./CircularProgress";
import TextTimer from "../TextTimer";
import useTimer from "../../Hooks/useTimer";
import styles from "./CircularTimer.module.css";
import ControlBar from "./ControlBar";
import { useContext } from "react";
import { TimerConfigContext } from "./../../Contexts/TimerConfigContext";
import { TimerStateContext } from "./../../Contexts/TimerStateContext";

export default function Timer() {
  const {
    studyDurationMs,
    shortBreakDurationMs,
    longBreakDurationMs,
    longBreakReq,
  } = useContext(TimerConfigContext);

  const { setIsRunning, setIsStarted } = useContext(TimerStateContext);

  return (
    <div className="timer-container flex justify-center items-center">
      <CircularTimer
        thickness={0.03}
        duration={duration}
        callbacks={callbacks}
      />
    </div>
  );
}

function CircularTimer({ thickness = 0.1, duration, callbacks }) {
  // Initialize useTimer hook

  const timer = useTimer(duration, callbacks);

  let remainingTime = duration - timer.time;
  return (
    <>
      {/* <div id={styles.backgroundCircle}></div> */}
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
        <TextTimer seconds={remainingTime / 1000}></TextTimer>
        <ControlBar
          isRunning={timer.isRunning}
          handleStart={timer.start}
          handleStop={timer.stop}
          handleReset={timer.reset}
        />
      </div>
    </>
  );
}
