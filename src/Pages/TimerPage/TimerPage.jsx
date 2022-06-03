import Progress from "../../Components/ProgressBar/ProgressBar";
import { useContext } from "react";
import { SchedulerContext } from "./../../Contexts/SchedulerContext";
import CountdownTimer from "./../../Components/CircularTimer/CountdownTimer";

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

  // called when timer reaches the duration
  const handleFinish = (start, end, time) => {
    // ... depends on config / settings. Overtime?

    // trigger modal

    // push to sessionContext

    next();
  };

  // called when timer is ended before it reaches the duration
  const handleAbort = (start, end, time) => {
    next();
  };

  const timerByTypes = {
    countdown: (timer) => (
      <CountdownTimer
        duration={timer.duration}
        label={timer.label}
        onFinish={handleFinish}
        overtime={false}
      />
    ),
    stopwatch: (timer) => (
      <CountdownTimer
        duration={timer.duration}
        label={timer.label}
        onFinish={handleFinish}
        overtime={false}
      />
    ),
  };

  return currentTimer ? (
    timerByTypes[`${currentTimer.type}`](currentTimer)
  ) : (
    <div>t</div>
  );
}

export default TimerPage;
