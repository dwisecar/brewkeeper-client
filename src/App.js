import React, { useEffect } from 'react'
import Layout from "./containers/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./Sidebar.scss";
import { BrowserRouter } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    fetchRecipes()
  }, [])

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
