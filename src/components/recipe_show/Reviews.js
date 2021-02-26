import { Button } from 'react-bootstrap'
import React, { useState } from 'react'


const Reviews = ({reviews, user, setReviews, setReviewToEdit, handleEditClick}) => {

  const handleDelete = review => {
    setReviews(prevReviews => prevReviews.filter(rev => rev.id !== review.id))

    fetch(`http://localhost:3000/reviews/${review.id}`, {
      method: "DELETE", 
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    })
  }  

  return(
    <div className="reviews">
      {reviews.map(review => (
        <div className="review" key={review.id}>
          <p>{review.user.username}: {review.content}</p>  
          {review.user_id === user.id && <>
          <Button onClick={() => (
            setReviewToEdit(review),
            handleEditClick()
            )}>Edit</Button>
          <Button onClick={() => handleDelete(review)}>X</Button></>}
        </div>))}
    </div>
  )

}
export default Reviews