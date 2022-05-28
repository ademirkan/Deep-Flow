import { SESSION_MODE } from "../../Helpers/enum";
import { useContext, useEffect } from "react";
import { SessionsContext } from "./../../Contexts/SessionsContext";
import { isDateToday } from "./../../Helpers/checkDate";
import Popup from "reactjs-popup";
import { ProgressbarContext } from "./../../Contexts/ProgressbarContext";

export default function Progress() {
  // const [sessions, setSessions] = useLocalStorageState("sessions", []);
  const { sessions, setSessions } = useContext(SessionsContext);
  const { dailyTarget, fullSessionLength } = useContext(ProgressbarContext);

  // clear session history at the start of a new day
  useEffect(() => {
    if (
      sessions.length !== 0 &&
      !isDateToday(new Date(sessions[0].startTime))
    ) {
      setSessions([]);
    }
  }, []);

  return (
    <div className="relative flex flex-col items-center w-72 mt-10">
      <ProgressBar
        target={dailyTarget}
        completed={sessions.reduce(
          (sum, session) =>
            session.mode === SESSION_MODE.STUDY ? sum + 1 : sum,
          0
        )}
        fullSessionLength={fullSessionLength}
      />
    </div>
  );
}

function ProgressBar({ target, completed, fullSessionLength }) {
  return (
    <div className="progress-bar flex flex-row w-full justify-center flex-wrap">
      {[...Array(Math.ceil(target / fullSessionLength))].map((_, i) => {
        let row = (
          <SessionRow
            key={i}
            numCircles={target > fullSessionLength ? fullSessionLength : target}
            numComplete={
              completed > fullSessionLength ? fullSessionLength : completed
            }
          />
        );
        target = target > fullSessionLength ? target - fullSessionLength : 0;
        completed =
          completed > fullSessionLength ? completed - fullSessionLength : 0;
        return row;
      })}
    </div>
  );
}

function SessionRow({ numCircles, numComplete }) {
  const circleStyle = "h-3 w-3 mx-0.5";
  return (
    <div className="flex flex-row mx-3 my-2">
      {[...Array(numComplete)].map((_, i) => {
        return (
          <svg
            key={i}
            className={circleStyle}
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
            className={circleStyle}
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
