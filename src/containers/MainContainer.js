import React, { useState, useEffect } from 'react'
import NavBar from "../components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";
import RecipeForm from './RecipeForm';
import AllRecipes from "./AllRecipes";
import Profile from './Profile'
import FermentablesDetails from './FermentablesDetails';
import HopsDetails from "./HopsDetails"
import YeastDetails from "./YeastDetails"
import Recipe from './Recipe'
import Brewer from './Brewer'
import Brewers from './Brewers'
import Styles from './Styles'
import NoRoute from '../components/NoRoute'
import { Container } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';


const MainContainer = props => {

  const user = useSelector(state => state.user)
  const recipes = useSelector(state => state.recipes)

  const [brewers, setBrewers] = useState([])

    return(
        <div className='main'>
          <NavBar 
            signIn={props.userSignIn} 
            signUp={props.userSignUp} 
            signOut={props.handleLogout} 
            handleEdit={props.handleEdit} 
            handleSearch={props.handleSearch}/>
          <Container className="main-container" >
            
            <Switch>
              <Route exact path="/" render={() => (
                <AllRecipes 
                  recipes={recipes}
                />)}
              />
              <Route path="/profile" component={Profile}/>
              <Route exact path="/brewers" render={() => <Brewers brewers={brewers} setBrewers={setBrewers}/>}/>
              <Route path="/styles" component={Styles}/>
              <Route path="/fermentables" component={FermentablesDetails}/>
              <Route path="/hops" component={HopsDetails}/>
              <Route path="/yeast" component={YeastDetails}/>
              
              <Route path="/recipes/new" render={() => (
                <RecipeForm 
                  user={user} 
                  addNewRecipe={props.addNewRecipe}
                />)}
              />

              <Route path="/recipes/:slug" render={(routerProps) => {
                let recipe = recipes.find(recipe => recipe.id == routerProps.match.params.slug)
                return (recipe ? <Recipe recipeId={recipe.id} /> : null)
              }}/>

              <Route path="/brewers/:slug" render={(routerProps) => {
                let brewer = brewers.find(brewer => brewer.id == routerProps.match.params.slug)
                return <Brewer brewerId={brewer.id}/>
              }}/>

              <Route exact path="/signout" />
              <Route component={NoRoute}/>
            </Switch>
          </Container>
        </div>      
    )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    recipes: state.recipes
  }
}
export default connect(mapStateToProps)(MainContainer)