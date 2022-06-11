import Progress from "../../Components/ProgressBar/ProgressBar";
import { useContext, useRef, useState } from "react";
import { SchedulerContext } from "./../../Contexts/SchedulerContext";
import CountdownTimer, {
  CircularCountdownView,
} from "./../../Components/CircularTimer/CountdownTimer";
import { TimerStateContext } from "../../Contexts/TimerStateContext";
import { SessionsContext } from "../../Contexts/SessionsContext";
import StopwatchTimer, {
  CircularStopwatchView,
} from "./../../Components/CircularTimer/StopwatchTimer";

function TimerPage() {
  return (
    <div
      className="flex justify-center items-center flex-col mt-16"
      style={{ gridArea: "main" }}
    >
      <Timer />
      <Progress />
    </div>
  );
}

function Timer() {
  const { currentTimer, next } = useContext(SchedulerContext).scheduler;
  const { setIsRunning, setIsStarted } = useContext(TimerStateContext);
  const { sessions, setSessions } = useContext(SessionsContext);

  // refactor this out later
  const [popupOpen, setPopupOpen] = useState(false);
  const closePopup = () => setPopupOpen(false);

  // onFirstStart, onStart, onTick, onFinish, onFinishEarly, onReset, onStop
  const callbacks = {
    onFirstStart: (time) => {
      setIsRunning(true);
      setIsStarted(true);
    },
    onStart: (time, elapsedTime, startTime) => {
      setIsRunning(true);
    },
    onTick: (time, elapsedTime, startTime) => {
      console.log("Tick!");
    },
    onFinish: (time, elapsedTime, startTime) => {
      // call modal
      setPopupOpen(true);
      // on modal submit, execute this
      let prevSessions = [...sessions];
      prevSessions.push({
        startTime: startTime,
        endTime: time,
        elapsedTime: elapsedTime,
        mode: currentTimer.label,
      });
      setSessions(prevSessions);
      setIsRunning(false);
      setIsStarted(false);
      next();
    },
    onQuit: (time, elapsedTime, startTime) => {
      // call modal

      // on modal submit, execute this

      setIsRunning(false);
      setIsStarted(false);
      next();
    },
    onReset: (time, elapsedTime, startTime) => {
      console.log("Reset!");
      setIsRunning(false);
      setIsStarted(false);
    },
    onStop: (time, elapsedTime, startTime) => {
      console.log("Stopped!");
      setIsRunning(false);
    },
  };

  const countdownEvents = [
    {
      // TODO: fix currentTimer being null initially
      time: currentTimer ? currentTimer.duration : 10000,
      callback: (time, elapsedTime, startTime) => {
        console.log("event callback!");
        /* if sound is enabled, play sound effect */
        /* if overtime is not enabled, call finish callback here */
      },
    },
  ];

  const stopwatchEvents = [
    {
      time: currentTimer ? currentTimer.duration : 10000,
      callback: () => {
        /* if sound is enabled, play sound effect */
      },
    },
  ];

  const timerByTypes = {
    countdown: (timer) => (
      <CountdownTimer
        duration={timer.duration === 1000 * 60 ? 2000 : timer.duration}
        callbacks={callbacks}
        overtime={false}
        events={countdownEvents}
        viewConstructor={(props) => (
          <CircularCountdownView
            {...props}
            label={timer.label}
          ></CircularCountdownView>
        )}
      />
    ),
    stopwatch: (timer) => (
      <StopwatchTimer
        minimumDuration={timer.duration === 1000 * 60 ? 5000 : timer.duration}
        callbacks={callbacks}
        overtime={false}
        events={countdownEvents}
        viewConstructor={(props) => (
          <CircularStopwatchView
            {...props}
            label={timer.label}
          ></CircularStopwatchView>
        )}
      />
    ),
  };

  return currentTimer ? (
    timerByTypes[`${currentTimer.type}`](currentTimer)
  ) : (
    <div>error, please choose a timer mode</div>
  );
}

export default TimerPage;
