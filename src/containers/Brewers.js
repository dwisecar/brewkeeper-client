import React from 'react'
import {Container, CardDeck, Form} from "react-bootstrap";
import BrewerCard from '../components/BrewerCard';

class Brewers extends React.Component {

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/brewers")
      .then(res => res.json())
      .then(data => this.props.setBrewers(data))   
  }

  render() {
    return(
      <Container className="all-recipes">
        <h4>Brewers</h4>
        <CardDeck>
          {this.props.brewers.map((brewer, idx) => <BrewerCard key={idx} brewer={brewer}/>)}
        </CardDeck>
      </Container>
  )}
}

export default Brewers