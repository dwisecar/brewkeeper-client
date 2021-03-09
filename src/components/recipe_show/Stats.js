import React from 'react'


const Stats = ({recipe}) => {

  return (
    <div className="recipe-stats">
      <h5>Batch Size: {recipe.volume} Gallons</h5><br></br>
      <p>OG: {recipe.og}</p>
      <p>FG: {recipe.fg}</p>
      <p>ABV: {recipe.abv}%</p>
      <p>IBU: {recipe.ibu}</p>
      <p>SRM: {recipe.srm}° L</p>
      <p>(Estimates based on 72% efficiency)</p>
    </div>
  )
}
export default Stats