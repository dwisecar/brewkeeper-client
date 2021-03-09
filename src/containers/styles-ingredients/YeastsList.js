import React, { useState, useEffect } from 'react'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import YeastDisplay from '../../components/ingredientDisplays/YeastDisplay'

const YeastsList = ({id}) => {

  const [yeasts, setYeasts] = useState([])
  const [selectedIngredient, setSelectedIngredient] = useState()

  useEffect(() => {
    const fetchDetails = () => {
      fetch("https://brewkeeper-api.herokuapp.com/yeasts")
      .then(res => res.json())
      .then(data => {
        setYeasts(data)
        setSelectedIngredient(data[id])
      })
    }
    fetchDetails()
  }, [])

  return (
    <Container>
      <Row>
        <Col xs={4}>
        <h3>Yeasts</h3>
        <ListGroup className="list-items">
          {yeasts.map(i => <ListGroup.Item 
            className="list-item"
            onClick={() => setSelectedIngredient(i)}>{i.name}</ListGroup.Item>)}
        </ListGroup>
        </Col>
        <Col>
          {selectedIngredient && <YeastDisplay item={selectedIngredient}/>}
        </Col>
      </Row>
    </Container>
  )
}
export default YeastsList