import { Link } from "react-router-dom";
import TimerIcon from "./../Assets/NavbarIcons/TimerIcon";
import ChartIcon from "./../Assets/NavbarIcons/ChartIcon";
import ShareIcon from "./../Assets/NavbarIcons/ShareIcon";
import SettingsIcon from "./../Assets/NavbarIcons/SettingsIcon";
import QuickTimerConfig from "./QuickTimerConfig/QuickTimerConfig";
import GithubIcon from "./../Assets/FooterIcons/GithubIcon";
import ThemeIcon from "./../Assets/FooterIcons/ThemeIcon";
import InfoIcon from "./../Assets/FooterIcons/InfoIcon";

// isFocused =/= "is timer running"
// isfocused = "is the layout in focus or not"
export default function PageLayout({
  isFocused = true,
  headerActionArea = (
    <QuickTimerConfig isVisible={isFocused}></QuickTimerConfig>
  ),
  mainProps = {},
  children,
}) {
  return (
    <>
      <header>
        <Logo isFocused={isFocused} />

        {/* Navbar */}
        <nav className={isFocused ? "visible" : "hidden"}>
          <ul>
            <li>
              <Link to="/">
                <TimerIcon className={"icon"} />
              </Link>
            </li>

            <li>
              <Link to="/oops">
                <ChartIcon className={"icon"} />
              </Link>
            </li>

            <li>
              <Link to="/oops">
                <ShareIcon className={"icon"} />
              </Link>
            </li>

            <li>
              <Link to="/oops">
                <SettingsIcon className={"icon"} />
              </Link>
            </li>
          </ul>
        </nav>

        <div
          id="headerActionAreaWrapper"
          className={isFocused ? "visible" : "hidden"}
        >
          {typeof headerActionArea == "function"
            ? headerActionArea()
            : headerActionArea}
        </div>
      </header>

      <main {...mainProps}>{children}</main>

      <Footer isVisible={isFocused} />
    </>
  );
}

function Logo({ isFocused }) {
  return (
    <Link to="/">
      <div id="logo" className={isFocused ? "focusLogo" : ""}>
        deepflow
      </div>
    </Link>
  );
}

function Footer({ isVisible }) {
  return (
    <footer
      className={isVisible ? "hidden" : "hidden" /**Change back to visible */}
    >
      {/* <a href="/">
        <GithubIcon className={"icon"} />
      </a>
      <a href="/">
        <ThemeIcon className={"icon"} />
      </a>
      <a href="/">
        <InfoIcon className={"icon"} />
      </a> */}
      Work in progress
    </footer>
  );
}
