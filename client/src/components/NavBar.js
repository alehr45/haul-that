import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import Auth from "../utils/auth";

const NavBar = () => {

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  
  return (
    <Navbar collapseOnSelect fixed="top" expand="sm" bg="danger" variant="dark">
      <a href="/" className="title">HaulThat</a>
      <Container >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
            {Auth.loggedIn() ? (
              <React.Fragment className="nav1">
                <Nav.Link  href="/">Home</Nav.Link>
                <Nav.Link  href="/bookingA">Booking</Nav.Link>
                <Nav.Link  href="/jobs">Jobs</Nav.Link>
                <Nav.Link  href="/profile">My Profile</Nav.Link>
                <Nav.Link onClick={logout}>
                  Logout
                </Nav.Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Nav.Link href="/login">
                  Login
                </Nav.Link>
                <Nav.Link href="/signup">
                  Sign Up
                </Nav.Link>
              </React.Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
        <div></div>
      </Container>
    </Navbar>
  );
};

export default NavBar;
