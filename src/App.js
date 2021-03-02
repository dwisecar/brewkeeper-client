import React from 'react'
import Layout from "./containers/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter } from 'react-router-dom';


class App extends React.Component {

  render() {
    return(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    )
  }
}

export default App;
