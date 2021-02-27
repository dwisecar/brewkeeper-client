import { Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import RatingForm from '../components/forms/RatingForm'
import ReviewForm from '../components/forms/ReviewForm'
import Reviews from '../components/recipe_show/Reviews'
import { useHistory, Link } from "react-router-dom";
import Stats from '../components/recipe_show/Stats'


const Recipe = ({recipeId, user, deleteRecipe}) => {

  const [reviews, setReviews] = useState([])
  const [recipe, setRecipe] = useState(null)
  const [reviewToEdit, setReviewToEdit] = useState(null)
  const [modalShow, setModalShow] = useState(false)
  
  let history = useHistory()
  
  useEffect(() => {
    fetchRecipe(recipeId)
    //setReviews(recipe.reviews)
  }, [])

  const fetchRecipe = id => {
    fetch(`http://localhost:3000/recipes/${id}`)
    .then(res => res.json())
    .then(data => {
      setRecipe(data)
      setReviews(data.reviews)
    })
  }

  const ratingAndReviewForms = () => {
    return(
      <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Leave A Review
      </Button>
      <RatingForm recipe={recipe} user={user} /></>
    )
  }

  const addReview = (review) => { 
    setReviews(prevReviews => [...prevReviews, review])
  }

  const editReview = review => {
    let index = reviews.findIndex(r => r.id === review.id)
    let newReviews = reviews
    newReviews.splice(index, 1, review)
    setReviews(newReviews)
    setReviewToEdit(null)
  }

  const handleReviewEditClick = () => {
    setModalShow(true)
  }

  let avgRating = () => {    
    return (recipe.ratings.map(r => r.stars).reduce((acc, i) => acc + i) / recipe.ratings.length).toFixed(2) 
  }

  const handleDelete = () => {   
    fetch(`http://localhost:3000/recipes/${recipe.id}`, {
      method: "DELETE", 
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    }).then(deleteRecipe(recipe)).then(history.push("/"))
  }  
  
  const amountFinder = ingredient => {
    switch (ingredient) {
      case "":
        
        break;
    
      default:
        break;
    }
  }
  
  return recipe ? (
    <div className="recipe-page">
      <h3>{recipe.name}, by {recipe.user.username}</h3>
      <h4>{recipe.styles[0].name}</h4>
      <Stats recipe={recipe}/>
      {recipe.ratings.length !== 0 && <h5>Average Rating: {avgRating()}</h5>}
      <h5>Fermentables</h5>
      <ul className="fermentables-list">
        {recipe.recipe_fermentables.map((f, idx) => <li key={idx}>{f.fermentable.name}: {f.amount} Lbs.</li>)}
      </ul>
      <h5>Hops</h5>
      <ul className="hops-list">
        {recipe.recipe_hops.map((h, idx) => <li key={idx}>{h.hop.name}: {h.amount} oz.</li>)}
      </ul>
      <h5>Yeast</h5>
      <ul className="yeast-list">
        {recipe.recipe_yeasts.map((y, idx) => <li key={idx}>{y.yeast.name}: {y.amount} pack.</li>)}
      </ul>
      <h5>Instructions</h5>
        <p>{recipe.instructions}</p>
      <h5>Notes</h5>
      <p>{recipe.notes}</p>
      {recipe.user_id === user.id && <Button onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) handleDelete() }}>Delete Recipe</Button>}
      <h5>Reviews</h5>
      <Reviews reviews={reviews} user={user} setReviews={setReviews} setReviewToEdit={setReviewToEdit} handleEditClick={handleReviewEditClick}/>
      { user !== false && ratingAndReviewForms()}

      <ReviewForm show={modalShow} onHide={() => setModalShow(false)} recipe={recipe} user={user} addReview={addReview} reviewToEdit={reviewToEdit} editReview={editReview} reviews={reviews}/>
    </div>
  )
   : (<div>Loading</div>)
}
export default Recipe