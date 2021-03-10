import React from "react";
import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const EditNotesModal = (props) => {

  const [newNotes, setNewNotes] = useState("")

  //sends patch request to recipe notes and update the state of display notes
  const patchNotes = (e) => {
    e.preventDefault()
    const form = e.target
    fetch(`https://brewkeeper-api.herokuapp.com/recipes/${props.recipe.id}`, {
      method: "PATCH", 
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        notes: newNotes
      })
    }).then(res => res.json())
    .then(() => 
      form.reset(),
      props.onHide(),
      props.setDisplayNotes(newNotes)
    )
  }

  return (    
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={patchNotes}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Notes for {props.recipe.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group controlId="formBasicReview">
              <Form.Control
                className="recipe-review-input"
                name="review"
                as="textarea"
                rows="3"
                defaultValue={props.recipe.notes && props.recipe.notes}
                onChange={(e) => setNewNotes(e.target.value)}
              />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit">Submit Notes</Button> 
          
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
export default EditNotesModal