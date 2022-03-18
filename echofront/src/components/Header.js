import Navbar from 'react-bootstrap/NavBar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import React from 'react';
import {  Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, database } from "../firebase-config";

function Header(props) {

  const logout = async () => {
    await signOut(auth);
  };

return(
  
<Navbar bg="primary" expand="lg">
  <Container>
    <Navbar.Brand >ECHO</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link >Home</Nav.Link>
        <Nav.Link >Link</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Navbar.Text>{props.user}</Navbar.Text>
      <button onClick={logout}> Sign Out </button>
    </Navbar.Collapse>
  </Container>
</Navbar>

)
}

export default Header;