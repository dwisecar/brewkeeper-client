import React, { useState, useEffect } from 'react'
import {Container, CardDeck, Button, Row, Col} from "react-bootstrap";
import BioForm from './forms/BioForm';
import RecipeCard from './RecipeCard';
import { connect, useSelector } from 'react-redux';

const Profile = () => {

  const user = useSelector(state => state.user)
  const recipes = useSelector(state => state.recipes)

  const [bio, setBio] = useState(null)
  const [modalShow, setModalShow] = useState(false)
  
  useEffect(() => {
    user.bio ? setBio(user.bio) : setBio(null)
  }, [])

  const handleDeleteAccount = () => {
    
  }

  return(
    <>
      <Container className="user-profile ">
        <Row>
          <Col xs={3}>
            <h3>{user.username}</h3><br></br>
          </Col>
          <Col>
            {user.bio ? <Button variant="success" onClick={() => setModalShow(true)}>Update Profile</Button> : <Button variant="success" onClick={() => setModalShow(true)}>Add Bio</Button>}
          </Col>
        </Row>

          {<><h5>Bio</h5>
          <p>{bio}</p></>}
        
        <div>
          <h5>Recipes</h5>
            <CardDeck>
              {recipes.filter(r => r.user_id === user.id)
              .map((recipe, idx) => <RecipeCard key={idx} recipe={recipe}/>)}
            </CardDeck>
        </div>
      </Container>
      <BioForm show={modalShow} 
        onHide={() => setModalShow(false)} 
        user={user} 
        bio={bio}
        setBio={setBio}/>
    </>
  )
}


const mapStateToProps = state => {
  return {
    user: state.user,
    recipes: state.recipes
  }
}
export default connect(mapStateToProps)(Profile)