import "./App.css";
import Footer from "./Components/Layout/Footer/Footer";
import MainContent from "./Components/Layout/MainContent/MainContent";
import NavBar from "./Components/Layout/NavBar/NavBar";

function App() {
  return (
    <div id="display">
      <NavBar />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
