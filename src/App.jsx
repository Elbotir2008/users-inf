import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import YoutubeForm from "./components/YoutubeForm";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<YoutubeForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
