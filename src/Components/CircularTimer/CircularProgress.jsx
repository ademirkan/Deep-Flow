function CircularProgress({
  percentFilled,
  animationDuration = "1s",
  animationTimingFunction = "linear",
  thickness = 0.1,
}) {
  return (
    <>
      <svg
        className="circular-progress"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="50" fill={"var(--secondary-color"} />
        <circle
          cx="50"
          cy="50"
          r="25"
          fillOpacity={0}
          stroke="var(--primary-color)"
          strokeWidth="50"
          strokeDasharray={`${percentFilled * 157.08} 157.08`}
          style={{
            transition: `${animationDuration} ${animationTimingFunction}`,
          }}
          transform="rotate(-90) translate(-100)"
        />
        <circle cx="50" cy="50" r={50 - 50 * thickness} fill="#f5f5f5" />
      </svg>
    </>
  );
}

export default CircularProgress;
