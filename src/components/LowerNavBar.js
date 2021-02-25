import React from "react";

import {Navbar, Nav, NavDropdown, Form, FormControl} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SignIn from "./forms/SignIn";
import SignUp from "./forms/SignUp";
import EditUser from "./forms/EditUser";
import { useHistory } from "react-router-dom";
//import { GoSearch } from "react-icons/go";

const LowerNavBar = ({
  signIn,
  signUp,
  signOut,
  handleEdit,
  user,
  handleSearch
}) => {
  let history = useHistory();

  return (
    <Navbar className="navbar" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer exact to="/">
            <Nav.Link>Recipes</Nav.Link>
          </LinkContainer>

          <LinkContainer exact to="/brewers">
            <Nav.Link>Brewers</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/styles">
            <Nav.Link>Styles</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/ingredients">
            <Nav.Link>Ingredients</Nav.Link>
          </LinkContainer>

          {user ? (
            <>
              <LinkContainer to="/profile">
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/recipes/new">
                <Nav.Link>Create Recipe</Nav.Link>
              </LinkContainer>
            </>) : null}

        </Nav>
        {/* <GoSearch style={{ marginRight: "10px" }} /> */}
        
      </Navbar.Collapse>
    </Navbar>
  );
};

export default LowerNavBar;