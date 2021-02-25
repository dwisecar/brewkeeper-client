import React from 'react'
import {Container, CardDeck, NavDropdown} from "react-bootstrap";
import RecipeCard from '../components/RecipeCard';


const AllRecipes = ({recipes}) => {

  return(
    <Container className="all-recipes">
      <CardDeck>
        {recipes.map((recipe, idx) => <RecipeCard key={idx} recipe={recipe}/>)}
      </CardDeck>
    </Container>
  )
}
export default AllRecipes