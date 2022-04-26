import "./App.css";
import Footer from "./Layout/Footer/Footer";
import MainContent from "./Layout/MainContent/MainContent";
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
          <MainContent />
          <Footer />
        </div>
      </TimerConfigContextProvider>
    </TimerStateProvider>
  );
}

export default App;
