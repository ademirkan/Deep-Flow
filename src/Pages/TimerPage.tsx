import Progress from "../Components/ProgressBar/ProgressBar";
import { useContext } from "react";
import { SchedulerContext } from "../Contexts/SchedulerContext";
import CountdownTimer from "../Components/Timer/CountdownTimer";
import CircularCountdownView from "../Components/TimerView/CircularCountdownView";
import { TimerStateContext } from "../Contexts/TimerStateContext";
import { SessionsContext } from "../Contexts/SessionsContext";
import StopwatchTimer from "../Components/Timer/StopwatchTimer";
import CircularStopwatchView from "../Components/TimerView/CircularStopwatchView";
import PageLayout from "../Layout/PageLayout";
import Config from "../Layout/NavBar/Config/Config";
import { ITimerCallbacks } from "../Typescript/Interfaces/ITimerCallbacks";
import React from "react";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { TimerEvent } from "../Typescript/Types/TimerEvent";
function TimerPage() {
  // isRunning, isStarted
  const { isRunning, isStarted } = useContext(TimerStateContext);

  return (
    <PageLayout
      isRunning={isRunning}
      actionArea={<Config isVisible={!isRunning} />}
    >
      <div
        className="flex justify-center items-center flex-col mt-16"
        style={{ gridArea: "main" }}
      >
        <Timer />
        <Progress />
      </div>
    </PageLayout>
  );
}

function Timer() {
  // STATE
  const { mode, currentTimer, next } = useContext(SchedulerContext).scheduler;
  const { setIsRunning, setIsStarted } = useContext(TimerStateContext);
  const { sessions, setSessions } = useContext(SessionsContext);
  //const thing = useMemo(()=>getThingFromExpensiveComputation(giantString), [giantString])
  const callbacks: ITimerCallbacks = {
    onStart: (time) => {
      setIsRunning(true);
      console.log("started");
    },
    onTick: (time, elapsedTime, startTime) => {
      console.log("Tick!");
    },
    onEnd: (time, elapsedTime, startTime) => {
      // call modal

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
    onReset: (time, elapsedTime, startTime) => {
      console.log("Reset!");
      setIsRunning(false);
      setIsStarted(false);
    },
    onPause: (time, elapsedTime, startTime) => {
      console.log("Stopped!");
      setIsRunning(false);
    },
    onResume: (time, elapsedTime, startTime) => {
      console.log("resumed");
      setIsRunning(true);
    },

    onTickEvents: [
      {
        time: new Date(10000),
        callback: (time) => {
          console.log("10sec mark! " + time);
        },
      },
      {
        time: new Date(4000),
        callback: (time) => {
          console.log("4sec mark! " + time);
        },
      },
      {
        time: new Date(3000),
        callback: (time) => {
          console.log("3sec mark! " + time);
        },
      },
      {
        time: new Date(9000),
        callback: (time) => {
          console.log("9sec mark! " + time);
        },
      },
    ],
  };

  const timerByTypes = {
    countdown: (timer) => (
      <CountdownTimer
        targetDuration={timer.duration === 1000 * 60 ? 5000 : timer.duration}
        callbacks={callbacks}
        overtime={false}
        viewConstructor={(props) => (
          <CircularCountdownView
            {...props}
            clockwise={true}
            label={timer.label}
          ></CircularCountdownView>
        )}
      />
    ),
    stopwatch: (timer) => (
      <StopwatchTimer
        targetDuration={timer.duration === 1000 * 60 ? 5000 : timer.duration}
        callbacks={callbacks}
        viewConstructor={(hookProps) => (
          <CircularStopwatchView
            {...hookProps}
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
