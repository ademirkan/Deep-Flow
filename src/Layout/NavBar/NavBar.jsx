import styles from "./NavBar.module.css";
import Config from "./Config/Config";
import { TimerStateContext } from "../../Contexts/TimerStateContext";
import { useContext } from "react";
import {
  ChartIcon,
  TimerIcon,
  ShareIcon,
  SettingsIcon,
} from "../../Assets/NavbarIcons";

function NavBar() {
  const { isStarted, isRunning } = useContext(TimerStateContext);
  return (
    <div id={styles.NavBar}>
      <Logo className={isRunning ? styles.focused : styles.default} />
      <Menu className={isStarted ? "hidden" : "visible"} />
      <Config className={isStarted ? "hidden" : "visible"} />
    </div>
  );
}

function Logo({ className }) {
  return (
    <div
      id={styles.logo}
      className={className}
      onClick={() => {
        console.log("Logo clicked, clearing storage");
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload(false);
      }}
    >
      deepflow
    </div>
  );
}

function Menu({ className }) {
  return (
    <div id={styles.menu} className={className}>
      <a href="/">
        <TimerIcon className={styles.icon} />
      </a>
      <a href="/">
        <ChartIcon className={styles.icon} />
      </a>
      <a href="/">
        <ShareIcon className={styles.icon} />
      </a>
      <a href="/">
        <SettingsIcon className={styles.icon} />
      </a>
    </div>
  );
}

export default NavBar;
