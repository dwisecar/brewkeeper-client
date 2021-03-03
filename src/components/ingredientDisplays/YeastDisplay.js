import React from 'react'

const YeastDisplay = ({item}) => {

  return (
    <div className='item-display-container'>
      <h3>{item.name}</h3>
        <p>{item.description}</p>
        <ul>
          <li>Attenuation: {item.attenuation_min} - {item.attenuation_max}</li>
          <li>Fermentation Temp: {item.ferment_temp_min}°F - {item.ferment_temp_max}°F</li>
          <li>Alcohol Tolerance: {item.alcohol_tolerance_min} - {item.alcohol_tolerance_max}</li>
          <li>Supplier: {item.supplier}</li>
        </ul>
    </div>
  )
}
export default YeastDisplay