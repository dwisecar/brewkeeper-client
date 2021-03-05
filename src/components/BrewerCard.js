import React from 'react'
import { Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const BrewerCard = ({brewer}) => {

  const brewerCreatedDate = date => {
    const fullDate =  Date(date.replace(' ', 'T')).split(' ')
    return `${fullDate[1]} ${fullDate[2]}, ${fullDate[3]}`
  }

  return(
    <LinkContainer to={`/brewers/${brewer.id}`} style={{cursor: "pointer"}}>
    <Card className="recipe-card shadow">
      <Card.Body>
        <Card.Title>{brewer.username}</Card.Title>
        <p>{brewer.bio && brewer.bio}</p>
        <p>User since: {brewerCreatedDate(brewer.created_at)}</p>
      </Card.Body>
      <Card.Footer>
        Recipes Created: {brewer.recipes.length}
      </Card.Footer>
    </Card>
 </LinkContainer>
  )
}
export default BrewerCard