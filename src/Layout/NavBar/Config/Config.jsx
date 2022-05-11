import styles from "./Config.module.css";
import { useState, useContext } from "react";
import { TimerConfigContext } from "../../../Contexts/TimerConfigContext";
import { TimerStateContext } from "../../../Contexts/TimerStateContext";
import Popup from "reactjs-popup";
import { DailyTargetContext } from "./../../../Contexts/DailyTargetContext";

import Setting, {
  ButtonOption,
  ButtonOptionList,
  InputOption,
  CustomizableButtonOptionList,
} from "../../../Components/Setting/Setting";

export default function Config() {
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
        <i className="fa-solid fa-screwdriver-wrench relative control-icon text-base h-2 w-2 centered-container"></i>
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
              ></InputOption>
            }
          ></Setting>
          <div className="flex justify-center">
            <button
              style={{
                borderRadius: "5px",
                width: "100%",
                height: "30px",
                backgroundColor: "var(--secondary-color)",
                opacity: "50%",
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

export function PomodoroConfig() {
  const {
    studyDurationMs,
    shortBreakDurationMs,
    longBreakDurationMs,
    setLongBreakDurationMs,
    setShortBreakDurationMs,
    setStudyDurationMs,
  } = useContext(TimerConfigContext);

  const { isRunning } = useContext(TimerStateContext);

  return (
    <div id={styles.config} className={isRunning ? "hidden" : "visible"}>
      <span className={styles.SelectRow}>
        Study:
        <SelectRow
          selections={[
            duration("25", 1500000),
            duration("60", 3600000),
            duration("90", 5400000),
            duration("120", 7200000),
          ]}
          onSelect={setStudyDurationMs}
          selected={studyDurationMs}
        ></SelectRow>
      </span>
      <span className={styles.SelectRow}>
        Short Break:
        <SelectRow
          selections={[
            duration("5", 300000),
            duration("10", 600000),
            duration("20", 1200000),
            duration("30", 1800000),
          ]}
          onSelect={setShortBreakDurationMs}
          selected={shortBreakDurationMs}
        ></SelectRow>
      </span>
      <span className={styles.longBreakRow}>
        Long Break:
        <span>
          <SelectRow
            selections={[
              duration("15", 900000),
              duration("20", 1200000),
              duration("30", 1800000),
              duration("45", 2700000),
            ]}
            onSelect={setLongBreakDurationMs}
            selected={longBreakDurationMs}
          ></SelectRow>
        </span>
      </span>
    </div>
  );
}

function SelectRow({
  selections = [],
  customEnabled = true,
  onSelect,
  selected,
}) {
  let customSelect = true;
  return (
    <span className={styles.SelectRow}>
      {selections.map((duration) => {
        if (duration.time === selected) customSelect = false;
        return (
          <span
            className={
              styles.duration +
              " " +
              (duration.time === selected && styles.active)
            }
            onClick={() => {
              onSelect(duration.time);
            }}
          >
            {duration.label}
          </span>
        );
      })}
      {(() => {
        if (customEnabled) {
          return (
            <span
              className={
                styles.duration +
                " " +
                (customSelect && styles.active) +
                " fa-solid fa-screwdriver-wrench clickable-icon ml-1 relative centered-container inline-flex"
              }
              onClick={() => {
                onSelect(5 * 1000);
              }}
            ></span>
          );
        }
      })()}
    </span>
  );
}

function duration(label, ms) {
  return { label: label, time: ms };
}
