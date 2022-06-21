import "./App.css";
import TimerPage from "./Pages/TimerPage";
import NotReadyPage from "./Pages/NotReadyPage";
import TimerStateProvider from "./Contexts/TimerStateContext";
import SessionsProvider from "./Contexts/SessionsContext";
import ProgressbarProvider from "./Contexts/ProgressbarContext";
import SchedulerProvider from "./Contexts/SchedulerContext";
import { Route, Routes } from "react-router-dom";

//🤔 multiContexts?

function App() {
  return (
    <ProgressbarProvider>
      <TimerStateProvider>
        <SchedulerProvider>
          <SessionsProvider>
            <Routes>
              <Route path="/" element={<TimerPage />} />
              <Route path="/oops" element={<NotReadyPage />} />
            </Routes>
          </SessionsProvider>
        </SchedulerProvider>
      </TimerStateProvider>
    </ProgressbarProvider>
  );
}

export default App;
