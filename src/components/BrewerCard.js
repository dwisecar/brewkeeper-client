import React from 'react'
import { Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import hops from '../assets/images/hops-bar.png'

const BrewerCard = ({brewer}) => {

  //converts the postgres timestamp to MM/DD/YYYY
  const brewerCreatedDate = date => {
    const fullDate =  Date(date.replace(' ', 'T')).split(' ')
    return `${fullDate[1]} ${fullDate[2]}, ${fullDate[3]}`
  }

  return(
    <LinkContainer to={`/brewers/${brewer.id}`} style={{cursor: "pointer"}}>
    <Card className="recipe-card shadow">
      <Card.Body style={{textAlign: "center"}}>
        <Card.Title >{brewer.username}</Card.Title>
        <img style={{width: "200px", marginBottom: "15px"}} src={hops} alt="Hops"/>
        <p>User since: {brewerCreatedDate(brewer.created_at)}</p>
      </Card.Body>
      <Card.Footer style={{textAlign: "center"}}>
        Recipes Created: {brewer.recipes.length}
      </Card.Footer>
    </Card>
 </LinkContainer>
  )
}
export default BrewerCard