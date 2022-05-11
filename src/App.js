import "./App.css";
import Footer from "./Layout/Footer/Footer";
import TimerPage from "./Pages/TimerPage/TimerPage";
import NavBar from "./Layout/NavBar/NavBar";
import TimerConfigProvider from "./Contexts/TimerConfigContext";
import TimerStateProvider from "./Contexts/TimerStateContext";

import SessionsProvider from "./Contexts/SessionsContext";
import DailyTargetProvider from "./Contexts/DailyTargetContext";

function App() {
  // const prevSessionsString = localStorage.getItem("sessions"); // get sessions data as JSON string
  // if (prevSessionsString) {
  //   const prevSessions = JSON.parse(prevSessionsString);
  //   if (!isDateToday(prevSessions[0])) {
  //     localStorage.setItem("sessions", "[]");
  //   }
  // }

  return (
    <TimerStateProvider>
      <TimerConfigProvider>
        <SessionsProvider>
          <DailyTargetProvider>
            <div id="display">
              <NavBar />
              <TimerPage />
              <Footer />
            </div>
          </DailyTargetProvider>
        </SessionsProvider>
      </TimerConfigProvider>
    </TimerStateProvider>
  );
}

export default App;
