import React from 'react'
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore } from 'redux';
import RecipeForm from './containers/RecipeForm';

class App extends React.Component {

  state = {
    user:false,
    recipes: []

  }

  componentDidMount() {
    const token = localStorage.token
    token ? this.persistUser(token) : console.log("no token")
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
              //fetch recipies
              console.log(user, 'signed in the house')
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
              console.log(user, 'signed up in the house')
              //fetch recipies
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
            console.log(user, 'in the house')
            // fetch recipies
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


  render() {
    return(
      <Router>
        <div className='main'>
          <NavBar user={this.state.user} signIn={this.userSignIn} signUp={this.userSignUp} signOut={this.handleLogout} handleEdit={this.handleEdit} handleSearch={this.handleSearch}/>
          <RecipeForm user={this.state.user}/>
        </div>
      </Router>
    )
  }
}

export default App;
