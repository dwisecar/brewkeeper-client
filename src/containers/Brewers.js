import React from 'react'
import {Container, CardDeck, Spinner} from "react-bootstrap";
import BrewerCard from '../components/BrewerCard';
import { connect, useSelector } from 'react-redux'; 

const Brewers = () => {

  const brewers = useSelector(state => state.brewers)

  return brewers ? (
    <Container className="all-recipes">
      <h4>Brewers</h4>
      <CardDeck>
        {brewers.map((brewer, idx) => <BrewerCard key={idx} brewer={brewer}/>)}
      </CardDeck>
    </Container>
  ) : (<Container> <Spinner animation="border" variant="secondary" /> </Container>)
}

const mapStateToProps = state => {
  return {
    brewers: state.brewers
  }
}
export default connect(mapStateToProps)(Brewers)