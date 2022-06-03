import CircularProgress from "./CircularProgress/CircularProgress";
import useCountdown from "../../Hooks/useCountdown";
import styles from "./CircularTimer.module.css";
import ControlBar from "./ControlBar";
import { useContext, useState } from "react";
import { TimerStateContext } from "../../Contexts/TimerStateContext";
import { SessionsContext } from "../../Contexts/SessionsContext";
import { formatTime } from "../../Helpers/formatTime";

// SRP -- creates callbacks and delegates to
export default function CountdownTimer({
  duration,
  label = "",
  onFinish = (start, stop, time) => {}, // call when timer reaches duration
  onAbort = (start, stop, time) => {}, // call when timer is aborted before finishing
  overtime = false,
}) {
  const { setIsRunning, setIsStarted } = useContext(TimerStateContext);
  const { sessions, setSessions } = useContext(SessionsContext);
  const [events, setEvents] = useState([
    {
      time: duration - 5 * 1000 * 60,
      callback: () => {
        console.log("5 Minutes left!");
      },
    },
  ]);

  // 🤔 Timer callbacks, useCallback?
  let callbacks = {
    onFirstStart: () => {
      setIsRunning(true);
      setIsStarted(true);
    },
    onStart: () => {
      setIsRunning(true);
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
      callback();
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
    onAbort: () => {
      console.log("Abort, go next, progress will not be counted");
      setIsRunning(false);
      setIsStarted(false);
      callback(); //
    },
  };

  return (
    <div className={styles.timerContainer}>
      <CircularCountdownTimer
        duration={duration}
        label={label}
        callbacks={callbacks}
        events={events}
      />
    </div>
  );
}

function CircularCountdownTimer({
  duration,
  currentTime,
  label = "",
  clockwise = true,
}) {
  // if currentTime > duration, overtime
  // Initialize useCountdown hook
  // const timer = useCountdown(duration, callbacks, events);
  // let remainingTime = duration - timer.time;
  // const handleNext = () => {
  //   callbacks.onAbort();
  // };
  // return (
  //   <>
  //     <CircularProgress
  //       percentFilled={
  //         timer.isRunning
  //           ? (remainingTime - 900) / duration
  //           : remainingTime / duration
  //       }
  //       thickness={0.03}
  //       animationDuration={timer.isRunning ? "1s" : "0.15s"}
  //     />
  //     <div id={styles.innerUI}>
  //       <div className="centered-container" style={{ gridArea: "label" }}>
  //         <span
  //           className={
  //             styles.label +
  //             " " +
  //             (timer.isRunning ? styles.hidden : styles.visible)
  //           }
  //         >
  //           {label}
  //         </span>
  //       </div>
  //       <TextTimer
  //         seconds={remainingTime / 1000}
  //         style={{ color: "var(--title-color)" }}
  //       />
  //       <ControlBar
  //         isRunning={timer.isRunning}
  //         onStart={timer.start}
  //         onStop={timer.stop}
  //         onNext={handleNext}
  //         onReset={timer.reset}
  //       />
  //     </div>
  //   </>
  // );
}

function TextTimer({ seconds, style = {} }) {
  return (
    <div className={styles.textTimer} style={style}>
      {formatTime(seconds)}
    </div>
  );
}
