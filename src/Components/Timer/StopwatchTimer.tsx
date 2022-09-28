import useStopwatch from "../../Hooks/useStopwatch";
import React, { FC } from "react";
import { ITimerViewProps } from "./../../Typescript/Interfaces/ITimerViewProps";
import { ITimerProps } from "./../../Typescript/Interfaces/ITimerProps";
import { TimerView } from "../../Typescript/Types/TimerView";

const StopwatchTimer = (props: ITimerProps) => {
  // Stopwatch hook w/ logic
  const { time, isRunning, isStarted, start, stop, reset, finish } =
    useStopwatch(props.callbacks);

  // props for stopwatch view constructor
  const hookProps: ITimerViewProps = {
    targetTime: props.targetDuration,
    isRunning,
    isStarted,
    elapsedTime: time,
    onStart: start,
    onPause: stop,
    onReset: reset,
    onFinish: finish,
  };

  const timerView = props.viewConstructor({ ...hookProps });

  return <div className="timerContainer">{timerView}</div>;
};

export default StopwatchTimer;
