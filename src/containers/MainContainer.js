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
import Icon from '@material-ui/core/Icon';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const MainContainer = () => {

  const recipes = useSelector(state => state.recipes)
  const styles = useSelector(state => state.styles)
  const fermentables = useSelector(state => state.fermentables)
  const hops = useSelector(state => state.hops)
  const yeasts = useSelector(state => state.yeasts)
  const brewers = useSelector(state => state.brewers)

  const ProtectedRoute = ({ component, ...args }) => (
    <Route component={withAuthenticationRequired(component)} {...args} />
  );

    return(
        <div className='main'>
          <Container className="main-container" fluid >      
            <Switch>
              <Route exact path="/" render={() => (
                <AllRecipes 
                  recipes={recipes}
                />)}
              />
              <ProtectedRoute path="/profile" component={Profile}/> 
              <Route exact path="/brewers" component={Brewers}/>
              
              <Route exact path="/styles" component={StylesList}/>
              <Route path="/styles/:slug" render={(routerProps) => {
                let style = styles.find(s => s.id === parseInt(routerProps.match.params.slug))
                console.log(style)
                return (style ? <StylesList id={style.id} /> : null)
              }}/>

              <Route path="/fermentables" component={FermentablesList}/>
              <Route path="/fermentables/:slug" render={(routerProps) => {
                let fermentable = fermentables.find(s => s.id === parseInt(routerProps.match.params.slug))
                return (fermentable ? <FermentablesList id={fermentable.id} /> : null)
              }}/>

              <Route exact path="/hops" component={HopsList}/>
              <Route path="/hops/:slug" render={(routerProps) => {
                let hop = hops.find(s => s.id === parseInt(routerProps.match.params.slug))
                return (hop ? <HopsList id={hop.id} /> : null)
              }}/>

              <Route exact path="/yeast" component={YeastsList}/>
              <Route path="/yeast/:slug" render={(routerProps) => {
                let yeast = yeasts.find(s => s.id === parseInt(routerProps.match.params.slug))
                return (yeast ? <YeastsList id={yeast.id} /> : null)
              }}/>
              
              <ProtectedRoute path="/recipes/new" component={RecipeForm}/>

              <Route path="/recipes/:slug" render={(routerProps) => {
                let recipe = recipes.find(recipe => recipe.id === parseInt(routerProps.match.params.slug))
                return (recipe ? <Recipe recipeId={recipe.id} /> : null)
              }}/>

              <Route path="/brewers/:slug" render={(routerProps) => {
                let brewer = brewers.find(brewer => brewer.id === parseInt(routerProps.match.params.slug))
                return (brewer ? <Brewer brewerId={brewer.id}/> : null )
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
    yeasts: state.yeasts,
    brewers: state.brewers
  }
}
export default connect(mapStateToProps)(MainContainer)