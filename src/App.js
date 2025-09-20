// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home";
import Search from "./pages/search";

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className={`navbar navbar-expand-lg ${isHome ? "navbar-transparent" : "navbar-dark bg-dark"}`}>
      <div className="container">
        <Link className="navbar-brand text-light fw-bold" to="/">
          📚 MyShelf
        </Link>
        <div>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/search">
                Search
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
