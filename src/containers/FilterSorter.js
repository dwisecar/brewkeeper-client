import React from 'react'
import {Container, CardDeck, Form, CardColumns} from "react-bootstrap";
import { connect, useSelector, useDispatch } from "react-redux";

const FilterSorter = ({handleFilter, handleSort}) => {

  const styles = useSelector(state => state.styles)
  const fermentables = useSelector(state => state.fermentables)
  const hops = useSelector(state => state.hops)
  const yeasts = useSelector(state => state.yeasts)


  return(
    <Form>
      <h4>Filter Options</h4>
      <Form.Row>
        <Form.Label>Style</Form.Label>
        <Form.Control as="select" name="select-name" onChange={(e) => {
          
          handleFilter(e, "style")
          }}>
          <option value={null}>All</option>
          {styles.map(item => <option value={item.id}>{item.name}</option>)}
        </Form.Control>
      </Form.Row><br></br>

      <Form.Row>
        <Form.Label>Fermentables</Form.Label>
        <Form.Control as="select" name="select-name" onChange={(e) => {
          
          handleFilter(e, "fermentable")
          }}>
          <option value={null}>All</option>
          {fermentables.map(item => <option value={item.id}>{item.name}</option>)}
        </Form.Control>
      </Form.Row><br></br>

      <Form.Row>
        <Form.Label>Hops</Form.Label>
        <Form.Control as="select" name="select-name" onChange={(e) => {
          
          handleFilter(e, "hop")
          }}>
          <option value={null}>All</option>
          {hops.map(item => <option value={item.id}>{item.name}</option>)}
        </Form.Control>
      </Form.Row><br></br>

      <Form.Row>
        <Form.Label>Yeast</Form.Label>
        <Form.Control as="select" name="select-name" onChange={(e) => {
         
          handleFilter(e, "yeast")
          }}>
          <option value={null}>All</option>
          {yeasts.map(item => <option value={item.id}>{item.name}</option>)}
        </Form.Control>
      </Form.Row><br></br>

      <Form.Row>
        <Form.Label>Sort By</Form.Label>
        <Form.Control as="select" name="select-name" onChange={(e) => handleSort(e)}>
          <option value={"recent"}>Most Recent</option>
          <option value={"rated"}>Highest Rated</option>
          <option value={"oldest"}>Oldest</option>
        </Form.Control>
      </Form.Row>
    </Form>
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
export default connect(mapStateToProps)(FilterSorter)