import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Matches from "./components/Matches";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Skills from "./components/Skills";
import Discover from "./components/Discover";
import UserProfilePage from "./components/UserProfilePage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Discover />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/user/:id" element={<UserProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
