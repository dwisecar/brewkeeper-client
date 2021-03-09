import React, { useEffect, useState } from 'react'
import {Container, CardDeck, Row} from "react-bootstrap";
import RecipeCard from '../components/RecipeCard';
import FilterSorter from './FilterSorter'
import { connect, useSelector } from "react-redux";
import Paginator from './Paginator'

const AllRecipes = () => {

  const [filter, setFilter] = useState({style: "All", fermentable: "All", hop: "All", yeast: "All"})
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [sort, setSort] = useState("recent")
 
  const [recipesPerPage, setRecipesPerPage] = useState(12)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentRecipes, setCurrentRecipes] = useState([])
  useEffect(() => {
    setCurrentRecipes(filteredRecipes.slice(indexOfFirstPost, indexOfLastPost))
  }, [currentPage, filteredRecipes])
  
  const recipes = useSelector(state => state.recipes)

  useEffect(() => {
    filterizer(sort)
  }, [filter, recipes])

  function handleFilter(e, type) {
    setFilter({
      ...filter,
      [type]: e.target.value
    })
  }

  function handleSort(e) {
    setSort(e.target.value)
    filterizer(e.target.value)
  }

  function filterizer (e) {
    setCurrentPage(1)
    let filteredRecipeList = recipes
    for (const [k] of Object.entries(filter)) {
      if(k === "style") {filter.style !== "All" && (filteredRecipeList = filteredRecipeList.filter(r => r.styles[0].id === parseInt(filter.style)))}
      if(k === "fermentable") {filter.fermentable !== "All" && (filteredRecipeList = filteredRecipeList.filter(r => r.recipe_fermentables.some(re => re.fermentable_id === parseInt(filter.fermentable))))}
      if(k === "hop") {filter.hop !== "All" && (filteredRecipeList = filteredRecipeList.filter(r => r.recipe_hops.some(re => re.hop_id === parseInt(filter.hop))))}
      if(k === "yeast") {filter.yeast !== "All" && (filteredRecipeList = filteredRecipeList.filter(r => r.recipe_yeasts.some(re => re.yeast_id === parseInt(filter.yeast))))}     
    }
    switch (e) {
      case "oldest":
        const sortedOld = filteredRecipeList.sort((a,b) => Date.parse(a.created_at) - Date.parse(b.created_at))
        setFilteredRecipes(sortedOld)
        setCurrentRecipes(sortedOld.slice(indexOfFirstPost, indexOfLastPost))
        break;
      case "rated":
        const sortedRated = filteredRecipeList.sort((a,b) => b.average_rating - a.average_rating)  
        setFilteredRecipes(sortedRated)
        setCurrentRecipes(sortedRated.slice(indexOfFirstPost, indexOfLastPost))
        break;
      case "abv":
        const sortedAbv = filteredRecipeList.sort((a,b) => b.abv - a.abv)  
        setFilteredRecipes(sortedAbv)
        setCurrentRecipes(sortedAbv.slice(indexOfFirstPost, indexOfLastPost))
        break;
      case "recent":
        const sortedRecent = filteredRecipeList.sort((a,b) => Date.parse(b.created_at) - Date.parse(a.created_at))
        setFilteredRecipes(sortedRecent)
        setCurrentRecipes(sortedRecent.slice(indexOfFirstPost, indexOfLastPost))
        break;
      default:
        break;
    }
    setTimeout(() => {
      
    }, 500);
  }

  const paginate = pageNum => setCurrentPage(pageNum)
  const nextPage = () => setCurrentPage(currentPage + 1)
  const previousPage = () => setCurrentPage(currentPage - 1)
  const indexOfLastPost = currentPage * recipesPerPage
  const indexOfFirstPost = indexOfLastPost - recipesPerPage
  

  return(
    <>
    <Container className="all-recipes">
      <h3>All Recipes</h3>
        <CardDeck>             
          {currentRecipes.map((recipe, idx) => <RecipeCard key={idx} recipe={recipe}/>)}           
        </CardDeck>
      <Row className="paginator">
        <Paginator 
          recipesPerPage={recipesPerPage} 
          totalRecipes={filteredRecipes.length} 
          paginate={paginate} 
          nextPage={nextPage} 
          previousPage={previousPage} 
          currentPage={currentPage}/>  
      </Row>
    </Container>
    <Container className="filter-sort-bar">
      <FilterSorter 
        handleFilter={handleFilter}
        handleSort={handleSort}
        />
    </Container>
    </>

  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    recipes: state.recipes,
    styles: state.styles,
    fermentables: state.fermentables,
    hops: state.hops,
    yeasts: state.yeasts
  }
}

export default connect(mapStateToProps)(AllRecipes)