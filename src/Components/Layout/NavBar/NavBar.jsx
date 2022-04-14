import styles from "./NavBar.module.css";
import {
  ChartIcon,
  TimerIcon,
  ShareIcon,
  SettingsIcon,
} from "../../../Assets/NavbarIcons";

// App.css --> BEM
// JEST/Mocha = test
// index.jsx for each component to avoid import shenanigans
// CSS Modules, Emotion, SCSS, Styled Components
// TS = Type Safety

//

function NavBar() {
  return (
    <div id={styles.NavBar}>
      <Logo />
      <Menu />
      <Config />
    </div>
  );
}

function Logo() {
  return <div id={styles.logo}>deepflow</div>;
}

function Menu() {
  return (
    <div id={styles.menu}>
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

function Config() {
  return <div id={styles.config}>Config</div>;
}

export default NavBar;
