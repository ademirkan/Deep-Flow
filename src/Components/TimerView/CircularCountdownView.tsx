import React from "react";
import CircularProgress from "../CircularProgress/CircularProgress";
import styles from "./CircularTimerView.module.css";
import { formatTime } from "../../Helpers/formatTime";
import { ITimerViewProps } from "../../Typescript/Interfaces/ITimerViewProps";

interface ICircularCountdownViewProps extends ITimerViewProps {
  clockwise: boolean;
  label: string;
}

export default function CircularCountdownView(
  props: ICircularCountdownViewProps
) {
  let remainingTime = props.targetTime.valueOf() - props.elapsedTime.valueOf();

  // calculate overtime duration
  let overtimeMs = 0;
  if (remainingTime < 0) {
    overtimeMs = remainingTime * -1;
  }

  return (
    <>
      <CircularProgress
        filledPercent={
          props.isRunning
            ? (remainingTime - 900) / props.targetTime.valueOf()
            : remainingTime / props.targetTime.valueOf()
        }
        thickness={0.03}
        animationDuration={props.isRunning ? "1s" : "0.15s"}
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
          time={props.elapsedTime}
          style={{ color: "var(--title-color)" }}
        />
        {overtimeMs === 0 ? (
          <ControlBar isRunning={props.isRunning}>
            {!props.isRunning ? (
              <ControlButton
                icon={
                  <i className="fa-solid centered-container fa-circle-play control-icon text-3xl " />
                }
                onClick={props.onStart}
              />
            ) : overtimeMs === 0 ? (
              <>
                <ControlButton
                  icon={
                    <i className="fa-solid centered-container fa-clock-rotate-left control-icon" />
                  }
                  onClick={props.onReset}
                />
                <ControlButton
                  icon={
                    <i className="fa-solid centered-container fa-circle-pause control-icon text-3xl" />
                  }
                  onClick={props.onPause}
                />
                <ControlButton
                  icon={
                    <i className="fa-solid centered-container fa-circle-chevron-right control-icon"></i>
                  }
                  onClick={props.onFinish}
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

function TextTimer({ time, style = {} }) {
  console.log(time);
  return (
    <div className={styles.textTimer} style={style}>
      {formatTime(time)}
    </div>
  );
}

function ControlBar({ isRunning, children }) {
  return (
    <div id={styles.controlBar} className="flex justify-around h-16 ">
      {children}
    </div>
  );
}

function ControlButton({ icon, onClick }) {
  return (
    <div className="control-button" onClick={onClick}>
      {icon}
    </div>
  );
}
