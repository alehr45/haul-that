import React from "react";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
<<<<<<< HEAD
import Auth from "../utils/auth";
=======
>>>>>>> b1241488fde9263e1f137004e81278f23aa2119c
import { GET_JOBS } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import Auth from "../utils/auth";

const NavBar = () => {
  const { loading, data: jobsData } = useQuery(GET_JOBS);
<<<<<<< HEAD
=======

>>>>>>> b1241488fde9263e1f137004e81278f23aa2119c
  var jobs = [];
  var nonTakenJobs = [];
  if (!loading) {
    jobs = jobsData.jobs;
<<<<<<< HEAD
=======

>>>>>>> b1241488fde9263e1f137004e81278f23aa2119c
    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i].taken === false) {
        nonTakenJobs.push(i);
      }
    }
  }

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
<<<<<<< HEAD
                
                <Nav.Link className="nav1" href="/">Home</Nav.Link>
                <Nav.Link className="nav1" href="/bookingA">Booking</Nav.Link>
                <Nav.Link className="nav1" href="/jobs">Jobs</Nav.Link>
                <div>
                <Badge style={{paddingLeft: '0px'}} className="badge" pill variant="primary">{nonTakenJobs.length}</Badge>
                </div>
                <Nav.Link className="nav1" href="/profile">My Profile</Nav.Link>
                <Nav.Link onClick={logout}>
                  Logout
                </Nav.Link>
              
=======
                <Nav.Link className="nav1" href="/">
                  Home
                </Nav.Link>
                <Nav.Link className="nav1" href="/bookingA">
                  Booking
                </Nav.Link>
                <Nav.Link className="nav1" href="/jobs">
                  Jobs
                </Nav.Link>
                <div>
                  <Badge
                    style={{ paddingLeft: "0px" }}
                    className="badge"
                    pill
                    variant="primary"
                  >
                    {nonTakenJobs.length}
                  </Badge>
                </div>
                <Nav.Link className="nav1" href="/profile">
                  My Profile
                </Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
>>>>>>> b1241488fde9263e1f137004e81278f23aa2119c
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
