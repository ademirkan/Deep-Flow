import Progress from "../../Components/ProgressBar/ProgressBar";
import { useContext } from "react";
import { SchedulerContext } from "./../../Contexts/SchedulerContext";

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
  const currentTimer = useContext(SchedulerContext).currentTimer;

  const timerByTypes = {
    countdown: (timer) => (
      <CountdownTimer label={timer.label} initialDuration={timer.duration} />
    ),
    stopwatch: (timer) => <StopwatchTimer label={timer.label} />,
  };
  return timerByTypes[`${currentTimer.type}`](currentTimer);
}

export default TimerPage;
