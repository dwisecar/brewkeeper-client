import { Button, Container, Row, Col } from 'react-bootstrap'
import React, { useState } from 'react'


const Reviews = ({reviews, user, setReviews, setReviewToEdit, handleEditClick}) => {

  const handleDelete = review => {
    setReviews(prevReviews => prevReviews.filter(rev => rev.id !== review.id))

    fetch(`https://brewkeeper-api.herokuapp.com/reviews/${review.id}`, {
      method: "DELETE", 
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    })
  }  

  return(
    <Container className="reviews">
      {reviews.map(review => (
        <Row className="review" key={review.id} className="border">
          <Col>
            <p>{review.user.username}: {review.content}</p> 
          </Col>
          {review.user_id === user.id && <>
            <Col xs={1}>
              <Button onClick={() => (
              setReviewToEdit(review),
              handleEditClick()
              )}>Edit</Button>
            </Col>
          
            <Col xs={1}>
              <Button onClick={() => handleDelete(review)}>X</Button>
            </Col></>}
        </Row>))}
    </Container>
  )

}
export default Reviews