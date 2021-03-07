import React from "react";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'



const RatingForm = ({user, recipe}) => {

  const [rating, setRating] = useState(0)
  const [userHasRated, setUserHasRated] = useState(false)
  const [previousRating, setPreviousRating] = useState({})

  useEffect(() => {
    const userRating = user.ratings.filter(rating => rating.recipe_id === recipe.id) 
    userRating.length !== 0 ? handleUserPrevRating(userRating) : setUserHasRated(false)
    
  }, [])

  const handleUserPrevRating = rating => {
    setUserHasRated(true)
    setRating(rating[0].stars)
    setPreviousRating(rating[0])
  }

  const postRating = () => {
    setUserHasRated(true)
    setTimeout(() => {
      fetch("https://brewkeeper-api.herokuapp.com/ratings", {
        method: "POST", 
        headers: {
          "Content-type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          user_id: user.id,
          recipe_id: recipe.id,
          value: rating
        })
      }).then(res => res.json())
      .then(rating => {
        setPreviousRating(rating)
      })
    }, 1000);
  }  

  const patchRating = () => {
    setTimeout(() => {
      fetch(`https://brewkeeper-api.herokuapp.com/ratings/${previousRating.id}`, {
        method: "PATCH", 
        headers: {
          "Content-type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          id: previousRating.id,
          user_id: user.id,
          recipe_id: recipe.id,
          value: rating
        })
      }).then(res => res.json())
      .then(rating => {
        setPreviousRating(rating)
      })
    }, 1000);
    
  }  

  return (
    <div className="my-5">
      <label htmlFor="rating-slider">Rating: {rating} </label><br></br>
  
      <div className='slider' style={{width: "150px"}}>
        <Slider
          min={0}
          max={10}
          step={1}
          value={rating}
          onChange={setRating}
        />
      </div>
      {userHasRated ? 
      <Button variant="success" onClick={() => patchRating()}>Update Rating</Button>
      : <Button variant="success" onClick={() => postRating()}>Submit Rating</Button>}
      
    </div>
  )
}
export default RatingForm
