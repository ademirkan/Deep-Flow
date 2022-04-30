import styles from "./NavBar.module.css";
import { useState, useContext } from "react";
import { TimerConfigContext } from "../../Contexts/TimerConfigContext";
import { TimerStateContext } from "../../Contexts/TimerStateContext";
export default function Config() {
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
        return (
          <span
            className={
              styles.duration +
              " " +
              (duration.time == selected && styles.active)
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
              className={styles.duration + " " + (customSelect && "active")}
              onClick={() => {
                onSelect(5 * 1000);
              }}
            >
              | custom
            </span>
          );
        }
      })()}
    </span>
  );
}

function duration(label, ms) {
  return { label: label, time: ms };
}
