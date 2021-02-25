import React from "react";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SignIn from "./forms/SignIn";
import SignUp from "./forms/SignUp";
import EditUser from "./forms/EditUser";
import { useHistory } from "react-router-dom";
//import { GoSearch } from "react-icons/go";

const NavBar = ({
  signIn,
  signUp,
  signOut,
  handleEdit,
  user,
  handleSearch
}) => {
  let history = useHistory();

  return (
    <Navbar className="navbar" expand="lg" fixed="top">
      <LinkContainer to="/">
        <Navbar.Brand>BrewKeeper</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer exact to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          
          {user ? (
            <>
              <LinkContainer exact to="/signout">
                <Nav.Link
                  title="Sign Out"
                  onClick={(e) => (
                    signOut(e), setTimeout(() => history.push("/"), 30)
                  )}
                  style={{ color: "rgba(0,0,0,.5)" }}
                >
                  Sign Out
                </Nav.Link>
              </LinkContainer>
              <NavDropdown title="Edit User">
                <EditUser handleEdit={handleEdit} user={user} />
              </NavDropdown>
            </>
          ) : (
            <>
              <NavDropdown title="Sign In">
                <SignIn signIn={signIn} />
              </NavDropdown>
              <NavDropdown title="Sign Up">
                <SignUp signUp={signUp} />
              </NavDropdown>
            </>
          )}
        </Nav>
        {/* <GoSearch style={{ marginRight: "10px" }} /> */}
        
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;