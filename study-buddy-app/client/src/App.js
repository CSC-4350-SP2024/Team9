import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login/Login.jsx";
import Signup from "./components/login/Signup.jsx";
import Navbar from "./components/Navbar.jsx";
import ChatPage from "./pages/chatPage.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard.jsx";
import PairingSuggestionPage from "./pages/pairingSuggestionPage.jsx";

import Home from "./pages/Home.jsx";
import { useState, useEffect } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    window.localStorage.setItem('isLoggedIn', true);  //store isLoggedIn in local storage so it is not affected by refreshes
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.localStorage.setItem('isLoggedIn', false);
  };

  useEffect(() => {
    setIsLoggedIn(JSON.parse(window.localStorage.getItem('isLoggedIn')));
  }, []);


  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
        <Route path="/chatPage/:chatID" element={<ChatPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/matches" element={<PairingSuggestionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
