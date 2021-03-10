import React from 'react'

const FermentableDisplay = ({item}) => {
  return (
    <div className='item-display-container'>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <ul>
        <li>SRM: {item.srm_id}°L</li>
        <li>Potential: {item.potential}</li>
        <li>Moisture Content: {item.moisture_content}</li>
        <li>Course-Fine Difference: {item.course_fine_difference}</li>
        <li>Dry Yield: {item.dry_yield}</li>
        <li>Protein: {item.protein}</li>
      </ul>
    </div>
  )
}


export default FermentableDisplay