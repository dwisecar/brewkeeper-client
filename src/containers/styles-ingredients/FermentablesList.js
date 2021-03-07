import React, { useState, useEffect } from 'react'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import FermentableDisplay from '../../components/ingredientDisplays/FermentableDisplay'

const HopsList = ({id}) => {

  const [fermentables, setFermentables] = useState([])
  const [selectedIngredient, setSelectedIngredient] = useState()

  useEffect(() => {
    fetchDetails()
  }, [])

  const fetchDetails = () => {
    fetch("https://brewkeeper-api.herokuapp.com/fermentables")
    .then(res => res.json())
    .then(data => {
      setFermentables(data)
      setSelectedIngredient(data[id])
    })
  }

  return (
    <Container>
      <Row>
        <Col xs={4}>
        <h3>Fermentables</h3>
        <ListGroup className="list-items">
          {fermentables.map(i => <ListGroup.Item 
            className="list-item"
            onClick={() => setSelectedIngredient(i)}>{i.name}</ListGroup.Item>)}
        </ListGroup>
        </Col>
        <Col>
          {selectedIngredient && <FermentableDisplay item={selectedIngredient}/>}
        </Col>
      </Row>
    </Container>
  )
}
export default HopsList