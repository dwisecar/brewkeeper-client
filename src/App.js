import React, { useEffect } from 'react'
import Layout from "./containers/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./Sidebar.scss";
import { BrowserRouter } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const dispatch = useDispatch()
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    fetchRecipes()
    setUser()
  }, [isAuthenticated])

  const setUser = () => {
    isAuthenticated ? dispatch({
      type: "CHANGE_USER",
      value: user
    }) :
    dispatch({
      type: "CHANGE_USER",
      value: false
    }) 
    console.log(user)
  }

  const fetchRecipes = () => {
    fetch("https://brewkeeper-api.herokuapp.com/recipes")
    .then(res => res.json())
    .then(data => (
      dispatch({
        type: "SET_RECIPES",
        value: data
      }),
      fetchBrewers()
    ))
  }

  const fetchBrewers = () => {
    fetch("https://brewkeeper-api.herokuapp.com/api/v1/brewers")
      .then(res => res.json())
      .then(data => (
        dispatch({
          type: "SET_BREWERS",
          value: data
        }),
        fetchDetails()
      ))  
  }

  const fetchDetails = () => {
    fetch("https://brewkeeper-api.herokuapp.com/styles").then(res => res.json()).then(data1 => dispatch({type: "SET_STYLES", value: data1}))
    .then(fetch("https://brewkeeper-api.herokuapp.com/fermentables").then(res => res.json()).then(data2 => dispatch({type: "SET_FERMENTABLES", value: data2}))
    .then(fetch("https://brewkeeper-api.herokuapp.com/hops").then(res => res.json()).then(data3 => dispatch({type: "SET_HOPS", value: data3}))
    .then(fetch("https://brewkeeper-api.herokuapp.com/yeasts").then(res => res.json()).then(data4 => dispatch({type: "SET_YEASTS", value: data4})))))
  }

  return(
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
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

export default connect(mapStateToProps)(App)
