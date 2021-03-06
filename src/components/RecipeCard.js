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
import { useEffect, useState } from 'react'

const RecipeCard = ({recipe}) => {

  const style = recipe.styles.map(style => style.name)
  const [beerImg, setBeerImg] = useState()
  
  useEffect(() => {
    beerImage(recipe.styles.map(style => style.image)[0])
  }, [recipe])

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

  return(   
    <LinkContainer to={`/recipes/${recipe.id}`} style={{cursor: "pointer"}}>
        <Card className="recipe-card shadow text-center border-0">
          <Card.Body style={{padding: ".7rem"}}>
            <Card.Title style={{marginBottom: ".1rem"}}>{recipe.name}</Card.Title>
            <Card.Text style={{marginBottom: ".1rem"}}>{style}</Card.Text>
            <Card.Img className="recipe-card-beer-img" src={beerImg}/>
          </Card.Body>
          <Card.Footer>Creator: {recipe.user.username}</Card.Footer>
        </Card>
     </LinkContainer>
  )
}
export default RecipeCard