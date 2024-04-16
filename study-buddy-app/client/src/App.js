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
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  //  const [chats, setChats] = useState([]);
  // // const messages = [{id: 1, senderUsername: 'bob', messageContent: 'hello', timestamp: '12:00'}]

  // const fetchInfo = async () => {
  //   return await fetch('/api/getChats')
  //     .then((res) => res.json())
  //     .then((d) => setChats(d))
  // };

  // useEffect(() => {
  //   fetchInfo();
  // }, [chats]);
  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
        {/* {chats.map((c) => ( */}
        <Route path="/chatPage/:chatID" element={<ChatPage />} />
        {/* ))} */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/matches" element={<PairingSuggestionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
