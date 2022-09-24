import styles from "./CircularTimer.module.css";

export default function ControlBar({ isRunning, children }) {
  return (
    <div id={styles.controlBar} className="flex justify-around h-16 ">
      {children}
    </div>
  );
}

export function ControlButton({ icon, name, onClick }) {
  return (
    <div className="control-button" onClick={onClick}>
      {icon}
    </div>
  );
}
