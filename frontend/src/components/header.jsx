import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../css/header.css";

function Header() {
  return (
    <>
      <Navbar className="bg-body-tertiary headerBackground">
        <Container>
          <Navbar.Brand href="/" className="text-white font-weight-bold">
            NASA Profile
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link href="/" className="headerFonts">
                HOME
              </Nav.Link>
              <Nav.Link href="#link" className="headerFonts">
                CONTACT
              </Nav.Link>
              <Nav.Link href="#link" className="headerFonts">
                ABOUT
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
