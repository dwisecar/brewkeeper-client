import React from 'react'


const Stats = ({recipe}) => {

  return (
    <div className="recipe-stats">
      <h5>Stats</h5>
      <p>OG: {recipe.og}</p>
      <p>FG: {recipe.fg}</p>
      <p>ABV: {recipe.abv}%</p>
      <p>IBU: {recipe.ibu}</p>
      <p>SRM: {recipe.srm}° L</p>
    </div>
  )
}
export default Stats