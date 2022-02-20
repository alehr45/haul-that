import React, { useState } from "react"
import { Navbar, Nav, Container } from "react-bootstrap"
import Auth from "../utils/auth"
import NavBadge from "./NavBadge"
import { QUERY_ME_BASIC } from "../utils/queries"
import { useQuery } from "@apollo/react-hooks"
import Alert from "../components/Alert"
import JobSwitchButton from "./JobSwitchButton"

const NavBar = () => {
  const [jobsArr, setJobsArr] = useState(13)
  const { data: meData } = useQuery(QUERY_ME_BASIC)
  const me = meData?.me || {}
  const logout = event => {
    event.preventDefault()
    Auth.logout()
  }
  const [showModal, setShowModal] = useState(false)

  const selectSomething = () => {
    setShowModal(true)
  }

  return (
    <Navbar className="nav9" collapseOnSelect fixed="top" expand="sm" bg="danger" variant="dark">
      <h1 className="title">HaulThat</h1>
      <Container className="nav3">
        <Alert showModal={showModal} setShowModal={setShowModal} />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {me.driver === true || me.customer === true ? (
            <Nav>
              {Auth.loggedIn() ? (
                <React.Fragment>
                  <Nav.Link href="/home">Home</Nav.Link>
                  {me.customer && <Nav.Link href="/booking">Booking</Nav.Link>}
                  {me.driver && (
                    <Nav.Link href="/jobs">
                      Jobs <NavBadge me={me} setJobsArr={setJobsArr} jobsArr={jobsArr} />
                    </Nav.Link>
                  )}
                  <Nav.Link href="/profile">My Profile</Nav.Link>
                  <Nav.Link onClick={logout}>Logout</Nav.Link>
                  <div className="nav-switch">{Auth.loggedIn() && <JobSwitchButton />}</div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/signup">Sign Up</Nav.Link>
                </React.Fragment>
              )}
            </Nav>
          ) : (
            <Nav className="mr-auto">
              {Auth.loggedIn() ? (
                <React.Fragment>
                  <Nav.Link style={{ color: " #d0d0d05a" }} onClick={selectSomething}>
                    Home
                  </Nav.Link>
                  {me.customer ? <Nav.Link className="nav1">Booking</Nav.Link> : me.driver ? <Nav.Link className="nav1">Jobs </Nav.Link> : ""}
                  <Nav.Link style={{ color: " #d0d0d05a" }} onClick={selectSomething}>
                    My Profile
                  </Nav.Link>
                  <Nav.Link style={{ color: " #d0d0d05a" }} onClick={selectSomething}>
                    Logout
                  </Nav.Link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/signup">Sign Up</Nav.Link>
                </React.Fragment>
              )}
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
