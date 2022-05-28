import "./App.css";
import Footer from "./Layout/Footer/Footer";
import TimerPage from "./Pages/TimerPage/TimerPage";
import NavBar from "./Layout/NavBar/NavBar";
import TimerStateProvider from "./Contexts/TimerStateContext";
import SessionsProvider from "./Contexts/SessionsContext";
import ProgressbarProvider from "./Contexts/ProgressbarContext";
import SchedulerProvider from "./Contexts/SchedulerContext";

//🤔 multiContexts?

function App() {
  return (
    <ProgressbarProvider>
      <TimerStateProvider>
        <SchedulerProvider>
          <SessionsProvider>
            <div id="display">
              <NavBar />
              <TimerPage />
              <Footer />
            </div>
          </SessionsProvider>
        </SchedulerProvider>
      </TimerStateProvider>
    </ProgressbarProvider>
  );
}

export default App;
