import useStopwatch from "./../../Hooks/useStopwatch";
import styles from "./CircularTimer.module.css";
import CircularProgress from "./CircularProgress/CircularProgress";
import { formatTime } from "../../Helpers/formatTime";

export default function StopwatchTimer({
  minimumDuration,
  callbacks,
  events,
  viewConstructor = () => {},
}) {
  // Stopwatch hook w/ logic
  const { time, isRunning, isStarted, start, stop, reset, finish, quit } =
    useStopwatch(callbacks, events);

  // props for viewConstructor
  const props = {
    // useStopwatch methods
    minimumDuration,
    isRunning,
    isStarted,
    elapsedTime: time,
    onStart: start,
    onStop: stop,
    onReset: reset,
    onFinish: finish,
    onQuit: quit,
  };

  return <div className={styles.timerContainer}>{viewConstructor(props)}</div>;
}

export const CircularStopwatchView = ({
  minimumDuration,
  isRunning,
  isStarted,
  elapsedTime,
  onStart,
  onStop,
  onReset,
  onFinish,
  onQuit,
  label, // how do i handle button and label since we get mode from Timer()?
}) => {
  const isFinishable = isRunning && elapsedTime >= minimumDuration;

  const button = !isStarted ? (
    <div className="button h-8 w-32 flex-grow-0" onClick={onStart}>
      start
    </div>
  ) : isFinishable ? (
    <div className="button h-8 w-32 flex-grow-0" onClick={onFinish}>
      finish
    </div>
  ) : (
    <div className="button h-8 w-32 flex-grow-0" onClick={onQuit}>
      quit
    </div>
  );

  return (
    <>
      <CircularProgress
        filledPercent={1}
        thickness={0.03}
        animationDuration={"0s"}
        primaryColor={
          !isStarted || isFinishable
            ? "var(--primary-color)"
            : "var(--secondary-color)"
        }
      />

      <div id={styles.innerUI}>
        <div className="centered-container" style={{ gridArea: "label" }}>
          <span
            className={
              styles.label + " " + (isRunning ? styles.hidden : styles.visible)
            }
          >
            {label}
          </span>
        </div>
        <TextTimer
          seconds={elapsedTime / 1000}
          style={{ color: "var(--title-color)" }}
        />
        <div
          id={styles.controlBar}
          className="flex justify-center items-center h-16 "
        >
          {button}
        </div>
      </div>
    </>
  );
};
function TextTimer({ seconds, style = {} }) {
  return (
    <div className={styles.textTimer} style={style}>
      {formatTime(seconds)}
    </div>
  );
}
