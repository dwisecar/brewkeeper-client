import React from "react";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import MultiInputs from "../components/forms/MultiInputs";
import HopInputs from "../components/forms/HopInputs"
import { useHistory } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";

function RecipeForm(){
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const styles = useSelector(state => state.styles)
  const fermentables = useSelector(state => state.fermentables)
  const hops = useSelector(state => state.hops)
  const yeasts = useSelector(state => state.yeasts)
  
  const [recipeName, setRecipeName] = useState("Untitled")
  const [batchSize, setBatchSize] = useState(5.5)
  const [selectedStyle, setSelectedStyle] = useState({ id: 1 })
  const [selectedFermentables, setSelectedFermentables] = useState([{ id:1, amount: 0 }])
  const [selectedHops, setSelectedHops] = useState([{ id: 1, amount: 0, additionTime: 60, boilAddition: true}])
  const [selectedYeasts, setSelectedYeasts] = useState([{id: 1, amount: 1}])
  const [instructions, setInstructions] = useState('')
  const [notes, setNotes] = useState('')

  let history = useHistory();

  const handleCreateRecipe = e => {
    e.preventDefault()
    const recipe = {
      user_id: user.id,
      name: recipeName,
      volume: parseFloat(batchSize),
      style: selectedStyle,
      fermentables: selectedFermentables,
      hops: selectedHops, 
      yeasts: selectedYeasts,
      instructions: instructions,
      notes: notes
    }
    fetch("http://localhost:3000/recipes", {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(recipe)
    }).then(res => res.json())
    .then(recipe => {
      dispatch({
        type: "ADD_RECIPE",
        value: recipe
      })
      history.push(`/recipes/${recipe.id}`)
    })
  }
  
  return (
    <Form onSubmit={handleCreateRecipe}>
      <h2>Create A Homebrew Recipe</h2>
      <Form.Group controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          className="recipe-name-input"
          name="name"
          type="text"
          placeholder="Recipe Name"
          onChange={(e) => setRecipeName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicStyles">
        <Form.Label>Style</Form.Label>
        <Form.Control as="select" name="style" onChange={(e) => setSelectedStyle({id: e.target.value})}>
          {styles.map(style => <option value={style.id}>{style.name}</option>)}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formBasicSize">
        <Form.Label>Batch Size (Gallons)</Form.Label>
        <Form.Control
          className="recipe-name-input"
          name="name"
          type="number"
          step='0.1'
          defaultValue={5.5}
          onChange={(e) => setBatchSize(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicFermentables">
        <Form.Label>Fermentables</Form.Label>
          <MultiInputs 
            items={fermentables} 
            setSelected={setSelectedFermentables}
            selected={selectedFermentables}
          />
      </Form.Group>

      <Form.Group controlId="formBasicHops">
        <Form.Label>Hops</Form.Label>
          <HopInputs 
            items={hops} 
            setSelected={setSelectedHops}
            selected={selectedHops}
          />
      </Form.Group>

      <Form.Group controlId="formBasicYeast">
        <Form.Label>Yeast</Form.Label>
          <MultiInputs 
            items={yeasts} 
            setSelected={setSelectedYeasts}
            selected={selectedYeasts}
          />
      </Form.Group>

      <Form.Group controlId="formBasicInstructions">
        <Form.Label>Instructions</Form.Label>
        <Form.Control
          className="recipe-instructions"
          name="instructions"
          as="textarea"
          rows="3"
          placeholder="Mash schedule, fermentation time, ect..."
          onChange={(e) => setInstructions(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicNotes">
        <Form.Label>Notes</Form.Label>
        <Form.Control
          className="recipe-instructions"
          name="instructions"
          as="textarea"
          rows="3"
          placeholder="Additional information..."
          onChange={(e) => setNotes(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">Submit</Button>
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

export default connect(mapStateToProps)(RecipeForm)