import useLocalStorageState from "./useLocalStorageState";
import { SESSION_MODE } from "./../Helpers/enum";
import { useLayoutEffect, useEffect } from "react";
import { useState, useContext } from "react";
import useSessionStorageState from "./useSessionStorageState";
import { ScheduleContext } from "../Contexts/ScheduleContext";

import Setting, {
  CustomizableButtonOptionList,
  InputOption,
} from "./../Components/Setting/Setting";

export function usePomdoroMode() {
  const label = "pomodoro";

  let { dailyTarget, setDailyTarget, fullSessionLength, setFullSessionLength } =
    useContext(ScheduleContext);

  const [studyDurationMs, setStudyDurationMs] = useLocalStorageState(
    "studyDuration",
    25 * 60 * 1000
  );
  const [shortBreakDurationMs, setShortBreakDurationMs] = useLocalStorageState(
    "shortBreakDuration",
    5 * 60 * 1000
  );
  const [longBreakDurationMs, setLongBreakDurationMs] = useLocalStorageState(
    "longBreakDuration",
    15 * 60 * 1000
  );
  const [longBreakReq, setLongBreakReq] = useLocalStorageState(
    "longBreakReq",
    4
  );

  // scheduler
  const [currentMode, setCurrentMode] = useState(SESSION_MODE.STUDY);
  const [duration, setDuration] = useState(studyDurationMs);
  const [numStudyComplete, setNumStudyComplete] = useSessionStorageState(
    "currentNumCompleted",
    0
  );

  useEffect(() => {
    setFullSessionLength(longBreakReq);
  }, []);

  useEffect(() => {
    switch (currentMode) {
      case SESSION_MODE.STUDY:
        setDuration(studyDurationMs);
        break;
      case SESSION_MODE.SHORT_BREAK:
        setDuration(shortBreakDurationMs);
        break;
      default:
        setDuration(longBreakDurationMs);
    }
  }, [
    currentMode,
    studyDurationMs,
    shortBreakDurationMs,
    longBreakDurationMs,
    setDuration,
  ]);

  function next() {
    let newNumComplete;
    let nextSessionMode;

    if (currentMode === SESSION_MODE.STUDY) {
      newNumComplete = numStudyComplete + 1;
      setNumStudyComplete(newNumComplete);
      nextSessionMode =
        newNumComplete % longBreakReq === 0
          ? SESSION_MODE.LONG_BREAK
          : SESSION_MODE.SHORT_BREAK;

      setCurrentMode(nextSessionMode);

      return nextSessionMode;
    }

    setCurrentMode(SESSION_MODE.STUDY);
    return SESSION_MODE.STUDY;
  }

  const scheduler = { duration, next, currentMode };

  const config = (close) => (
    <div className={"modal"}>
      <h1 className={"styles.header"}> Pomodoro configuration </h1>

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
              setFullSessionLength(parseInt(value));
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
  );

  return { label, scheduler, config };
}
