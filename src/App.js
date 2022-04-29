import "./App.css";
import Footer from "./Layout/Footer/Footer";
import TimerPage from "./Layout/TimerPage/TimerPage";
import NavBar from "./Layout/NavBar/NavBar";
import TimerConfigContextProvider from "./Contexts/TimerConfigContext";
import TimerStateProvider from "./Contexts/TimerStateContext";
import { useEffect } from "react";
import { isDateToday } from "./Helpers/checkDate";

function App() {
  // Delete sessions from previous days
  // hook to sync up state and local storage (useLocalStorageState)
  // imarative vs declarative
  // cleanup functin in useEffect?

  // problem -- progressBar depends on localStorage instead of a state
  // solution -- load from localStorage to state on first render, keep synced after that
  // everytime you currently update storage, replace with hook that updates state & storage

  // evrytime timer finished, progres bar should update
  const prevSessionsString = localStorage.getItem("sessions"); // get sessions data as JSON string
  if (prevSessionsString) {
    const prevSessions = JSON.parse(prevSessionsString);
    if (!isDateToday(prevSessions[0])) {
      localStorage.setItem("sessions", "[]");
    }
  }

  return (
    <TimerStateProvider>
      <TimerConfigContextProvider>
        <div id="display">
          <NavBar />
          <TimerPage />
          <Footer />
        </div>
      </TimerConfigContextProvider>
    </TimerStateProvider>
  );
}

export default App;
