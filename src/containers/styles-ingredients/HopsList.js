import React, { useState, useEffect } from 'react'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import HopDisplay from '../../components/ingredientDisplays/HopDisplay'

const HopsList = ({id}) => {

  const [hops, setHops] = useState([])
  const [selectedIngredient, setSelectedIngredient] = useState()

  useEffect(() => {
    fetchDetails()
  }, [])

  const fetchDetails = () => {
    fetch("http://localhost:3000/hops")
    .then(res => res.json())
    .then(data => {
      setHops(data)
      setSelectedIngredient(data[id])
    })
  }

  return (
    <Container>
      <Row>
        <Col xs={4}>
        <h3>Hops</h3>
        <ListGroup className="list-items">
          {hops.map(i => <ListGroup.Item 
            className="list-item"
            onClick={() => setSelectedIngredient(i)}>{i.name}</ListGroup.Item>)}
        </ListGroup>
        </Col>
        <Col>
          {selectedIngredient && <HopDisplay item={selectedIngredient}/>}
        </Col>
      </Row>
    </Container>
  )
}
export default HopsList