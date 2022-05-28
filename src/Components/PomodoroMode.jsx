import { useContext, useEffect, useState, useRef } from "react";
import { ProgressbarContext } from "./../Contexts/ProgressbarContext";
import useLocalStorageState from "./../Hooks/useLocalStorageState";
import { SESSION_MODE } from "./../Helpers/enum";
import useSessionStorageState from "./../Hooks/useSessionStorageState";
import { SchedulerContext } from "./../Contexts/SchedulerContext";

const PomodoroMode = ({ isActive }) => {
  const label = "pomodoro";

  // Config states
  const progressContext = useContext(ProgressbarContext);
  const { setScheduler } = useContext(SchedulerContext);
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

  // scheduler does not care how schedule is implemented, as long as setSchedule("pomodoro", currentTimer={type, label, duration}, next, config) are called
  const [mode, setMode] = useState(SESSION_MODE.STUDY);
  const [numStudyComplete, setNumStudyComplete] = useSessionStorageState(
    "currentNumCompleted",
    0
  );

  function createScheduler() {
    function getDuration(mode) {
      switch (mode) {
        case SESSION_MODE.STUDY:
          return studyDurationMs;
        case SESSION_MODE.SHORT_BREAK:
          return shortBreakDurationMs;
        default:
          return longBreakDurationMs;
      }
    }

    const currentTimer = {
      type: "countdown",
      label: mode,
      duration: getDuration(mode),
    };

    // next -- updates mode and numStudyComplete
    const next = () => {};

    // config
    const config = () => {};

    return { label, currentTimer, next, config };
  }

  // first mount -- check if this component is active. If it is, update progressbarcontext, setScheduler()
  useEffect(() => {
    if (isActive) {
      progressContext.setDailyTarget(pomodoroDailyTarget);
      progressContext.setSessionLength(longBreakReq);

      // setSchedule
      const scheduler = createScheduler;
      setScheduler(
        scheduler.label,
        scheduler.currentTimer,
        scheduler.next,
        scheduler.config
      );
    }
  }, []);

  // on rerenders...
  // if isActive changes, setScheduler() from scratch
  useEffect(() => {
    if (isActive) {
      progressContext.setDailyTarget(pomodoroDailyTarget);
      progressContext.setSessionLength(longBreakReq);

      // setSchedule
      const scheduler = createScheduler;
      setScheduler(
        scheduler.label,
        scheduler.currentTimer,
        scheduler.next,
        scheduler.config
      );
    }
  }, [isActive]);

  // if config changes, setScheduler from scratch
  useEffect(() => {
    if (isActive) {
      progressContext.setDailyTarget(pomodoroDailyTarget);
      progressContext.setSessionLength(longBreakReq);

      // setSchedule
      const scheduler = createScheduler;
      setScheduler(
        scheduler.label,
        scheduler.currentTimer,
        scheduler.next,
        scheduler.config
      );
    }
  }, [isActive]);

  // if pomodoro progress config states change, update progressbar context
  useEffect(() => {
    progressContext.setDailyTarget(pomodoroDailyTarget);
    progressContext.setSessionLength(longBreakReq);
  }, [pomodoroDailyTarget, longBreakReq]);
  // if next is called, update tracker states, setScheduler from scratch

  // what does next look like?
  // next = ()=> calculate what the next timer will look like based on current one finishing, setTimer to that

  // whenever any POMODORO config settings change
  // recompute setTimer(), next(), config
  // setScheduler

  useEffect(() => {
    // compute timer
    function getDuration(mode) {
      switch (mode) {
        case SESSION_MODE.STUDY:
          return studyDurationMs;
        case SESSION_MODE.SHORT_BREAK:
          return shortBreakDurationMs;
        default:
          return longBreakDurationMs;
      }
    }

    const currentTimer = {
      type: "countdown",
      label: mode,
      duration: getDuration(mode),
    };

    const config = (close) => {};

    // compute next()
    const next = () => {};

    // recompute config
    // setScheduler()
  }, [
    studyDurationMs,
    setStudyDurationMs,
    shortBreakDurationMs,
    setShortBreakDurationMs,
    longBreakDurationMs,
    setLongBreakDurationMs,
    longBreakReq,
    setLongBreakReq,
    pomodoroDailyTarget,
    setPomodoroDailyTarget,
  ]);

  // whenever next is called, ie timer changes
  // recompute next()
  // setScheduler
  useEffect(() => {}, [mode, setMode, numStudyComplete, setNumStudyComplete]);

  return <span>Pomodoro</span>;
};
