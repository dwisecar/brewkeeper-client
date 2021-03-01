import React, { useState } from 'react'
import { Container, ListGroup, NavItem } from 'react-bootstrap'
import { connect, useSelector } from 'react-redux'

const StyleDisplay = ({item}) => {

  return (
    <div className='item-display-container'>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <ul>
        <li>ABV Range: {item.abv_min}% - {item.abv_max}%</li>
        <li>IBU Range: {item.ibu_min} - {item.ibu_max}</li>
        <li>SRM Range: {item.srm_min}°L - {item.srm_max}°L</li>
        <li>FG Range: {item.fg_min} - {item.fg_max}</li>
      </ul>
    </div>
  )
}


export default StyleDisplay