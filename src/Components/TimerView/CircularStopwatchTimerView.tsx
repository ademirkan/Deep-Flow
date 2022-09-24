import React from "react";
import CircularProgress from "../CircularProgress/CircularProgress";
import styles from "./CircularTimerView.module.css";
import { formatTime } from "./../../Helpers/formatTime";
import { FC } from "react";
import { TimerView } from "../../Typescript/Types/TimerView";
import { ITimerViewProps } from "../../Typescript/Interfaces/ITimerViewProps";
import { ReactNode } from "react";

interface ICircularStopwatchTimerViewProps extends ITimerViewProps {
  /* 
  targetTime: Time;
  isRunning: boolean;
  isStarted: boolean;
  elapsedTime: Time;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onFinish?: () => void;
  label?: string; 
  */
  clockwise: boolean;
}

export const CircularStopwatchTimerView: (
  props: ICircularStopwatchTimerViewProps
) => ReactNode = (props) => {
  const isFinishable = props.isRunning && props.elapsedTime >= props.targetTime;

  const button = !props.isStarted ? (
    <div className="button h-8 w-32 flex-grow-0" onClick={props.onStart}>
      start
    </div>
  ) : isFinishable ? (
    <div className="button h-8 w-32 flex-grow-0" onClick={props.onFinish}>
      finish
    </div>
  ) : (
    <div className="button h-8 w-32 flex-grow-0" onClick={props.onReset}>
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
          !props.isStarted || isFinishable
            ? "var(--primary-color)"
            : "var(--secondary-color)"
        }
      />

      <div id={styles.innerUI}>
        <div className="centered-container" style={{ gridArea: "label" }}>
          <span
            className={
              styles.label +
              " " +
              (props.isRunning ? styles.hidden : styles.visible)
            }
          >
            {props.label}
          </span>
        </div>
        <TextTimer
          seconds={props.elapsedTime}
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
