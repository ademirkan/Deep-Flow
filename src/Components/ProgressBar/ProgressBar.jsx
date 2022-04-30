export default function ProgressBar({ target, completed, longReq }) {
  return (
    <div className="progress-bar flex flex-row w-full justify-center flex-wrap">
      {[...Array(Math.ceil(target / longReq))].map(() => {
        let row = (
          <SessionRow
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
      {[...Array(numComplete)].map(() => {
        return (
          <svg
            className="tracker-circle"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="50" fill={"var(--primary-color"} />
          </svg>
        );
      })}
      {[...Array(numCircles - numComplete)].map(() => {
        return (
          <svg
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
