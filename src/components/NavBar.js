import React, { useState }from "react";
import {Navbar, Nav} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import LogInModal from './LogInModal'

const NavBar = ({signIn, signUp, signOut}) => {

  let history = useHistory();
  const user = useSelector(state => state.user)

  const [signInModalShow, setSignInModalShow] = useState(false)
  const [signUpModalShow, setSignUpModalShow] = useState(false)

  return (
    <>
    <Navbar className="navbar shadow" expand="lg" fixed="top" variant="dark">
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
            </>
          ) : (
            <>
              <Nav.Link onClick={() => setSignInModalShow(true)}>Log In</Nav.Link>
              <Nav.Link onClick={() => setSignUpModalShow(true)}>Sign Up</Nav.Link>
            </>
          )}
        </Nav>

        
      </Navbar.Collapse>
    </Navbar>
    <LogInModal 
      show={signInModalShow} 
      onHide={() => setSignInModalShow(false)} 
      signIn={signIn}
      header={"Log In"}/>
    <LogInModal 
      show={signUpModalShow} 
      onHide={() => setSignUpModalShow(false)} 
      signIn={signUp}
      header={"Sign Up"}/>
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(NavBar)