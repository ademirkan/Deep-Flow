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

  const timerByTypes = {
    countdown: (timer) => (
      <CountdownTimer
        duration={timer.duration}
        label={timer.label}
        onFinish={next}
      />
    ),
    stopwatch: (timer) => (
      <CountdownTimer
        duration={timer.duration}
        label={timer.label}
        onFinish={next}
      />
    ),
  };

  console.log("rendering timer!");
  console.log(currentTimer);
  return currentTimer ? (
    timerByTypes[`${currentTimer.type}`](currentTimer)
  ) : (
    <div>t</div>
  );
}

export default TimerPage;
