import "./App.css";
import Footer from "./Layout/Footer/Footer";
import TimerPage from "./Layout/TimerPage/TimerPage";
import NavBar from "./Layout/NavBar/NavBar";
import TimerConfigContextProvider from "./Contexts/TimerConfigContext";
import TimerStateProvider from "./Contexts/TimerStateContext";

import SessionsProvider from "./Contexts/SessionsContext";

function App() {
  // const prevSessionsString = localStorage.getItem("sessions"); // get sessions data as JSON string
  // if (prevSessionsString) {
  //   const prevSessions = JSON.parse(prevSessionsString);
  //   if (!isDateToday(prevSessions[0])) {
  //     localStorage.setItem("sessions", "[]");
  //   }
  // }

  return (
    <SessionsProvider>
      <TimerStateProvider>
        <TimerConfigContextProvider>
          <div id="display">
            <NavBar />
            <TimerPage />
            <Footer />
          </div>
        </TimerConfigContextProvider>
      </TimerStateProvider>
    </SessionsProvider>
  );
}

export default App;
