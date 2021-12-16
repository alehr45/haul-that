import React, { useState } from "react";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import Auth from "../utils/auth";
import NavBadge from "./NavBadge";

const NavBar = () => {
<<<<<<< HEAD
  const { loading, data: jobsData } = useQuery(GET_JOBS);
  const nonTakenJobs =
    jobsData?.jobs.filter((job) => job.taken === false) || [];
=======
  const [jobsArr, setJobsArr] = useState(13);
>>>>>>> 116e57a45a372bd484d856432ad975c3653c3700

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Navbar
      className="nav9"
      collapseOnSelect
      fixed="top"
      expand="sm"
      bg="danger"
      variant="dark"
    >
      <h1 className="title">HaulThat</h1>
      <Container className="nav3">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {Auth.loggedIn() ? (
              <React.Fragment>
                <Nav.Link className="nav1" href="/home">
                  Home
                </Nav.Link>
                <Nav.Link className="nav1" href="/booking">
                  Booking
                </Nav.Link>
                <Nav.Link className="nav1" href="/jobs">
                  Jobs
                </Nav.Link>
                <NavBadge setJobsArr={setJobsArr} jobsArr={jobsArr} />
                <Nav.Link className="nav1" href="/profile">
                  My Profile
                </Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Sign Up</Nav.Link>
              </React.Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
