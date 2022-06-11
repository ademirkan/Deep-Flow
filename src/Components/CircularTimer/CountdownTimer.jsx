import CircularProgress from "./CircularProgress/CircularProgress";
import useStopwatch from "../../Hooks/useStopwatch";
import styles from "./CircularTimer.module.css";
import ControlBar, { ControlButton } from "./ControlBar";
import { formatTime } from "../../Helpers/formatTime";

export default function CountdownTimer({
  duration,
  callbacks,
  events,
  overtime = false,
  viewConstructor = () => {},
}) {
  // Stopwatch hook
  const { time, isRunning, isStarted, start, stop, reset, finish, quit } =
    useStopwatch(callbacks, events);

  // TODO -- optimize?
  const props = {
    duration,
    isRunning,
    isStarted,
    overtime,
    elapsedTime: time,
    onStart: start,
    onStop: stop,
    onReset: reset,
    onFinish: finish,
    onQuit: quit,
  };

  // if countdown ends
  if (!overtime && time > duration) {
    finish();
  }

  return <div className={styles.timerContainer}>{viewConstructor(props)}</div>;
}

export function CircularCountdownView({
  duration,
  elapsedTime,
  label = "",
  clockwise = true,
  onStart,
  onStop,
  onQuit,
  onReset,
  isRunning,
  onFinish, // only used for overtime manual finish
}) {
  let remainingTime = duration - elapsedTime;

  // calculate overtime duration
  let overtimeMs = 0;
  if (remainingTime < 0) {
    overtimeMs = remainingTime * -1;
  }

  return (
    <>
      <CircularProgress
        filledPercent={
          isRunning
            ? (remainingTime - 900) / duration
            : remainingTime / duration
        }
        thickness={0.03}
        animationDuration={isRunning ? "1s" : "0.15s"}
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
          seconds={remainingTime / 1000}
          style={{ color: "var(--title-color)" }}
        />
        {overtimeMs === 0 ? (
          <ControlBar isRunning={isRunning}>
            {!isRunning ? (
              <ControlButton
                icon={
                  <i className="fa-solid centered-container fa-circle-play control-icon text-3xl " />
                }
                onClick={onStart}
              />
            ) : overtimeMs === 0 ? (
              <>
                <ControlButton
                  icon={
                    <i className="fa-solid centered-container fa-clock-rotate-left control-icon" />
                  }
                  onClick={onReset}
                />
                <ControlButton
                  icon={
                    <i className="fa-solid centered-container fa-circle-pause control-icon text-3xl" />
                  }
                  onClick={onStop}
                />
                <ControlButton
                  icon={
                    <i className="fa-solid centered-container fa-circle-chevron-right control-icon"></i>
                  }
                  onClick={onQuit}
                />
              </>
            ) : (
              <div className="button">break</div>
            )}
          </ControlBar>
        ) : (
          <div className="button">yeet</div>
        )}
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
