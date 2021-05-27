import React from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import image from "../images/background.png"

function Home() {

  return (
    <Router>
      <header className="bg-secondary mb-4 py-2 flex-row align-center">
        <div className="container flex-row justify-space-between-lg justify-center align-center">
          <Link to="/">
            <h1>Haul That</h1>
          </Link>
        </div>
        <Image className="image1" src={ image } fluid />
      </header>
    </Router>
  );
};

export default Home;