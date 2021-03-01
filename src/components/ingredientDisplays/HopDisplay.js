import React, { useState } from 'react'
import { Container, ListGroup } from 'react-bootstrap'
import { connect, useSelector } from 'react-redux'

const HopDisplay = ({item}) => {

  return (
    <div className='item-display-container'>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <ul>
        <li>Country of Origin: {item.country_of_origin}</li>
        <li>Alpha Acid: {item.alpha_acid_min}</li>
        <li>Beta Acid: {item.beta_acid_min} - {item.beta_acid_max}</li>
        <li>Humulene Range: {item.humulene_min} - {item.humulene_max}</li>
        <li>Caryophyllene Range: {item.caryophyllene_min} - {item.caryophyllene_max}</li>
        <li>Cohumulone Range: {item.cohumulone_min} - {item.cohumulone_max}</li>
        <li>Myrcene Range: {item.myrcene_min} - {item.myrcene_max}</li>
        <li>Farnesene Range: {item.farnesene_min} - {item.farnesene_max}</li>
      </ul>
    </div>
  )
}


export default HopDisplay