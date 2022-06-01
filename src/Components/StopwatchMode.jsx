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

export const StopwatchMode = ({ isActive, onSelect, setConfig }) => {
  const name = STUDY_MODE.STOPWATCH;

  // Contexts
  const progressContext = useContext(ProgressbarContext);
  const { setScheduler } = useContext(SchedulerContext);

  // Timer Configuration
  const [minDuration, setMinDuration] = useLocalStorageState(
    "STOPWATCH_MIN_DURATION",
    DURATION[30]
  );
  const [longBreakReq, setLongBreakReq] = useLocalStorageState(
    "STOPWATCH_NUM_FULL_SESSION",
    2
  );
  const [stopwatchDailyTarget, setStopwatchDailyTarget] = useLocalStorageState(
    "STOPWATCH_DAILY_TARGET",
    4
  );

  // Current session trackers
  // only to rerender, not useful
  const [numSession, setNumSession] = useState(0);
  // Scheduler object = {label, currentTimer, next, config}
  const scheduler = (() => {
    const currentTimer = {
      type: TIMER_TYPE.STOPWATCH,
      label: SESSION_LABEL.STUDY,
      duration: minDuration,
    };

    // next -- updates mode and numStudyComplete
    function next() {
      setNumSession((prev) => prev + 1);
    }

    // config
    const config = (close) => (
      <div className={styles.modal}>
        <h1 className={styles.header}> Stopwatch config </h1>

        <input type="number" autoFocus style={{ display: "none" }}></input>
        <Setting
          title="Minimum duration"
          description="Minimum amount of time before you are allowed to take a break"
          actionArea={
            <CustomizableButtonOptionList
              options={[
                { label: "30", value: DURATION[30] },
                { label: "60", value: DURATION[60] },
                { label: "90", value: DURATION[90] },
              ]}
              currentValue={minDuration}
              setValue={setMinDuration}
              toValue={(label) => parseInt(label) * 1000 * 60}
            ></CustomizableButtonOptionList>
          }
        ></Setting>

        <Setting
          title="Full session length"
          description="Target number of sessions to complete in one sitting"
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
          description="Target number of sessions to complete during the day"
          actionArea={
            <InputOption
              currentValue={stopwatchDailyTarget}
              setValue={(value) => {
                setStopwatchDailyTarget(parseInt(value));
                progressContext.setDailyTarget(parseInt(value));
              }}
              placeholder={stopwatchDailyTarget}
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
    progressContext.setDailyTarget(stopwatchDailyTarget);
    progressContext.setSessionLength(longBreakReq);
  };

  // First mount
  useEffect(() => {
    if (isActive) {
      console.log("FIRST STOPWATCH RENDER");
      progressContext.setDailyTarget(stopwatchDailyTarget);
      progressContext.setSessionLength(longBreakReq);

      // setSchedule
      setScheduler(scheduler.label, scheduler.currentTimer, scheduler.next);

      setConfig(() => scheduler.config);
    }
  }, []);

  // Rerenders -- listen to isActive, config states, and session trackers
  useEffect(() => {
    if (isActive) {
      console.log("STOPWATCH RERENDER");

      // setSchedule
      setScheduler(scheduler.label, scheduler.currentTimer, scheduler.next);
      setConfig(() => scheduler.config);
    }
  }, [
    progressContext,
    longBreakReq,
    isActive,
    stopwatchDailyTarget,
    minDuration,
    longBreakReq,
  ]);

  return (
    <span
      className={styles.mode + " " + (isActive ? styles.active : "")}
      onClick={handleClick}
    >
      {name}
    </span>
  );
};
