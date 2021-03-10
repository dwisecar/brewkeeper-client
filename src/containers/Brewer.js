import React, { useEffect, useState } from 'react'
import {Container, CardDeck, Spinner} from "react-bootstrap";
import RecipeCard from '../components/RecipeCard';
import { connect, useSelector } from 'react-redux'; 

const Brewer = ({brewerId}) => {

  const recipes = useSelector(state => state.recipes)
  const [brewer, setBrewer] = useState(null)
  
  useEffect(() => {
    fetchBrewer(brewerId)
  }, [])

  const fetchBrewer = id => {
    fetch(`https://brewkeeper-api.herokuapp.com/api/v1/brewers/${id}`)
    .then(res => res.json())
    .then(data => setBrewer(data))  
  }

  return brewer ? (
      <Container className="user-profile">
        <h3>{brewer.username}</h3>
        {<><h5>Bio</h5><p>{brewer.bio}</p></>}<br></br>
        <h5>Recipes</h5>
        <CardDeck style={{gridTemplateColumns: "repeat(4, 1fr)"}}>  
          {recipes.filter(r => r.user_id === brewer.id)
          .map((recipe, idx) => <RecipeCard key={idx} recipe={recipe}/>)}
        </CardDeck>
      </Container>
  ) : (<Container> <Spinner animation="border" variant="secondary" /> </Container>)
}


const mapStateToProps = state => {
  return {
    recipes: state.recipes
  }
}
export default connect(mapStateToProps)(Brewer)