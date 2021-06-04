import React from "react";
import { Image} from "react-bootstrap";
import image from "../images/homeimage.png";

function Home() {
  return (
    <div>
      <h1 class="home">Haul-That</h1>
      <h2 class="subtitle">-a pickup/delivery service for larger items-</h2>
    <div className="logo">
      <Image src={image}
        height="320px"
        width="360px"
        
        roundedCircle
      />
      </div>
      <div class="logsign">
        <h2 class="names">-created by: alex, william, wheeler, dustin and hadeed-</h2>
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
