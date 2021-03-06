import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";
import RecipeForm from './RecipeForm';
import AllRecipes from "./AllRecipes";
import Profile from '../components/Profile'
import Recipe from '../components/Recipe'
import Brewer from './Brewer'
import Brewers from './Brewers'
import NoRoute from '../components/NoRoute'
import { Container } from 'react-bootstrap';
import { connect, useSelector } from 'react-redux';
import StylesList from './styles-ingredients/StylesList';
import FermentablesList from './styles-ingredients/FermentablesList';
import HopsList from './styles-ingredients/HopsList';
import YeastsList from './styles-ingredients/YeastsList';

const MainContainer = props => {

  const user = useSelector(state => state.user)
  const recipes = useSelector(state => state.recipes)
  const styles = useSelector(state => state.styles)
  const fermentables = useSelector(state => state.fermentables)
  const hops = useSelector(state => state.hops)
  const yeasts = useSelector(state => state.yeasts)


  const [brewers, setBrewers] = useState([])

    return(
        <div className='main'>
          <Container className="main-container" fluid >        
            <Switch>
              <Route exact path="/" render={() => (
                <AllRecipes 
                  recipes={recipes}
                />)}
              />
              {/* <Route path="/profile" component={Profile}/> */}
              <Route path="/profile" render={() => <Profile notReduxUser={props.notReduxUser}/>}/> 
              <Route exact path="/brewers" render={() => <Brewers brewers={brewers} setBrewers={setBrewers}/>}/>
              
              <Route exact path="/styles" component={StylesList}/>
              <Route path="/styles/:slug" render={(routerProps) => {
                let style = styles.find(s => s.id == routerProps.match.params.slug)
                return (style ? <StylesList id={style.id} /> : null)
              }}/>

              <Route path="/fermentables" component={FermentablesList}/>
              <Route path="/fermentables/:slug" render={(routerProps) => {
                let fermentable = fermentables.find(s => s.id == routerProps.match.params.slug)
                return (fermentable ? <FermentablesList id={fermentable.id} /> : null)
              }}/>

              <Route exact path="/hops" component={HopsList}/>
              <Route path="/hops/:slug" render={(routerProps) => {
                let hop = hops.find(s => s.id == routerProps.match.params.slug)
                return (hop ? <HopsList id={hop.id} /> : null)
              }}/>

              <Route exact path="/yeast" component={YeastsList}/>
              <Route path="/yeast/:slug" render={(routerProps) => {
                let yeast = yeasts.find(s => s.id == routerProps.match.params.slug)
                return (yeast ? <YeastsList id={yeast.id} /> : null)
              }}/>
              
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
    recipes: state.recipes,
    styles: state.styles,
    fermentables: state.fermentables,
    hops: state.hops,
    yeasts: state.yeasts
  }
}
export default connect(mapStateToProps)(MainContainer)