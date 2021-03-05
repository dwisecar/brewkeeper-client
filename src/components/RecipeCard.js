import React from 'react'
import { Card } from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";
import brown from '../assets/images/brown.png'
import paleAle from '../assets/images/pale-ale.png'
import paleTall from '../assets/images/pale-tall.png'
import pilsner from '../assets/images/pilsner.png'
import redShort from '../assets/images/red-short.png'
import redTall from '../assets/images/red-tall.png'
import stout from '../assets/images/stout.png'

const RecipeCard = ({recipe}) => {

  const style = recipe.styles.map(style => style.short_name)
  const image = recipe.styles.map(style => style.image)

  const beerImage = (img) => {
    switch (img) {
      case "brown":
        return brown
      case "pale-ale":
        return paleAle
      case "pale-tall":
        return paleTall
      case "pilsner":
        return pilsner
      case "red-short":
        return redShort
      case "red-tall":
        return redTall
      case "stout":
        return stout

      default:
        break;
    }
  }

  return(   
    <LinkContainer to={`/recipes/${recipe.id}`} style={{cursor: "pointer"}}>
        <Card className="recipe-card shadow text-center border-0">
          <Card.Body>
            <Card.Title>{recipe.name}</Card.Title>
            <Card.Text>{style}</Card.Text>
            <Card.Img src={beerImage(image)}/>
          </Card.Body>
          <Card.Footer>Creator: {recipe.user.username}</Card.Footer>
        </Card>
     </LinkContainer>
  )
}
export default RecipeCard