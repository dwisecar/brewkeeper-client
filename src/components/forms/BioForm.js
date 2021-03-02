import React from "react";
import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const BioForm = (props) => {
  
  const [bioText, setBioText] = useState("")

  const patchBio = (e) => {
    e.preventDefault()  
    const form = e.target
    let token = localStorage.token;
    fetch(`http://localhost:3000/api/v1/edit`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Accepts: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bio: bioText,
        id: props.user.id,
      }),
    }).then(() => {
        form.reset()
        props.onHide()
        props.setBio(bioText)
      }
    )
  }  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={patchBio}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Bio
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group controlId="formBasicReview">
              <Form.Control
                className="recipe-review-input"
                name="review"
                as="textarea"
                rows="3"
                placeholder="Add a bio..."
                defaultValue={props.user.bio && props.bio}
                onChange={(e) => setBioText(e.target.value)}
              />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Submit</Button> 
          <Button onClick={props.onHide}>Close</Button>
          
        </Modal.Footer>
      </Form>
    </Modal>
  )
} 
export default BioForm