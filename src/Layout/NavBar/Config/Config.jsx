import styles from "./Config.module.css";
import { useState, useContext } from "react";
import { TimerStateContext } from "../../../Contexts/TimerStateContext";
import Popup from "reactjs-popup";
import { TimerModeContext } from "./../../../Contexts/TimerModeContext";

export default function Config() {
  const { isRunning } = useContext(TimerStateContext);
  const { mode, setMode } = useContext(TimerModeContext);

  return (
    <div id={styles.config} className={isRunning ? "hidden" : "visible"}>
      <span id="config-mode">
        <span className={styles.configOption + " " + styles.configOptionActive}>
          pomodoro
        </span>
        <span
          className={styles.configOption}
          onClick={() => setMode("stopwatch")}
        >
          stopwatch
        </span>
        <span className={styles.configOption}>deepwork</span>
        <Popup
          trigger={
            <i className="fa-solid fa-screwdriver-wrench relative inline mx-1 h-1 w-1 "></i>
          }
          modal
          nested
        >
          {mode.config}
        </Popup>
      </span>

      <span id="config-timer">
        <span className={styles.configOption + " " + styles.configOptionActive}>
          overtime
        </span>
        <span className={styles.configOption + " "}>mute</span>
        <span className={styles.configOption + " "}>autostart</span>
      </span>

      {mode.label === "pomodoro" && (
        <span id="config-pomodoro">
          <span
            className={styles.configOption + " " + styles.configOptionActive}
          >
            study
          </span>
          <span className={styles.configOption + " "}>short</span>
          <span className={styles.configOption + " "}>long</span>
        </span>
      )}
    </div>
  );
}
