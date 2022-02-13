import React from "react"
import { Image } from "react-bootstrap"
import image from "../images/homeimage.png"

function Home() {
  return (
    <div>
      <h1 className="home">-Haul-That-</h1>
      <h2 className="subtitle">Need a truck? Get help... Have a truck? Get paid...</h2>

      <div className="logo">
        <Image src={image} height="320px" width="360px" roundedCircle />
      </div>
      <div className="logsign">
        <h2 className="names">-created by: Alex Lehr, William Hunt and Alex Wheeler-</h2>
        {/* <Button className="font1" href="/login" variant="danger">
          login
        </Button>{" "}
        <Button className="font1" href="/signup" variant="danger">
          sign-up
        </Button>{" "} */}
      </div>
      <div>{/* <h1 className="footer"></h1> */}</div>
      <div className="d-flex flex-column">
        <footer className="footer">
          <div>
            <span>&copy; 2022 Haul-That, Rights Reserved</span>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home
