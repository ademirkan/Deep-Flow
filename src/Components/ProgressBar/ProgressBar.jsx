import { SESSION_MODE } from "../../Helpers/enum";
import { useContext, useEffect } from "react";
import { TimerConfigContext } from "./../../Contexts/TimerConfigContext";
import { SessionsContext } from "./../../Contexts/SessionsContext";
import { isDateToday } from "./../../Helpers/checkDate";

export default function Progress() {
  // const [sessions, setSessions] = useLocalStorageState("sessions", []);
  const { sessions, setSessions } = useContext(SessionsContext);
  const { longBreakReq } = useContext(TimerConfigContext);

  // clear session history at the start of a new day
  useEffect(() => {
    if (
      sessions.length !== 0 &&
      !isDateToday(new Date(sessions[0].studyTime))
    ) {
      console.log(
        "Is from today: " + isDateToday(new Date(sessions[0].studyTime))
      );
      console.log("RESETING");
      console.log(sessions[0]);
      console.log(new Date(sessions[0].endTime));
      setSessions([]);
    }
  }, []);

  return (
    <div className="progress-container w-72 mt-10">
      <ProgressBar
        target={8}
        completed={sessions.reduce(
          (sum, session) =>
            session.mode === SESSION_MODE.STUDY ? sum + 1 : sum,
          0
        )}
        longReq={longBreakReq}
      />
    </div>
  );
}

function ProgressBar({ target, completed, longReq }) {
  return (
    <div className="progress-bar flex flex-row w-full justify-center flex-wrap">
      {[...Array(Math.ceil(target / longReq))].map((_, i) => {
        let row = (
          <SessionRow
            key={i}
            numCircles={target > longReq ? longReq : target}
            numComplete={completed > longReq ? longReq : completed}
          />
        );
        target = target > longReq ? target - longReq : 0;
        completed = completed > longReq ? completed - longReq : 0;
        return row;
      })}
    </div>
  );
}

function SessionRow({ numCircles, numComplete }) {
  return (
    <div className="flex flex-row mx-3 my-2">
      {[...Array(numComplete)].map((_, i) => {
        return (
          <svg
            key={i}
            className="tracker-circle"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="50" fill={"var(--primary-color"} />
          </svg>
        );
      })}
      {[...Array(numCircles - numComplete)].map((_, i) => {
        return (
          <svg
            key={i}
            className="tracker-circle"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="50" fill={"var(--secondary-color"} />
          </svg>
        );
      })}
    </div>
  );
}
