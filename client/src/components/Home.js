import React from "react";
import { Image} from "react-bootstrap";
import image from "../images/homeimage.png";

function Home() {
  return (
    <div>
      <h1 className="home">Haul-That</h1>
      <h2 className="subtitle">-a pickup/delivery service for larger items-</h2>
    <div className="logo">
      <Image src={image}
        height="320px"
        width="360px"
        
        roundedCircle
      />
      </div>
      <div className="logsign">
        <h2 className="names">-created by: alex, william, wheeler and dustin-</h2>
        {/* <Button className="font1" href="/login" variant="danger">
          login
        </Button>{" "}
        <Button className="font1" href="/signup" variant="danger">
          sign-up
        </Button>{" "} */}
      </div>
    </div>
  );
}

export default Home;
