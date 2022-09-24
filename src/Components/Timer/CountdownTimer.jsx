import CircularProgress from "../CircularProgress/CircularProgress";
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
