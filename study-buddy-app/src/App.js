import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Navbar from "./components/Navbar.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
