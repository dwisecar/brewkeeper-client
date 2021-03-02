import React, { useState } from 'react'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import { connect, useSelector } from 'react-redux'
import StyleDisplay from '../components/ingredientDisplays/StyleDisplay'
import FermentableDisplay from '../components/ingredientDisplays/FermentableDisplay'
import HopDisplay from '../components/ingredientDisplays/HopDisplay'
import YeastDisplay from '../components/ingredientDisplays/YeastDisplay'

const StylesIngredients = ({list, type}) => {

  const [selectedIngredient, setSelectedIngredient] = useState(list)


  return (
    <>
    <Container>
      <Row>
        <Col xs={4}>
      <h3>{type}</h3>
        <ListGroup className="list-items">
          {list.map(i => <ListGroup.Item 
            className="list-item"
            onClick={() => setSelectedIngredient(i)}>{i.name}</ListGroup.Item>)}
        </ListGroup>
        </Col>
        <Col>
          {type === "Styles" && <StyleDisplay item={selectedIngredient}/>}
          {type === "Fermentables" && <FermentableDisplay item={selectedIngredient}/>}
          {type === "Hops" && <HopDisplay item={selectedIngredient}/>}
          {type === "Yeast" && <YeastDisplay item={selectedIngredient}/>}
        </Col>
      </Row>
    </Container>
    </>
  )
}


export default StylesIngredients