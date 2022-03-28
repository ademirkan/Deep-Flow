import Top from "./components/top";
import Main from "./components/MainContent/main";
import Bottom from "./components/bottom";
import "./css/App.css";

function App() {
  return (
    <div id="display">
      <div id="banner" />
      <div id="main-layout">
        <Top />
        <Main />
        <Bottom />
      </div>
    </div>
  );
}

export default App;
