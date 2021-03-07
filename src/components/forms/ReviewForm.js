import React from "react";
import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import Reviews from "../recipe_show/Reviews";

const ReviewForm = (props) => {

  const [newReview, setNewReview] = useState("")

  const handleSubmit = e => {
    e.preventDefault()
    props.reviewToEdit ? patchReview(e) : postReview(e)
  }

  const postReview = (e) => {
    const form = e.target
    fetch("http://localhost:3000/reviews", {
      method: "POST", 
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user_id: props.user.id,
        recipe_id: props.recipe.id,
        content: newReview
      })
    }).then(res => res.json())
    .then(review => {
      if(review.message){alert(review.message)}
      else{
        form.reset()
        props.onHide()
        props.addReview(review)
      }
    })
  }  

  const patchReview = (e) => {
    const form = e.target
    fetch(`http://localhost:3000/reviews/${props.reviewToEdit.id}`, {
      method: "PATCH", 
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        content: newReview
      })
    }).then(res => res.json())
    .then(review => {
      if(review.message){alert(review.message)}
      else{
        form.reset()
        props.onHide()
        props.editReview(review)
      }
    })
  }  


  return (
    
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Leave A Review for {props.recipe.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group controlId="formBasicReview">
              <Form.Control
                className="recipe-review-input"
                name="review"
                as="textarea"
                rows="3"
                placeholder="Add a review..."
                defaultValue={props.reviewToEdit && props.reviewToEdit.content}
                onChange={(e) => setNewReview(e.target.value)}
              />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit">Submit Review</Button> 
          
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
export default ReviewForm