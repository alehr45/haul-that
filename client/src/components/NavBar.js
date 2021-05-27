import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import Auth from "../utils/auth";

const NavBar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  console.log(Auth.loggedIn());
  return (
    <Navbar collapseOnSelect fixed="top" expand="sm" bg="danger" variant="dark">
      <h1 className="title">HaulThat</h1>
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/bookingA">Booking</Nav.Link>
            <Nav.Link href="/jobs">Jobs</Nav.Link>
            <Nav.Link className="login2"href="/login">Login</Nav.Link>
            <Nav.Link className="signup2" href="/signup">Signup</Nav.Link>
            
            {Auth.loggedIn() ? (
              <div>
                <Nav.Link className="login1" href="/profile" to="/profile">
                  My Profile
                </Nav.Link>
                <Nav.Link className="signup1" onClick={logout}>
                  Logout
                </Nav.Link>
              </div>
            ) : (
              <div>
                <Nav.Link className="login1" href="/login">
                  Login
                </Nav.Link>
                <Nav.Link className="signup1" href="/signup">
                  Sign Up
                </Nav.Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
        <div></div>
      </Container>
    </Navbar>
  );
};

export default NavBar;