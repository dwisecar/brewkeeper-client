import React from "react";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import MultiInputs from "../components/forms/MultiInputs";
import HopInputs from "../components/forms/HopInputs"

function RecipeForm({user}){
  
  const [styles, setStyles] = useState([])
  const [fermentables, setFermentables] = useState([])
  const [hops, setHops] = useState([])
  const [yeasts, setYeasts] = useState([])
  const [recipeName, setRecipeName] = useState("Untitled")
  const [batchSize, setBatchSize] = useState(5.5)
  const [selectedStyle, setSelectedStyle] = useState({ id: 1 })
  const [selectedFermentables, setSelectedFermentables] = useState([{ id:1, amount: 0 }])
  const [selectedHops, setSelectedHops] = useState([{ id: 1, amount: 0, additionTime: 60, boilAddition: true}])
  const [selectedYeasts, setSelectedYeasts] = useState([{id: 1, amount: 1}])
  const [instructions, setInstructions] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    fetch("http://localhost:3000/styles").then(res => res.json()).then(data1 => setStyles(data1))
    .then(fetch("http://localhost:3000/fermentables").then(res => res.json()).then(data2 => setFermentables(data2))
    .then(fetch("http://localhost:3000/hops").then(res => res.json()).then(data3 => setHops(data3))
    .then(fetch("http://localhost:3000/yeasts").then(res => res.json()).then(data4 => setYeasts(data4)))))
  }, [])


  const handleCreateRecipe = e => {
    e.preventDefault()
    const recipe = {
      user: user.id,
      name: recipeName,
      batchSize: batchSize,
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
    .then(console.log)
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
          placeholder={5.5}
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
export default RecipeForm