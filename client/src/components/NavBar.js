import React from "react";
import { Navbar, Nav, Container , Badge } from "react-bootstrap";
import Auth from "../utils/auth";

const NavBar = () => {



  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  
  return (
    <Navbar collapseOnSelect fixed="top" expand="sm" bg="danger" variant="dark">
      <h1 className="title">HaulThat</h1>
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
            {Auth.loggedIn() ? (
              <React.Fragment>
                <Nav.Link className="nav1" href="/">Home</Nav.Link>
                <Nav.Link className="nav1" href="/bookingA">Booking</Nav.Link>
                <Nav.Link className="nav1" href="/jobs">Jobs</Nav.Link>
                <Badge pill variant="secondary"></Badge>{' '}
                <Nav.Link className="nav1" href="/profile">My Profile</Nav.Link>
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