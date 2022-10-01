import { useState } from "react";
import { Scheduler } from "../Typescript/Types/Scheduler";
import { TimerSession } from "../Typescript/Types/TimerSession";

const useScheduler = (scheduler: Scheduler) => {
  const [currScheduler, setScheduler] = useState<Scheduler>(scheduler);
  const [currentSession, setCurrSession] = useState<TimerSession>(
    currScheduler.currentSession
  );
  const next = () => {
    currScheduler.next();
    setCurrSession(currScheduler.currentSession);
  };

  // return setScheduler, currentSession, next()
  return { currentSession, setScheduler, next };
};

export default useScheduler;
