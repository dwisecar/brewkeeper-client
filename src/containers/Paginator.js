import React from 'react'
import { Button } from 'react-bootstrap'

const Paginator = ({ totalRecipes, paginate, nextPage, previousPage, currentPage }) => {

  const pageNumbers = []
  for(let i = 1; i <= Math.ceil(totalRecipes / 12); i++){
    pageNumbers.push(i)
  }

  return(
    <nav>
        <ul className="pagination justify-content-center">
            <li className="page-item">
                {currentPage > 1 ? 
                <a className="page-link" onClick={() => previousPage()}>Previous</a> : 
                null}
            </li>
            {pageNumbers.map(num => (
                <li className="page-item" key={num}>
                    <a onClick={() => paginate(num)} className="page-link">{num}</a>
                </li>
            ))}
            <li className="page-item">
              {currentPage == pageNumbers.length ? 
                null :
                <a className="page-link" onClick={() => nextPage()}>Next</a>}
            </li>
        </ul>
    </nav>
  )

}
export default Paginator