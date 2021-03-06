import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import brown from '../../assets/images/brown.png'
import paleAle from '../../assets/images/pale-ale.png'
import paleTall from '../../assets/images/pale-tall.png'
import pilsner from '../../assets/images/pilsner.png'
import redShort from '../../assets/images/red-short.png'
import redTall from '../../assets/images/red-tall.png'
import stout from '../../assets/images/stout.png'

const StyleDisplay = ({item}) => {

  const [beerImg, setBeerImg] = useState() 
  useEffect(()=> {
    beerImage(item.image)
  }, [item])

  const beerImage = (img) => {
    switch (img) {
      case "brown":
        setBeerImg(brown);
        break;
      case "pale-ale":
        setBeerImg(paleAle);
        break;
      case "pale-tall":
        setBeerImg(paleTall);
        break;
      case "pilsner":
        setBeerImg(pilsner);
        break;
      case "red-short":
        setBeerImg(redShort);
        break;
      case "stout":
        setBeerImg(stout);
        break;
      case "red-tall":
        setBeerImg(redTall);
        break;
      default:
        setBeerImg(paleTall);
        break;
    }
  }


  return (
    <Container className='item-display-container'>
      <Row>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </Row>
      <Row>
        <Col>
          <ul>
            <li>ABV Range: {item.abv_min}% - {item.abv_max}%</li>
            <li>IBU Range: {item.ibu_min} - {item.ibu_max}</li>
            <li>SRM Range: {item.srm_min}°L - {item.srm_max}°L</li>
            <li>FG Range: {item.fg_min} - {item.fg_max}</li>
          </ul>
        </Col>
        <Col>
          <img src={beerImg} alt="beer-style" />
        </Col>
      </Row>
    </Container>
  )
}


export default StyleDisplay