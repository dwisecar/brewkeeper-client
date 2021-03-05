import React from 'react'
import { Form, Button, Modal } from "react-bootstrap";

const LogInModal = (props) => {


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={(e) => {
        props.signIn(e)
        props.onHide() 
      }}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Log In
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
       
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              className="nav-search"
              name="username"
              type="username"
              placeholder="Username"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              className="nav-search"
            />
          </Form.Group>

       
        </Modal.Body>
        <Modal.Footer style={{justifyContent: "flex-start" }}>
          <Button variant="primary" type="submit">Submit</Button>
          
          
        </Modal.Footer>
        </Form>

    </Modal>
  )
}
export default SignInModal