import { Button, Container, Row, Col, OverlayTrigger, Popover, Spinner } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import RatingForm from './forms/RatingForm'
import ReviewForm from './forms/ReviewForm'
import Reviews from './recipe_show/Reviews'
import { useHistory } from "react-router-dom";
import Stats from './recipe_show/Stats'
import { connect, useSelector, useDispatch } from "react-redux";
import brown from '../assets/images/brown.png'
import paleAle from '../assets/images/pale-ale.png'
import paleTall from '../assets/images/pale-tall.png'
import pilsner from '../assets/images/pilsner.png'
import redShort from '../assets/images/red-short.png'
import redTall from '../assets/images/red-tall.png'
import stout from '../assets/images/stout.png'
import { LinkContainer } from 'react-router-bootstrap'
import EditNotesModal from './forms/EditNotesModal'

const Recipe = ({recipeId}) => { 

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const [reviews, setReviews] = useState([])
  const [ratings, setRatings] = useState([])
  const [recipe, setRecipe] = useState(null)
  const [reviewToEdit, setReviewToEdit] = useState(null)
  const [modalShow, setModalShow] = useState(false)
  const [beerImg, setBeerImg] = useState()
  const [showEditNotes, setShowEditNotes] = useState(false)
  const [displayNotes, setDisplayNotes] = useState("")
  
  let history = useHistory()
  
  useEffect(() => {
    fetchRecipe(recipeId)
  }, [])

  //fetch recipes on mount and set states for recipe, ratings, reviews, notes, and set the beer image for that style of beer 
  const fetchRecipe = id => {
    fetch(`https://brewkeeper-api.herokuapp.com/recipes/${id}`)
    .then(res => res.json())
    .then(data => {
      setRecipe(data)
      setReviews(data.reviews)
      setRatings(data.ratings)
      beerImage(data.styles.map(style => style.image)[0])
      setDisplayNotes(data.notes)
    })
  }

  //sets the beer image to what the style of beer is
  const beerImage = (img) => {
    switch (img) {
      case "brown":
        setBeerImg(brown);
        break;
      case "pale-ale":
        setBeerImg(paleAle);
        break;
      case "pale-tall":
        setBeerImg(paleTall);
        break;
      case "pilsner":
        setBeerImg(pilsner);
        break;
      case "red-short":
        setBeerImg(redShort);
        break;
      case "stout":
        setBeerImg(stout);
        break;
      case "red-tall":
        setBeerImg(redTall);
        break;
      default:
        setBeerImg(paleTall);
        break;
    }
  }

  //returns the forms to leave rating and review if the user is logged in
  const ratingAndReviewForms = () => {
    return(
      <>
      <Button variant="success" onClick={() => setModalShow(true)}>
        Leave A Review
      </Button>
      <RatingForm recipe={recipe} user={user} ratings={ratings} setRatings={setRatings}/></>
    )
  }

  //adds review to reviews state 
  const addReview = (review) => { 
    setReviews(prevReviews => [...prevReviews, review])
  }

  //splices in the updated review to state
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

  //determines the average rating based on ratings state array
  let avgRating = () => {    
    return (ratings.map(r => r.stars).reduce((acc, i) => acc + i) / ratings.length).toFixed(2) 
  }

  //will send request to delete recipe and update redux state of all recipes
  const handleDelete = () => {   
    fetch(`https://brewkeeper-api.herokuapp.com/recipes/${recipe.id}`, {
      method: "DELETE", 
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    })
    .then(dispatch({
      type: "DELETE_RECIPE",
      value: recipe
    }))
    .then(history.push("/"))
  }
  
  return recipe ? (
    <Container className="recipe-page">
      <Row>
        <Col className="text-center">
          <h3>{recipe.name}</h3>
          <LinkContainer to={`/styles/${recipe.styles[0].id}`} style={{cursor: "pointer"}}>
            <h4 className="style-link">{recipe.styles[0].name}</h4>
          </LinkContainer>
          
          <h6>By {recipe.user.username}</h6>
        </Col>
      </Row>

      <Row>
        <Col >
          <Stats recipe={recipe}/>
        </Col>
        <Col style={{textAlign: "center"}}>
          <img src={beerImg} alt="beer-style"/>
        </Col>
        <Col>
          {ratings.length !== 0 ? <h5>Average Rating: {avgRating()}</h5> :
          <h5>Average Rating: 0</h5>}
        </Col>
      </Row>
      
      <Row>
        <Col xs={5}>
          <h5>Fermentables</h5>
            <ul className="fermentables-list">
              {recipe.recipe_fermentables.map((f, idx) => 
                <OverlayTrigger
                  key={idx}
                  placement="right"
                  delay={{ show: 250, hide: 250 }}
                  overlay={
                    <Popover className="ingredient-tooltip" >
                      {f.fermentable.description}
                    </Popover>
                  }>
                    <li className="recipe-show-ingredient">{f.fermentable.name}: {f.amount} Lbs.</li>
                </OverlayTrigger>)}
            </ul>

            <h5>Hops</h5>
            <ul className="hops-list">
              {recipe.recipe_hops.map((h, idx) => 
                <OverlayTrigger
                  key={idx}
                  placement="right"
                  delay={{ show: 250, hide: 250 }}
                  overlay={
                    <Popover className="ingredient-tooltip">
                      {h.hop.description}
                    </Popover>
                  }>
                    <li className="recipe-show-ingredient" key={idx}>{h.hop.name}: {h.amount} oz. {h.boil_addition ? "Boil" : "Dry Hopping"} Addition Time: {h.addition_time}  {h.boil_addition ? "Minutes" : "Days"}</li>
                </OverlayTrigger>
              )}
            </ul>

            <h5>Yeast</h5>
            <ul className="yeast-list">
              {recipe.recipe_yeasts.map((y, idx) => 
                 <OverlayTrigger
                  key={idx}
                  placement="right"
                  delay={{ show: 250, hide: 250 }}
                  overlay={
                    <Popover className="ingredient-tooltip">
                      {y.yeast.description}
                    </Popover>
                 }>
              <li className="recipe-show-ingredient" key={idx}>{y.yeast.name}: {y.amount} pack.</li>
              </OverlayTrigger>
              )}
            </ul>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5>Instructions</h5>
            <p>{recipe.instructions}</p>
          <h5>Notes</h5>
            <p>{displayNotes}</p>
        </Col>
      </Row>

      <Row>
        <Col xs={2}>
          {recipe.user_id === user.id && <Button variant="success" onClick={() => setShowEditNotes(true)}>Edit Notes</Button>} 
        </Col>
        <Col>
          {recipe.user_id === user.id && <Button variant="success" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) handleDelete() }}>Delete Recipe</Button>} 
        </Col>

      </Row>
      
      <Row className="reviews-box border rounded">
        <Col>
          <h5>Reviews</h5>
            <Reviews reviews={reviews} user={user} setReviews={setReviews} setReviewToEdit={setReviewToEdit} handleEditClick={handleReviewEditClick}/>
            <br></br>
            { user !== false && recipe.user_id !== user.id && ratingAndReviewForms()}

            <ReviewForm show={modalShow} onHide={() => setModalShow(false)} recipe={recipe} user={user} addReview={addReview} reviewToEdit={reviewToEdit} editReview={editReview} reviews={reviews}/>
            <EditNotesModal show={showEditNotes} onHide={() => setShowEditNotes(false)} recipe={recipe} user={user} setDisplayNotes={setDisplayNotes}/>     
        </Col>
      </Row>
      </Container>
  )
   : (<Container> <Spinner animation="border" variant="secondary" /> </Container>)
}

const mapStateToProps = state => {
  return {
    user: state.user,
    recipes: state.recipes
  }
}

export default connect(mapStateToProps)(Recipe)