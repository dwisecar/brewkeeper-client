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
  const [selectedFermentables, setSelectedFermentables] = useState([{ id:47, amount: 0 }])
  useEffect(() => {
    updateStats()
  }, [selectedFermentables, fermentables])
  
  const [selectedHops, setSelectedHops] = useState([{ id: 1, amount: 0, additionTime: 0, boilAddition: true}])
  useEffect(() => {
    updateStats()
  }, [selectedHops, hops])
  
  const [selectedYeasts, setSelectedYeasts] = useState([{id: 1, amount: 1}])
  useEffect(() => {
    updateStats()
  }, [selectedYeasts, yeasts])
  
  const [instructions, setInstructions] = useState('')
  const [notes, setNotes] = useState('')

  const [og, setOg] = useState(0)
  const [fg, setFg] = useState(0)
  const [abv, setAbv] = useState(0)
  const [ibu, setIbu] = useState(0)
  const [srm, setSrm] = useState(0)

  let history = useHistory();

  //is called when ingredient changes, begins by calculating original gravity
  const updateStats = () => {
    setTimeout(() => {
      calculateOG(selectedFermentables, selectedYeasts)
    }, 500); 
  }

  const calculateOG = (selectedFermentables, selectedYeasts) => {
    let chosenFermentables = []
    for (const f of selectedFermentables) {
      let fermentable = fermentables.find(fer => fer.id == f.id)
      if(!fermentable){fermentable = fermentables.find(fer => fer.name == "2-Row Pale Malt")}
      if(!f.amount){f.amount = 0}
      fermentable = {...fermentable, amount: f.amount}
        chosenFermentables = [...chosenFermentables, fermentable]
      }
    let chosenYeast = yeasts.find(yeast => yeast.id == selectedYeasts[0].id)
    const attenuation = chosenYeast ? (chosenYeast.attenuation_min + chosenYeast.attenuation_max) / 2 : 75
    const potential = chosenFermentables.map(f => parseFloat(f.amount) * ((parseFloat(f.potential) * 1000) - 1000))
    const totalPotential = potential.reduce((a, b) => a + b)
    const efficiency = (totalPotential * 0.72) * (attenuation * 0.01)
    const preBoilOG = ((efficiency/batchSize) / 1000) + 1
    const OG = preBoilOG + (((preBoilOG - 1) * .55))
    if(OG) {
      setOg(OG.toFixed(3))
      calculateFG(OG)
      calculateIBUs(OG)
      calculateSRM(chosenFermentables)
    } else{
      setOg(1.000)
      setFg(1.000)
      setAbv(0)
      setIbu(0)
      setSrm(0)
    }
  }

  const calculateFG = (og) => {
    const rate = ((og * 1000) - 1000) * .25
    const FG = ((rate + 1000) * 0.001)
    FG && setFg(FG.toFixed(3))
    calculateABV(og, FG)
  }

  const calculateABV = (og, fg) => {
    const ABV = (og - fg) * 131.25
    if(ABV){
      if(ABV > 100) {setAbv("100, yikes!")}
      else{setAbv(ABV.toFixed(2))}
    }
  }

  const calculateIBUs = (og) => {
    let chosenHops = []
    for (const h of selectedHops) {
      if(h.boilAddition){
        let hop = hops.find(herp => herp.id == h.id)
        if (!hop){hop = hops.find(h => h.name === "Admiral")}
        if(!h.amount){h.amount = 0}
        if(!h.additionTime){h.additionTime = 0}
        hop = {
          ...hop, 
          amount: parseFloat(h.amount), 
          additionTime: parseFloat(h.additionTime)
        }
        chosenHops = [...chosenHops, hop]
        }
      }
    const ga = (og - 1.050) / 0.2
    const ibuArr = []
    chosenHops.forEach(hop => {
      let utilization = 18.11 + (13.86 * Math.tanh((hop.additionTime - 31.21) / 18.27))
      ibuArr.push((hop.amount * (utilization * 0.01) * (hop.alpha_acid_min * 0.01) * 7462) / (batchSize * (1 + ga)))
    })
    let IBU = 0
    if (ibuArr.length > 0){IBU = ibuArr.reduce((a,b) => a + b)}
    isNaN(IBU) ? setIbu(0) : setIbu(IBU.toFixed(1))
  }

  const calculateSRM = (fermentables) => {
    const mcu = fermentables.map(f => (f.srm_id * f.amount) / batchSize).reduce((a,b) => a + b)
    const SRM = (1.4922 * (mcu ** 0.6859))
    isNaN(SRM) ? setSrm(0) : setSrm(SRM.toFixed())
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
      notes: notes,
      og: og,
      fg: fg,
      abv: abv,
      ibu: ibu,
      srm: srm
    }
    const token = localStorage.token
    fetch("https://brewkeeper-api.herokuapp.com/recipes", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
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
                  {styles.map(style => <option key={style.id} value={style.id}>{style.name}</option>)}
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

            <Form.Row className="border-top" style={{padding:"5px", display: "block"}}>
            <Form.Group controlId="formBasicFermentables">
              <h5>Fermentables</h5>
                <MultiInputs 
                  items={fermentables} 
                  setSelected={setSelectedFermentables}
                  selected={selectedFermentables}
                />
            </Form.Group>
            </Form.Row>

            <Form.Row className="border-top" style={{padding:"5px", display: "block"}}>
            <Form.Group controlId="formBasicHops">
              <h5>Hops</h5>
                <HopInputs 
                  items={hops} 
                  setSelected={setSelectedHops}
                  selected={selectedHops}
                />
            </Form.Group>
            </Form.Row>

            <Form.Row className="border-top border-bottom" style={{padding:"5px", display: "block"}}>
            <Form.Group controlId="formBasicYeast">
              <h5>Yeast</h5>
                <YeastInputs
                  items={yeasts} 
                  setSelected={setSelectedYeasts}
                  selected={selectedYeasts}
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