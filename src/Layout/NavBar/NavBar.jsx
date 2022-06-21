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
import { Link } from "react-router-dom";

function NavBar({ isActive = true, actionArea = <></> }) {
  return (
    <div id={styles.NavBar}>
      <Logo className={isActive && styles.focusedLogo} />
      <Menu className={isActive ? "hidden" : "visible"} />
      {/* if actionArea is a function, call it. If its html, display it */}
      {typeof actionArea == "function" ? actionArea() : actionArea}
    </div>
  );
}

function Logo({ className }) {
  return (
    <Link to="/">
      <div className={styles.logo + " " + className}>deepflow</div>
    </Link>
  );
}

function Menu({ className }) {
  return (
    <div id={styles.menu} className={className}>
      <Link to="/">
        <TimerIcon className={"icon"} />
      </Link>
      <Link to="/oops">
        <ChartIcon className={"icon"} />
      </Link>
      <Link to="/oops">
        <ShareIcon className={"icon"} />
      </Link>
      <Link to="/oops">
        <SettingsIcon className={"icon"} />
      </Link>
    </div>
  );
}

export default NavBar;
