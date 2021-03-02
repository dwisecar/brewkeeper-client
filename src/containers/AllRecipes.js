import React, { useEffect, useState } from 'react'
import {Container, CardDeck, Form, CardColumns} from "react-bootstrap";
import RecipeCard from '../components/RecipeCard';
import FilterSorter from './FilterSorter'
import { connect, useSelector } from "react-redux";

const AllRecipes = () => {

  const [filter, setFilter] = useState({style: "All", fermentable: "All", hop: "All", yeast: "All"})
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [sort, setSort] = useState("recent")
  
  const recipes = useSelector(state => state.recipes)

  function handleFilter(e, type) {
    setFilter({
      ...filter,
      [type]: e.target.value
    })
  }

  function handleSort(e) {
    setSort(e.target.value)
    doIt(e.target.value)
  }

  useEffect(() => {
    doIt(sort)
  }, [filter, recipes])

  function doIt (e) {
    let f_rec = recipes
    for (const [k,v] of Object.entries(filter)) {
      if(k === "style") {filter.style !== "All" && (f_rec = f_rec.filter(r => r.styles[0].id == filter.style))}
      if(k === "fermentable") {filter.fermentable !== "All" && (f_rec = f_rec.filter(r => r.recipe_fermentables.some(re => re.fermentable_id == filter.fermentable)))}
      if(k === "hop") {filter.hop !== "All" && (f_rec = f_rec.filter(r => r.recipe_hops.some(re => re.hop_id == filter.hop)))}
      if(k === "yeast") {filter.yeast !== "All" && (f_rec = f_rec.filter(r => r.recipe_yeasts.some(re => re.yeast_id == filter.yeast)))}     
    }
    switch (e) {
      case "oldest":
        return setFilteredRecipes(f_rec.sort((a,b) => Date.parse(a.created_at) - Date.parse(b.created_at)))
      case "rated":
        return setFilteredRecipes(f_rec.sort((a,b) => b.average_rating - a.average_rating))
      case "recent":
        return setFilteredRecipes(f_rec.sort((a,b) => Date.parse(b.created_at) - Date.parse(a.created_at)))
      default:
        break;
    }
  }

  

  return(
    <>
    <Container className="all-recipes">
      <CardDeck>      
        {filteredRecipes.map((recipe, idx) => <RecipeCard key={idx} recipe={recipe}/>)}
      </CardDeck>
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