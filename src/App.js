import "./App.css";
import Footer from "./Components/Layout/Footer/Footer";
import MainContent from "./Components/Layout/MainContent/MainContent";
import NavBar from "./Components/Layout/NavBar/NavBar";
import TimerConfigContextProvider from "./Contexts/TimerConfigContext";
import TimerStateProvider from "./Contexts/TimerStateContext";
function App() {
  return (
    <TimerStateProvider>
      <TimerConfigContextProvider>
        <div id="display">
          <NavBar />
          <MainContent />
          <Footer />
        </div>
      </TimerConfigContextProvider>
    </TimerStateProvider>
  );
}

export default App;
