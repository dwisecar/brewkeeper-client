import { Button, Container, Row, Col } from 'react-bootstrap'
import React from 'react'

const Reviews = ({reviews, user, setReviews, setReviewToEdit, handleEditClick}) => {

  //will set reviews state to all except the one being deleted, then sends request to server to delete
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
        <Row key={review.id} className="border review">
          <Col style={{alignSelf: "center"}}>
            <p style={{margin: "0"}}>{review.user.username}: {review.content}</p> 
          </Col>
          {review.user_id === user.id && <>
            <Col xs={1}>
              <Button 
              
                variant="success"
                onClick={() => (
                  setReviewToEdit(review),
                  handleEditClick()
                  )}>Edit</Button>
            </Col>
          
            <Col xs={1}>
              <Button variant="success" onClick={() => handleDelete(review)}>X</Button>
            </Col></>}
        </Row>))}
    </Container>
  )

}
export default Reviews