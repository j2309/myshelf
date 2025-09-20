// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="overlay">
        <div className="content text-center text-light">
          <h1 className="display-3 fw-bold">Welcome to MyShelf</h1>
          <p className="lead mt-3">
            Your books. Your space
          </p>
          <Link to="/search" className="btn btn-primary btn-lg mt-4">
            Start Exploring
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
