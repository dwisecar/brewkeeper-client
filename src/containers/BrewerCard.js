import React from 'react'
import { Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const BrewerCard = ({brewer}) => {

  return(
    <LinkContainer to={`/brewers/${brewer.id}`} style={{cursor: "pointer"}}>
    <Card className="recipe-card">
      <Card.Body>
        <Card.Title>{brewer.username}</Card.Title>
        <Card.ImgOverlay src={"src/images/hops.jpg"}>
          <Card.Text>{brewer.bio && brewer.bio}</Card.Text>
        </Card.ImgOverlay>
      </Card.Body>

    </Card>
 </LinkContainer>
  )
}
export default BrewerCard