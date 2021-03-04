import React, { StrictMode } from 'react'
import pale from '../assets/images/pale-beer.png'
import red from '../assets/images/red-beer.png'
import brown from '../assets/images/brown-beer.png'
import dark from '../assets/images/dark-beer.png'

const CreateBeerDisplay = ({srm, ibu}) => {

  const imageColor = (srm) => {
    switch (srm) {
      case srm > 10:
        return red
      case srm > 25:
        return brown  
      case srm > 35:
        return dark
      default: 
        return pale
        break;
    }
  }

  return (
    <div className="create-beer-display">
      <img src={imageColor(srm)} alt="created-beer"></img>
    </div>
  )
}
export default CreateBeerDisplay