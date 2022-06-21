import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";

export default function PageLayout(props) {
  return (
    <div id="display">
      <NavBar isActive={props.isRunning} actionArea={props.actionArea} />
      {props.children}
      <Footer />
    </div>
  );
}
