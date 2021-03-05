import React, { useEffect, useState } from 'react'
import {Container, CardDeck} from "react-bootstrap";
import RecipeCard from '../components/RecipeCard';
import { connect, useSelector } from 'react-redux';

const Brewer = ({brewerId}) => {

  const recipes = useSelector(state => state.recipes)
  const [brewer, setBrewer] = useState({})

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/brewers/${brewerId}`)
      .then(res => res.json())
      .then(data => setBrewer(data))   
  }, [])

  return(

      <Container className="user-profile">
        <h3>{brewer.username}</h3>
        {<><h5>Bio</h5><p>{brewer.bio}</p></>}<br></br>
        <h5>Recipes</h5>
        <CardDeck>
          {recipes.filter(r => r.user_id === brewer.id)
          .map((recipe, idx) => <RecipeCard key={idx} recipe={recipe}/>)}
        </CardDeck>
      </Container>

  )
}


const mapStateToProps = state => {
  return {
    recipes: state.recipes
  }
}
export default connect(mapStateToProps)(Brewer)