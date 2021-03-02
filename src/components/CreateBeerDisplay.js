import React from 'react'
import pale from '../images/pale-beer.png'
import red from '../images/red-beer.png'
import brown from '../images/brown-beer.png'
import dark from '../images/dark-beer.png'

const CreateBeerDisplay = ({lovibond, hops}) => {

  const imageColor = () => {
    switch (lovibond) {
      case lovibond > 10:
        return red
      case lovibond > 25:
        return brown  
      case lovibond > 35:
        return dark
      default: 
        return pale
        break;
    }
  }

  return (
    <div>
      <img src={imageColor()} alt="created-beer"></img>
    </div>
  )
}
export default CreateBeerDisplay