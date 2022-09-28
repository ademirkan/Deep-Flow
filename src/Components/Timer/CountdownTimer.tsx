import useStopwatch from "../../Hooks/useStopwatch";
import { ITimerProps } from "./../../Typescript/Interfaces/ITimerProps";
import { ITimerViewProps } from "./../../Typescript/Interfaces/ITimerViewProps";
import React from "react";
interface ICountdownTimerProps extends ITimerProps {
  /**
  viewConstructor: TimerViewConstructor;
  targetDuration: Time;
  callbacks: ITimerCallbacks;
   */
  overtime: boolean;
}

const CountdownTimer: (props: ICountdownTimerProps) => JSX.Element = (
  props
) => {
  // Stopwatch hook w/ logic
  const { time, isRunning, isStarted, start, stop, reset, finish } =
    useStopwatch(props.callbacks);

  // useStopwatch props for stopwatch view constructor
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

  // end countdown automatically
  if (!props.overtime && time > props.targetDuration) {
    finish();
  }

  return <div className="timerContainer">{timerView}</div>;
};

export default CountdownTimer;
