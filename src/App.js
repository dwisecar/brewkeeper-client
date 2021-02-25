import React from 'react'
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createStore } from 'redux';
import RecipeForm from './containers/RecipeForm';
import AllRecipes from "./containers/AllRecipes";
import Profile from './containers/Profile'
import Ingredients from './containers/Ingredients';
import LowerNavBar from './components/LowerNavBar';
import Recipe from './containers/Recipe'
import Brewer from './containers/Brewer'
import Brewers from './containers/Brewers'
import Styles from './containers/Styles'
import NoRoute from './components/NoRoute'

class App extends React.Component {

  state = {
    user: false,
    recipes: [],
    brewers: []
  }

  componentDidMount() {
    const token = localStorage.token
    token ? this.persistUser(token) : this.fetchRecipes()
  }

  fetchRecipes = () => {
    fetch("http://localhost:3000/recipes").then(res => res.json()).then(data => this.setState({recipes: data}))
  }

  userSignIn = (e) => {
    e.preventDefault();
    let form = e.target;
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    })
      .then((resp) => resp.json())
      .then((user) => {
        if (user["status"] === 400) {
          alert(user["error"])
        } else {
          form.reset();
          this.setState(
            {
              user: user.user,
            },
            () => {
              this.fetchRecipes()
            }
          );
          localStorage.setItem("token", user.jwt)
        }
      })
  }

  userSignUp = (e) => {
    e.preventDefault();
    let form = e.target;
    fetch("http://localhost:3000/api/v1/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    })
      .then((resp) => resp.json())
      .then((user) => {
        if (user["status"] === 500) {
          alert(user["error"])
        } else {
          form.reset();
          this.setState(
            {
              user: user.user,
            },
            () => {
              this.fetchRecipes()
            }
          );
          localStorage.setItem("token", user.jwt);
        }
      })
  }

  //persisting a user when revisitng the web page
  persistUser = (token) => {
    fetch("http://localhost:3000/api/v1/persist", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((user) =>
        this.setState(
          {
            user: user,
          },
          () => {
            this.fetchRecipes()
          }
        )
      )
  }

  //handle editing username
  handleEdit = (e) => {
    e.preventDefault();
    let form = e.target;
    let token = localStorage.token;
    let newUsername = e.target.username.value;
    console.log(e.target.username.value);
    fetch(`http://localhost:3000/api/v1/editname`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Accepts: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: newUsername,
        user_id: this.state.user.id,
      }),
    }).then(
      this.setState(
        {
          user: {
            recipies: this.state.user.recipies,
            id: this.state.user.id,
            username: newUsername,
          },
        },
        () => {
          form.reset()
        }
      )
    )
  }

  handleSearch = e => {
    e.preventDefault()
    console.log(e.target.search.value)
  }

  handleLogout = () => {
    localStorage.clear();
    this.setState({ user: false })
  }

  addNewRecipe = recipe => {
    this.setState({recipes: [...this.state.recipes, recipe]})
  }


  render() {
    return(
      <Router>
        <div className='main'>
          <NavBar user={this.state.user} signIn={this.userSignIn} signUp={this.userSignUp} signOut={this.handleLogout} handleEdit={this.handleEdit} handleSearch={this.handleSearch}/>
          <LowerNavBar user={this.state.user}/>
          <Switch>
            <Route exact path="/" render={() => (<AllRecipes recipes={this.state.recipes}/>)}/>
            <Route path="/profile" render={() => (<Profile user={this.state.user}/>)}/>
            <Route exact path="/brewers" component={Brewers}/>
            <Route path="/styles" component={Styles}/>
            <Route path="/ingredients" component={Ingredients}/>
            <Route path="/recipes/new" render={() => <RecipeForm user={this.state.user} addNewRecipe={this.addNewRecipe}/>}/>

            <Route path="/recipes/:slug" render={(routerProps) => {
              let recipe = this.state.recipes.find(recipe => recipe.id == routerProps.match.params.slug)
              return (recipe ? <Recipe user={this.state.user} recipe={recipe}/> : null)
            }}/>

            <Route path="/brewers/:slug" render={(routerProps) => {
              let brewer = this.state.brewers.find(brewer => brewer.id == routerProps.match.params.slug)
              return <Brewer brewer={brewer}/>
            }}/>

            <Route exact path="/signout" />
            <Route component={NoRoute}/>
          </Switch>
          
          
        </div>
      </Router>
    )
  }
}

export default App;
