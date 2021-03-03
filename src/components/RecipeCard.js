import React from 'react'
import { Card } from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";

const RecipeCard = ({recipe}) => {

  const style = recipe.styles.map(style => style.name)
  
  return(
    
    <LinkContainer to={`/recipes/${recipe.id}`} style={{cursor: "pointer"}}>
        <Card className="recipe-card shadow text-center border-0">
          <Card.Body>
            <Card.Title>{recipe.name}</Card.Title>
            <Card.Text>{style}</Card.Text>
          </Card.Body>
          <Card.Footer>Creator: {recipe.user.username}</Card.Footer>
        </Card>
     </LinkContainer>
  )
}
export default RecipeCard