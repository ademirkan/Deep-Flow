import useStopwatch from "../../Hooks/useStopwatch";
import styles from "./CircularTimer.module.css";
import React, { FC } from "react";
import { ITimerViewProps } from "./../../Typescript/Interfaces/ITimerViewProps";
import { ITimerProps } from "./../../Typescript/Interfaces/ITimerProps";
import { TimerView } from "../../Typescript/Types/TimerView";

export const StopwatchTimer: (props: ITimerProps) => TimerView = (props) => {
  // Stopwatch hook w/ logic
  const { time, isRunning, isStarted, start, stop, reset, finish, quit } =
    useStopwatch(props.callbacks);

  // props for stopwatch view constructor
  const vcprops: ITimerViewProps = {
    targetTime: props.targetDuration,
    isRunning,
    isStarted,
    elapsedTime: new Date(),
    onStart: start,
    onPause: stop,
    onReset: reset,
    onFinish: finish,
  };

  return (
    <div className={styles.timerContainer}>
      {props.viewConstructor({ ...vcprops })}
    </div>
  );
};
