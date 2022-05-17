import styles from "./Config.module.css";
import { useState, useContext } from "react";
import { TimerConfigContext } from "../../../Contexts/TimerConfigContext";
import { TimerStateContext } from "../../../Contexts/TimerStateContext";
import Popup from "reactjs-popup";
import { DailyTargetContext } from "./../../../Contexts/DailyTargetContext";
import useLocalStorageState from "./../../../Hooks/useLocalStorageState";

import Setting, {
  ButtonOption,
  ButtonOptionList,
  InputOption,
  CustomizableButtonOptionList,
} from "../../../Components/Setting/Setting";

export function PomodoroConfig() {
  const {
    studyDurationMs,
    shortBreakDurationMs,
    longBreakDurationMs,
    longBreakReq,
    setLongBreakDurationMs,
    setShortBreakDurationMs,
    setStudyDurationMs,
    setLongBreakReq,
  } = useContext(TimerConfigContext);

  const { dailyTarget, setDailyTarget } = useContext(DailyTargetContext);

  return (
    <Popup
      trigger={
        <i className="fa-solid fa-screwdriver-wrench relative inline mx-1 h-1 w-1 "></i>
      }
      modal
      nested
    >
      {(close) => (
        <div className={styles.modal}>
          <h1 className={styles.header}> Pomodoro configuration </h1>

          {/* used to remove autofocus property*/}
          <input type="number" autoFocus style={{ display: "none" }}></input>
          <Setting
            title="Study duration"
            description="Length of the study duration"
            actionArea={
              <CustomizableButtonOptionList
                options={[
                  { label: "25", value: 25 * 1000 * 60 },
                  { label: "50", value: 50 * 1000 * 60 },
                  { label: "90", value: 90 * 1000 * 60 },
                ]}
                currentValue={studyDurationMs}
                setValue={setStudyDurationMs}
                toValue={(label) => parseInt(label) * 1000 * 60}
              ></CustomizableButtonOptionList>
            }
          ></Setting>

          <Setting
            title="Short break"
            description="Length of the short break duration"
            actionArea={
              <CustomizableButtonOptionList
                options={[
                  { label: "5", value: 5 * 1000 * 60 },
                  { label: "10", value: 10 * 1000 * 60 },
                  { label: "15", value: 15 * 1000 * 60 },
                ]}
                currentValue={shortBreakDurationMs}
                setValue={setShortBreakDurationMs}
                toValue={(label) => parseInt(label) * 1000 * 60}
              ></CustomizableButtonOptionList>
            }
          ></Setting>
          <Setting
            title="Long break"
            description="Length of the long break duration"
            actionArea={
              <CustomizableButtonOptionList
                options={[
                  { label: "15", value: 15 * 1000 * 60 },
                  { label: "30", value: 30 * 1000 * 60 },
                  { label: "45", value: 45 * 1000 * 60 },
                ]}
                currentValue={longBreakDurationMs}
                setValue={setLongBreakDurationMs}
                toValue={(label) => parseInt(label) * 1000 * 60}
              ></CustomizableButtonOptionList>
            }
          ></Setting>

          <Setting
            title="Pomodoro cycle"
            description="Number of pomodoros required for a long break"
            actionArea={
              <InputOption
                currentValue={longBreakReq}
                setValue={(value) => {
                  setLongBreakReq(parseInt(value));
                }}
                placeholder={longBreakReq}
              ></InputOption>
            }
          ></Setting>

          <Setting
            title="Daily target"
            description="The number of pomodoros displayed on the progress bar"
            actionArea={
              <InputOption
                currentValue={dailyTarget}
                setValue={setDailyTarget}
                placeholder={dailyTarget}
              ></InputOption>
            }
          ></Setting>
          <div className="flex justify-center">
            <button
              style={{
                borderRadius: "0.5rem",
                width: "100%",
                height: "40px",
                backgroundColor: "var(--alt-secondary-color)",
              }}
              onClick={() => {
                close();
              }}
            >
              ok
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default function Config() {
  const { isRunning } = useContext(TimerStateContext);
  // const [studyMode, setStudyMode] = useLocalStorageState(
  //   "studyMode",
  //   "pomodoro"
  // );

  // What i want -- to list 3 different modes, have config button display the mode's config settings, and have the timer use the mode's schedule

  // Scheduler = duration, next, currentMode

  // Modes = [{label, scheduler = {duration, next(), currentMode}, config}]
  return (
    <div id={styles.config} className={isRunning ? "hidden" : "visible"}>
      <span id="config-mode">
        <span className={styles.configOption + " " + styles.configOptionActive}>
          pomodoro
        </span>
        <span className={styles.configOption}>stopwatch</span>
        <span className={styles.configOption}>deepwork</span>
        <PomodoroConfig></PomodoroConfig>
      </span>

      <span id="config-timer">
        <span className={styles.configOption + " " + styles.configOptionActive}>
          overtime
        </span>
        <span className={styles.configOption + " "}>mute</span>
      </span>
    </div>
  );
}

function option(label, value) {
  return { label: label, value: value };
}
