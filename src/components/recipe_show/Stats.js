import React, { useEffect, useState } from 'react'


const Stats = ({recipe}) => {

  return (
    <div className="recipe-stats">
      <h5>Stats</h5>
      <p>OG: {recipe.original_gravity}</p>
      <p>FG: {recipe.final_gravity}</p>
      <p>ABV: {recipe.abv}%</p>
      <p>IBU: {recipe.ibu}</p>
      <p>SRM: {recipe.srm}° L</p>
    </div>
  )
}
export default Stats