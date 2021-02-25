import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const ReviewForm = ({user, recipe, addReview}) => {

  const [newReview, setNewReview] = useState("")

  const postReview = (e) => {
    e.preventDefault()
    const form = e.target
    fetch("http://localhost:3000/reviews", {
      method: "POST", 
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user_id: user.id,
        recipe_id: recipe.id,
        content: newReview
      })
    }).then(res => res.json())
    .then(review => {
      if(review.message){alert(review.message)}
      else{
        form.reset()
        addReview(review)
        window.scrollTo(0, 0)
      }
    })
  }  

  return (
    
      <Form onSubmit={postReview}>
        <Form.Group controlId="formBasicReview">
        <Form.Label>Review This Recipe</Form.Label>
        <Form.Control
          className="recipe-review-input"
          name="review"
          as="textarea"
          rows="3"
          placeholder="Add a review..."
          onChange={(e) => setNewReview(e.target.value)}
        />
      </Form.Group>
        <Button type="submit">Submit Review</Button> 
       
      </Form>
  )
}
export default ReviewForm