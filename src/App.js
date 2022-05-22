import "./App.css";
import Footer from "./Layout/Footer/Footer";
import TimerPage from "./Pages/TimerPage/TimerPage";
import NavBar from "./Layout/NavBar/NavBar";
import TimerStateProvider from "./Contexts/TimerStateContext";
import SessionsProvider from "./Contexts/SessionsContext";
import SchedulePovider from "./Contexts/ScheduleContext";
import TimerModeProvider from "./Contexts/TimerModeContext";

//🤔 multiContexts?

function App() {
  return (
    <SchedulePovider>
      <TimerStateProvider>
        <TimerModeProvider>
          <SessionsProvider>
            <div id="display">
              <NavBar />
              <TimerPage />
              <Footer />
            </div>
          </SessionsProvider>
        </TimerModeProvider>
      </TimerStateProvider>
    </SchedulePovider>
  );
}

export default App;
