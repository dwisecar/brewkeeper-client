import React, { useState, useEffect } from 'react'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import StyleDisplay from '../../components/ingredientDisplays/StyleDisplay'

const StylesList = ({id}) => {

  const [styles, setStyles] = useState([])
  const [selectedIngredient, setSelectedIngredient] = useState()

  useEffect(() => {
    fetchDetails()
  }, [])

  const fetchDetails = () => {
    fetch("https://brewkeeper-api.herokuapp.com/styles")
    .then(res => res.json())
    .then(data => {
      setStyles(data)
      setSelectedIngredient(data[id])
    })
  }

  return (
    <Container>
      <Row>
        <Col xs={4}>
        <h3>Styles</h3>
        <ListGroup className="list-items">
          {styles.map(i => <ListGroup.Item 
            className="list-item"
            onClick={() => setSelectedIngredient(i)}>{i.name}</ListGroup.Item>)}
        </ListGroup>
        </Col>
        <Col>
          {selectedIngredient && <StyleDisplay item={selectedIngredient}/>}
        </Col>
      </Row>
    </Container>
  )
}
export default StylesList