import styles from "./CircularProgress.modules.css";

function CircularProgress({
  filledPercent,
  animationDuration = "1s",
  animationTimingFunction = "linear",
  clockwise = false,
  thickness = 0.1,
  primaryColor = "var(--primary-color)",
}) {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill={"var(--secondary-color"} />
        <circle
          cx="50"
          cy="50"
          r="25"
          fillOpacity={0}
          stroke={primaryColor}
          strokeWidth="50"
          strokeDasharray={`${filledPercent * 157.08} 157.08`}
          style={{
            transition: `${animationDuration} ${animationTimingFunction}`,
          }}
          transform="rotate(-90) translate(-100)"
        />
        <circle
          cx="50"
          cy="50"
          r={50 - 50 * thickness}
          fill="var(--bg-color)"
        />
      </svg>
    </>
  );
}

export default CircularProgress;
