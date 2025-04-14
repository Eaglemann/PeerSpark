import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Matches from "./components/Matches";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" />
        <Route path="/profile" element={<Profile />} />
        <Route path="/matches" element={<Matches />} />
      </Routes>
    </Router>
  );
};

export default App;
