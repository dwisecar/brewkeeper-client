import React from 'react'

const CreateRecipeStats = props => {

  return(
    <>
    <div className='live-recipe-stats'>
      <h3>Stats</h3>
      <p>OG: {props.og}</p>
      <p>FG: {props.fg}</p>
      <p>ABV: {props.abv}%</p>
      <p>IBU: {props.ibu}</p>
      <p>SRM: {props.srm}° L</p>
    </div>
    
    </>
  )
}
export default CreateRecipeStats