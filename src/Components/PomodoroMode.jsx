import { useContext, useEffect, useState, useCallback } from "react";
import { ProgressbarContext } from "./../Contexts/ProgressbarContext";
import useLocalStorageState from "./../Hooks/useLocalStorageState";
import {
  SESSION_LABEL,
  STUDY_MODE,
  TIMER_TYPE,
  DURATION,
} from "./../Helpers/enum";
import useSessionStorageState from "./../Hooks/useSessionStorageState";
import { SchedulerContext } from "./../Contexts/SchedulerContext";
import Setting, {
  CustomizableButtonOptionList,
  InputOption,
} from "./Setting/Setting";

import styles from "./Mode.module.css";

export const PomodoroMode = ({ isActive, onSelect, setConfig, children }) => {
  const name = STUDY_MODE.POMODORO;

  // Contexts
  const progressContext = useContext(ProgressbarContext);
  const { setScheduler } = useContext(SchedulerContext);

  // Timer Configuration
  const [studyDurationMs, setStudyDurationMs] = useLocalStorageState(
    "POMODORO_STUDY",
    25 * 60 * 1000
  );
  const [shortBreakDurationMs, setShortBreakDurationMs] = useLocalStorageState(
    "POMODORO_SHORT_BREAK",
    5 * 60 * 1000
  );
  const [longBreakDurationMs, setLongBreakDurationMs] = useLocalStorageState(
    "POMODORO_LONG_BREAK",
    15 * 60 * 1000
  );
  const [longBreakReq, setLongBreakReq] = useLocalStorageState(
    "POMODORO_NUM_FULL_SESSION",
    4
  );
  const [pomodoroDailyTarget, setPomodoroDailyTarget] = useLocalStorageState(
    "POMODORO_DAILY_TARGET",
    8
  );

  // Current session trackers
  const [mode, setMode] = useState(SESSION_LABEL.STUDY);
  const [numStudyComplete, setNumStudyComplete] = useSessionStorageState(
    "currentNumCompleted",
    0
  );

  // Scheduler object = {label, currentTimer, next, config}
  const scheduler = (() => {
    function getDuration(mode) {
      switch (mode) {
        case SESSION_LABEL.STUDY:
          return studyDurationMs;
        case SESSION_LABEL.SHORT_BREAK:
          return shortBreakDurationMs;
        default:
          return longBreakDurationMs;
      }
    }

    const currentTimer = {
      type: TIMER_TYPE.COUNTDOWN,
      label: mode,
      duration: getDuration(mode),
    };

    // next -- updates mode and numStudyComplete
    function next() {
      let newNumComplete;
      let nextSessionMode;

      if (mode === SESSION_LABEL.STUDY) {
        newNumComplete = numStudyComplete + 1;
        setNumStudyComplete(newNumComplete);
        nextSessionMode =
          newNumComplete % longBreakReq === 0
            ? SESSION_LABEL.LONG_BREAK
            : SESSION_LABEL.SHORT_BREAK;

        setMode(nextSessionMode);
        return;
      }

      setMode(SESSION_LABEL.STUDY);
    }

    // config
    const config = (close) => (
      <div className={styles.modal}>
        <h1 className={styles.header}> Pomodoro config </h1>

        <input type="number" autoFocus style={{ display: "none" }}></input>
        <Setting
          title="Study duration"
          description="Length of the study duration"
          actionArea={
            <CustomizableButtonOptionList
              options={[
                { label: "25", value: DURATION[25] },
                { label: "50", value: DURATION[50] },
                { label: "90", value: DURATION[90] },
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
                { label: "5", value: DURATION[5] },
                { label: "10", value: DURATION[10] },
                { label: "15", value: DURATION[15] },
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
                { label: "15", value: DURATION[15] },
                { label: "30", value: DURATION[30] },
                { label: "45", value: DURATION[45] },
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
                progressContext.setSessionLength(parseInt(value));
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
              currentValue={pomodoroDailyTarget}
              setValue={(value) => {
                setPomodoroDailyTarget(parseInt(value));
                progressContext.setDailyTarget(parseInt(value));
              }}
              placeholder={pomodoroDailyTarget}
            ></InputOption>
          }
        ></Setting>
        <div className="flex justify-center">
          <button
            className="button"
            style={{
              borderRadius: "0.5rem",
              width: "100%",
              height: "40px",
            }}
            onClick={close}
          >
            ok
          </button>
        </div>
      </div>
    );
    return { name, currentTimer, next, config };
  })();

  const handleClick = () => {
    onSelect(name, scheduler.config);
    progressContext.setDailyTarget(pomodoroDailyTarget);
    progressContext.setSessionLength(longBreakReq);
  };

  // First mount
  useEffect(() => {
    if (isActive) {
      progressContext.setDailyTarget(pomodoroDailyTarget);
      progressContext.setSessionLength(longBreakReq);

      // setSchedule
      setScheduler(scheduler.label, scheduler.currentTimer, scheduler.next);

      setConfig(() => scheduler.config);
    }
  }, []);

  // Rerenders -- listen to isActive, config states, and session trackers
  useEffect(() => {
    if (isActive) {
      // setSchedule
      setScheduler(scheduler.label, scheduler.currentTimer, scheduler.next);
      setConfig(() => scheduler.config);
    }
  }, [
    progressContext,
    studyDurationMs,
    shortBreakDurationMs,
    longBreakDurationMs,
    longBreakReq,
    pomodoroDailyTarget,
    mode,
    numStudyComplete,
    isActive,
    longBreakReq,
  ]);

  useEffect(() => {
    if (isActive) {
      progressContext.setDailyTarget(pomodoroDailyTarget);
      progressContext.setSessionLength(longBreakReq);
    }
  }, [pomodoroDailyTarget, longBreakReq]);
  return (
    <span
      className={styles.mode + " " + (isActive ? styles.active : "")}
      onClick={handleClick}
    >
      {name}
    </span>
  );
};
