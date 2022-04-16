import { faBuildingShield } from "@fortawesome/free-solid-svg-icons";
import { useRef, useEffect, useState } from "react";

// imparative vs declarative

function useTimer(duration, options = {}) {
  // States
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  //Refs
  const lastUpdateRef = useRef(null);
  const callbacksRef = useRef({
    onStart: options.onStart,
    onFinish: options.onFinish,
    onTick: options.onTick,
    onStop: options.onStop,
    onReset: options.onReset,
  });

  // Constants
  const EVENTS = { start: 0, stop: 1, pause: 2, reset: 3, tick: 4 };

  // Options -- onStart, onTick, onStop, onFinish, onReset, tickInterval
  const { tickInterval = 1000 } = options;

  // Toggle the timer on and off when isRunning is changed
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(tick, tickInterval);
    }

    // is called next time isRunning changes
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  useEffect(() => {
    callbacksRef.current = {
      onStart: options.onStart,
      onFinish: options.onFinish,
      onTick: options.onTick,
      onStop: options.onStop,
      onReset: options.onReset,
    };
  }, [options.onStart, options.onEnd, options.onTick]);

  // Calculates how much time (ms) has passed since delta() was last called
  function delta() {
    if (lastUpdateRef.current === undefined) {
      lastUpdateRef.current = new Date();
    }
    const now = new Date();
    const deltaMs = now - lastUpdateRef.current;
    lastUpdateRef.current = now;
    return deltaMs;
  }

  // Runs at every interval, updates time
  function tick() {
    let deltaMs = delta();
    let nextTime;
    setTime((prevTime) => {
      nextTime = prevTime + deltaMs;
      return nextTime > duration ? duration : nextTime;
    });

    if (nextTime >= duration) {
      callbacksRef.current.onFinish();
      reset();
    } else {
      callbacksRef.current.onTick();
    }
  }

  /** Public Functions */

  function start() {
    if (duration.current < 1000)
      throw new Error(
        "Cannot start a countdown with duration less than 1000ms."
      );
    if (isRunning) throw Error("Stopwatch is already running");
    callbacksRef.current.onStart();

    setIsRunning(true);
    lastUpdateRef.current = new Date();
  }

  function stop() {
    setIsRunning(false);
    callbacksRef.current.onStop();
  }

  function reset() {
    callbacksRef.current.onReset();
    setIsRunning(false);
    setTime(0);
  }

  return { time, isRunning, start, stop, reset };
}

export default useTimer;
