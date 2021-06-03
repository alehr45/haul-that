import React from "react";
import { Link } from "react-router-dom";
import { Image, Button, Col } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import image from "../images/homeimage.png";

function Home() {
  return (
    <div>
      <h1 class="home">Haul-That</h1>
      <h2 class="subtitle">-a pickup/delivery service for larger items-</h2>
    <div className="logo">
      <Image src={image}
        height="320px"
        width="340px"
        
        roundedCircle
      />
      </div>
      <div class="logsign">
        <Button className="font1" href="/login" variant="danger">
          login
        </Button>{" "}
        <Button className="font1" href="/signup" variant="danger">
          sign-up
        </Button>{" "}
      </div>
    </div>
  );
}

export default Home;
