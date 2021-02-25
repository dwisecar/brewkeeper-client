import React, { useEffect, useState } from 'react'
import { InputGroup } from 'react-bootstrap'
import RatingForm from '../components/forms/RatingForm'
import ReviewForm from '../components/forms/ReviewForm'
import Reviews from '../components/recipe_show/Reviews'

const Recipe = ({recipe, user}) => {

  const [reviews, setReviews] = useState([])
  const [ratings, setRatings] = useState([])
  const [avgRating, setAvgRating] = useState([])

  useEffect(() => {
    setReviews(recipe.reviews)
    setRatings(recipe.ratings)
    setAvgRating(determineAvgRating())
  }, [])


  const ratingAndReviewForms = () => {
    return(
      <><ReviewForm recipe={recipe} user={user} addReview={addReview}/>
      <RatingForm recipe={recipe} user={user} addRating={addRating} editRating={editRating}/></>
    )
  }

  const addRating = rating => {
    setRatings(prev => [...prev, rating])
    setAvgRating(determineAvgRating())   
  }

  const editRating = rating => {
    const index = ratings.findIndex(r => r.id == rating.id)
    const newRatings = ratings
    newRatings.splice(index, 1, rating)
    setRatings(newRatings)
    setAvgRating(determineAvgRating())
  }

  const addReview = (review) => { 
    setReviews(prevReviews => [...prevReviews, review])
  }

  const determineAvgRating = () => {
    return (recipe.ratings.map(r => r.stars).reduce((acc, i) => acc + i) / recipe.ratings.length).toFixed(2)
  }


  return(
    <div className="recipe-page">
      <h3>{recipe.name}, by {recipe.user.username}</h3>
      <h4>{recipe.styles[0].name}</h4>
      <h5>Average Rating: {avgRating}</h5>
      <h5>Fermentables</h5>
      <ul className="fermentables-list">
        {recipe.fermentables.map((f, idx) => <li key={idx}>{f.name}. SRM: {f.srm_precise}. Potential: {f.potential}. Protein: {f.protein}</li>)}
      </ul>
      <h5>Hops</h5>
      <ul className="hops-list">
        {recipe.hops.map((f, idx) => <li key={idx}>{f.name}. Alpha Acid: {f.alpha_acid_min}. Beta acid range: {f.beta_acid_min} - {f.beta_acid_max}</li>)}
      </ul>
      <h5>Yeast</h5>
      <ul className="yeast-list">
        {recipe.yeasts.map((f, idx) => <li key={idx}>{f.name}. Attenuation: {f.attenuation_min} - {f.attenuation_max}.</li>)}
      </ul>
      <h5>Instructions</h5>
        <p>{recipe.instructions}</p>
      <h5>Notes</h5>
      <p>{recipe.notes}</p>
      <h5>Reviews</h5>
      <Reviews reviews={reviews} user={user} setReviews={setReviews}/>
      { user !== false && ratingAndReviewForms()}
    </div>
  )
}
export default Recipe