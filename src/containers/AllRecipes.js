import React, { useEffect, useState } from 'react'
import {Container, CardDeck, Form} from "react-bootstrap";
import RecipeCard from '../components/RecipeCard';
import { connect, useSelector, useDispatch } from "react-redux";

const AllRecipes = ({recipes}) => {

  const [filter, setFilter] = useState(null)
  const [filteredRecipes, setFilteredRecipes] = useState([])

  const styles = useSelector(state => state.styles)
  const fermentables = useSelector(state => state.fermentables)
  const hops = useSelector(state => state.hops)
  const yeasts = useSelector(state => state.yeasts)

  const Filterer = () => {
    return (
      <Form>
        <Form.Control as="select" name="select-name" onChange={(e) => handleStyleChange(e)}>
          <option value={null}>All</option>
          {styles.map(item => <option value={item.id}>{item.name}</option>)}
        </Form.Control>
      </Form>
    )
  }

  function handleStyleChange(e) {
    if (e.target.value) {
      setFilter(e.target.value) 
      
      setFilteredRecipes(recipes.filter(r => r.styles[0].id == e.target.value))
    }
    else {   
      setFilter(null)
    }
  }
 

  return(
    <Container className="all-recipes">
      <Filterer />
      <CardDeck>
        {filter ? filteredRecipes.map((recipe, idx) => <RecipeCard key={idx} recipe={recipe}/>) : 
        recipes.map((recipe, idx) => <RecipeCard key={idx} recipe={recipe}/>)}
      </CardDeck>
    </Container>
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