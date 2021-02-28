import React from "react";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SignIn from "./forms/SignIn";
import SignUp from "./forms/SignUp";
import EditUser from "./forms/EditUser";
import { useHistory } from "react-router-dom";
import { connect, useSelector } from "react-redux";
//import { GoSearch } from "react-icons/go";

const NavBar = ({
  signIn,
  signUp,
  signOut,
  handleEdit,
  handleSearch
}) => {
  let history = useHistory();
  const user = useSelector(state => state.user)

  return (
    <Navbar className="navbar" expand="lg" fixed="top" >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">

          <LinkContainer exact to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          {user ? (
              <LinkContainer to="/profile">
                <Nav.Link>{user.username}'s Profile</Nav.Link>
              </LinkContainer>) : null}
          
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

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(NavBar)