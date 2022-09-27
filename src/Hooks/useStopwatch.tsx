import { useRef, useEffect, useState } from "react";
import { TimerEvent } from "../Typescript/Types/TimerEvent";
import { ITimerCallbacks } from "./../Typescript/Interfaces/ITimerCallbacks";

function useStopwatch(callbacks: ITimerCallbacks, tickInterval: number = 1000) {
  // States
  const [time, setTime] = useState(new Date(0));
  const [isRunning, setIsRunning] = useState(false);
  const [isStarted, setIsStarted] = useState(false); // true if timer has started, false when reset

  //Refs
  const lastUpdateRef = useRef(new Date(0));
  const callbacksRef = useRef(callbacks);
  const startTimeRef = useRef(new Date(0));
  const eventsRef = useRef<Array<TimerEvent>>(
    callbacks.onTickEvents === undefined ? [] : [...callbacks.onTickEvents]
  );

  // Toggle the timer on and off when isRunning is changed -- change later, causes rerender
  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(tick, tickInterval);
    }

    // is called next time isRunning changes
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  // update callbacks when changed
  useEffect(() => {
    callbacksRef.current = callbacks;

    // sort events array by time
    let descendingEvents = (
      callbacks.onTickEvents === undefined ? [] : [...callbacks.onTickEvents]
    ).sort((a, b) => b.time.valueOf() - a.time.valueOf());

    // discard all events that have already occured
    while (
      descendingEvents.length !== 0 &&
      descendingEvents[descendingEvents.length - 1].time.valueOf() <
        time.valueOf()
    ) {
      descendingEvents.pop();
    }

    // set eventsRef to new events
    eventsRef.current = descendingEvents;
  }, [callbacks]);

  // Calculates how much time (ms) has passed since delta() was last called
  function delta() {
    if (lastUpdateRef.current.valueOf() === 0) {
      lastUpdateRef.current = new Date();
      return new Date(0);
    }
    const now = new Date();
    const deltaMs = new Date(now.valueOf() - lastUpdateRef.current.valueOf());
    lastUpdateRef.current = now;
    return deltaMs;
  }

  // Runs at every interval, updates time
  function tick() {
    let deltaMs = delta();
    let nextTime;
    setTime((prevTime) => {
      nextTime = new Date(prevTime.valueOf() + deltaMs.valueOf());
      return nextTime;
    });

    if (callbacksRef.current.onTick !== undefined) {
      callbacksRef.current.onTick(time, new Date(), startTimeRef.current);
    }

    if (
      eventsRef.current.length &&
      eventsRef.current[eventsRef.current.length - 1].time <= nextTime
    ) {
      eventsRef.current.pop().callback(time, new Date(), startTimeRef.current);
    }
  }

  /** Public Functions */
  function start() {
    if (isRunning) throw Error("Stopwatch is already running");

    if (!isStarted) {
      callbacksRef.current.onStart(time, new Date(), startTimeRef.current);
      setIsStarted(true);
    } else {
      callbacksRef.current.onResume(time, new Date(), startTimeRef.current);
    }

    if (!startTimeRef.current) {
      startTimeRef.current = Date.now();
    }

    setIsRunning(true);
    lastUpdateRef.current = new Date();
  }

  function stop() {
    setIsRunning(false);
    callbacksRef.current.onPause(time, new Date(), startTimeRef.current);
  }

  function reset() {
    callbacksRef.current.onReset(time, new Date(), startTimeRef.current);
    eventsRef.current = (
      callbacks.onTickEvents === undefined ? [] : [...callbacks.onTickEvents]
    ).sort((a, b) => b.time.valueOf() - a.time.valueOf());
    setIsStarted(false);
    setIsRunning(false);
    setTime(new Date(0));
  }

  function finish() {
    setTime(new Date(0));
    setIsStarted(false);
    setIsRunning(false);
    callbacksRef.current.onEnd(time, new Date(), startTimeRef.current);
  }

  return { time, isRunning, isStarted, start, stop, reset, finish };
}

export default useStopwatch;
