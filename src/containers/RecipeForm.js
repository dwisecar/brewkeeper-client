import React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import MultiInputs from "../components/forms/MultiInputs";
import HopInputs from "../components/forms/HopInputs"
import { useHistory } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import CreateBeerDisplay from "../components/CreateBeerDisplay";
import YeastInputs from "../components/forms/YeastInputs";
import CreateRecipeStats from "../components/CreateRecipeStats";

function RecipeForm(){
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const styles = useSelector(state => state.styles)
  const fermentables = useSelector(state => state.fermentables)
  const hops = useSelector(state => state.hops)
  const yeasts = useSelector(state => state.yeasts)
  
  const [recipeName, setRecipeName] = useState("Untitled")
  const [batchSize, setBatchSize] = useState(5.5)
  useEffect(() => {
    updateStats()
  }, [batchSize])

  const [selectedStyle, setSelectedStyle] = useState({ id: 1 })
  const [selectedFermentables, setSelectedFermentables] = useState([{ id:1, amount: 0 }])
  useEffect(() => {
    updateStats()
  }, [selectedFermentables])
  
  const [selectedHops, setSelectedHops] = useState([{ id: 1, amount: 0, additionTime: 60, boilAddition: true}])

  
  const [selectedYeasts, setSelectedYeasts] = useState([{id: 1, amount: 1}])
  useEffect(() => {
    updateStats()
  }, [selectedYeasts])
  
  const [instructions, setInstructions] = useState('')
  const [notes, setNotes] = useState('')

  const [og, setOg] = useState(0)
  const [fg, setFg] = useState(0)
  const [abv, setAbv] = useState(0)
  const [ibu, setIbu] = useState(0)
  const [srm, setSrm] = useState(0)

  let history = useHistory();

  const updateStats = () => {
    setTimeout(() => {
      calculateOG(selectedFermentables, selectedYeasts)
    }, 1000); 
  }

  const calculateOG = (selectedFermentables, selectedYeasts) => {
    let chosenFermentables = []
    for (const f of selectedFermentables) {
      let fermentable = fermentables.find(fer => fer.id == f.id)
      fermentable = {...fermentable, amount: f.amount}
        chosenFermentables = [...chosenFermentables, fermentable]
      }
    let chosenYeast = yeasts.find(yeast => yeast.id == selectedYeasts.id)
    const attenuation = chosenYeast ? (chosenYeast.attenuation_min + chosenYeast.attenuation_max) / 2 : 75
    const potential = chosenFermentables.map(f => parseFloat(f.amount) * ((parseFloat(f.potential) * 1000) - 1000))
    const totalPotential = potential.reduce((a, b) => a + b)
    const efficiency = (totalPotential * 0.9) * (attenuation * 0.01)
    const OG = ((efficiency/batchSize) / 1000) + 1
    OG && setOg(OG.toFixed(3))
    calculateFG(OG)
    console.log("atten", attenuation, "pot", totalPotential, "eff", efficiency, "og", OG, "chosen", chosenFermentables)
  }

  const calculateFG = (og) => {
    const rate = ((og * 1000) - 1000) * .25
    const FG = ((rate + 1000) * 0.001)
    FG && setFg(FG.toFixed(3))
    calculateABV(og, FG)
  }

  const calculateABV = (og, fg) => {
    const ABV = (og - fg) * 131.25
    ABV && setAbv(ABV.toFixed(2))
  }

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
    <Container className="justify-content-start">
      <Row >
        <Col>
        <Form onSubmit={handleCreateRecipe} className="create-recipe-form">
          <h2 className="text-center">Create A Homebrew Recipe</h2>
          <Form.Row>
            <Col xs={12} controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="recipe-name-input"
                name="name"
                type="text"
                placeholder="Recipe Name"
                onChange={(e) => setRecipeName(e.target.value)}
              />
            </Col>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formBasicStyles">
                <Form.Label>Style</Form.Label>
                <Form.Control as="select" name="style" onChange={(e) => setSelectedStyle({id: e.target.value})}>
                  {styles.map(style => <option value={style.id}>{style.name}</option>)}
                </Form.Control>
              </Form.Group>

              <Col xs={3} controlId="formBasicSize">
                <Form.Label>Batch Size (Gallons)</Form.Label>
                <Form.Control
                  className="recipe-name-input"
                  name="name"
                  type="number"
                  step='0.1'
                  min="0"
                  defaultValue={5.5}
                  onChange={(e) => setBatchSize(e.target.value)}
                />
              </Col>
            </Form.Row>

            <Form.Row className="border-top" style={{padding:"5px"}}>
            <Form.Group controlId="formBasicFermentables">
              <h5>Fermentables</h5>
                <MultiInputs 
                  items={fermentables} 
                  setSelected={setSelectedFermentables}
                  selected={selectedFermentables}
                  updateStats={updateStats}
                />
            </Form.Group>
            </Form.Row>

            <Form.Row className="border-top" style={{padding:"5px"}}>
            <Form.Group controlId="formBasicHops">
              <h5>Hops</h5>
                <HopInputs 
                  items={hops} 
                  setSelected={setSelectedHops}
                  selected={selectedHops}
                  updateStats={updateStats}
                />
            </Form.Group>
            </Form.Row>

            <Form.Row className="border-top border-bottom" style={{padding:"5px"}}>
            <Form.Group controlId="formBasicYeast">
              <h5>Yeast</h5>
                <YeastInputs
                  items={yeasts} 
                  setSelected={setSelectedYeasts}
                  selected={selectedYeasts}
                  updateStats={updateStats}
                />
            </Form.Group>
            </Form.Row>

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

            <Button variant="success" type="submit">Submit</Button>
          </Form>
        </Col>
        <Col >
          <CreateRecipeStats 
            og={og}
            fg={fg}
            abv={abv}
            ibu={ibu}
            srm={srm}  
          />
          <CreateBeerDisplay className="create-beer-display" srm={srm}/>
        </Col>
 

      </Row>
    </Container>
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