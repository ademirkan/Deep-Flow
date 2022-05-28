import styles from "./Config.module.css";
import { useState, useContext } from "react";
import { TimerStateContext } from "../../../Contexts/TimerStateContext";
import Popup from "reactjs-popup";
import useLocalStorageState from "./../../../Hooks/useLocalStorageState";
import { SchedulerContext } from "./../../../Contexts/SchedulerContext";

export default function Config() {
  const { isRunning } = useContext(TimerStateContext);
  const [mode, setMode] = useLocalStorageState("studyMode", "pomodoro");

  const modesByType = {
    pomodoro: (isActive) => <PomodoroMode isActive={isActive} />,
    stopwatch: (isActive) => <StopwatchMode isActive={isActive} />,
    custom: (isActive) => <CustomMode isActive={isActive} />,
  };

  return (
    <div id={styles.config} className={isRunning ? "hidden" : "visible"}>
      <span id="config-mode">
        {Object.entries(modesByType).map((m) => m[1](m[0] === mode))}
      </span>
    </div>
  );

  // return (
  //   <div id={styles.config} className={isRunning ? "hidden" : "visible"}>
  //     <span id="config-mode">
  //       <span className={styles.configOption + " " + styles.configOptionActive}>
  //         pomodoro
  //       </span>
  //       <span
  //         className={styles.configOption}
  //         onClick={() => setMode("stopwatch")}
  //       >
  //         stopwatch
  //       </span>
  //       <span className={styles.configOption}>deepwork</span>
  //       <Popup
  //         trigger={
  //           <i className="fa-solid fa-screwdriver-wrench relative inline mx-1 h-1 w-1 "></i>
  //         }
  //         modal
  //         nested
  //       >
  //         {mode.config}
  //       </Popup>
  //     </span>

  //     <span id="config-timer">
  //       <span className={styles.configOption + " " + styles.configOptionActive}>
  //         overtime
  //       </span>
  //       <span className={styles.configOption + " "}>mute</span>
  //       <span className={styles.configOption + " "}>autostart</span>
  //     </span>

  //     {mode.label === "pomodoro" && (
  //       <span id="config-pomodoro">
  //         <span
  //           className={styles.configOption + " " + styles.configOptionActive}
  //         >
  //           study
  //         </span>
  //         <span className={styles.configOption + " "}>short</span>
  //         <span className={styles.configOption + " "}>long</span>
  //       </span>
  //     )}
  //   </div>
  // );
}
