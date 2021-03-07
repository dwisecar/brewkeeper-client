import React, { useEffect, useState } from 'react';
import SideBar from './SideBar'
import MainContainer from "./MainContainer"
import { connect, useDispatch } from 'react-redux';
import NavBar from "../components/NavBar";

function Layout() {
  
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.token
    token ? persistUser(token) : fetchRecipes()
  }, [])

  const fetchRecipes = () => {
    fetch("https://brewkeeper-api.herokuapp.com/recipes")
    .then(res => res.json())
    .then(data => (
      dispatch({
        type: "SET_RECIPES",
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

  const userSignIn = (e) => {
    e.preventDefault();
    let form = e.target;
    fetch("https://brewkeeper-api.herokuapp.com/api/v1/login", {
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
      .then(data => {
        if (data["error"]) {
          alert(data["error"])
        } 
        else {
          dispatch({
            type: "CHANGE_USER",
            value: data.user
          })
          form.reset()
          fetchRecipes()
          localStorage.setItem("token", data.jwt)
        }
      })
  }

  const userSignUp = (e) => {
    e.preventDefault();
    let form = e.target;
    fetch("https://brewkeeper-api.herokuapp.com/api/v1/signup", {
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
      .then(data => {
        if (data["error"]) {
          alert(data["error"])
        } else {
          dispatch({
            type: "CHANGE_USER",
            value: data.user
          })
          form.reset()
          fetchRecipes()
          localStorage.setItem("token", data.jwt)
        }
      })
  }

  //persisting a user when revisitng the web page
  const persistUser = (token) => {
    fetch("https://brewkeeper-api.herokuapp.com/api/v1/persist", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({
          type: "CHANGE_USER",
          value: data
        })
        fetchRecipes()
      }
    )
  }

  const handleLogout = () => {
    localStorage.clear();
    dispatch({
      type: "CHANGE_USER",
      value: false
    })
  }

  //sidebar controlls
  const [rtl, setRtl] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(true);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = (checked) => {
    setCollapsed(checked);
  };

  const handleRtlChange = (checked) => {
    setRtl(checked);
  };
  const handleImageChange = (checked) => {
    setImage(checked);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return(      
    <div className={`app ${rtl ? 'rtl' : ''} ${toggled ? 'toggled' : ''}`}>
      <SideBar
        image={image}
        collapsed={collapsed}
        rtl={rtl}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
      />
      <NavBar 
        signIn={userSignIn} 
        signUp={userSignUp} 
        signOut={handleLogout} 
      />

      <MainContainer className="content-display"
        image={image}
        toggled={toggled}
        collapsed={collapsed}
        rtl={rtl}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
        handleRtlChange={handleRtlChange}
        handleImageChange={handleImageChange}
      />

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

export default connect(mapStateToProps)(Layout)