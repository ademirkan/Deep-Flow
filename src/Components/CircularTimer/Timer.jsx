import CircularProgress from "./CircularProgress";
import TextTimer from "../TextTimer";
import useTimer from "../../Hooks/useTimer";
import styles from "./CircularTimer.module.css";
import ControlBar from "./ControlBar";
import { useContext } from "react";
import { TimerStateContext } from "./../../Contexts/TimerStateContext";
import usePomodoroScheduler from "./../../Hooks/usePomodoroScheduler";
import { SessionsContext } from "./../../Contexts/SessionsContext";

export default function Timer() {
  // Contexts
  const { setIsRunning, setIsStarted } = useContext(TimerStateContext);
  const { sessions, setSessions } = useContext(SessionsContext);

  // Study Schedule Handler
  const scheduler = usePomodoroScheduler();

  // Timer callbacks
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
        mode: scheduler.currentMode,
      });
      setSessions(prevSessions);

      setIsRunning(false);
      setIsStarted(false);
      scheduler.next();
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
      scheduler.next();
    },
  };

  return (
    <div className="timer-container flex justify-center items-center">
      <CircularTimer
        thickness={0.03}
        duration={scheduler.duration}
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
