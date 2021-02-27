import React, { useState, useEffect } from 'react'
import {Container, CardDeck, Button} from "react-bootstrap";
import BioForm from '../components/forms/BioForm';
import RecipeCard from '../components/RecipeCard';

const Profile = ({user, recipes}) => {

  const [bio, setBio] = useState(null)
  const [modalShow, setModalShow] = useState(false)
  
  useEffect(() => {
    user.bio ? setBio(user.bio) : setBio(null)
  }, [])

  return(
    <div>
      <Container className="user-profile">
        <h3>{user.username}</h3>
        {<><h5>Bio</h5><p>{bio}</p></>}
        {user.bio ? <Button onClick={() => setModalShow(true)}>Update Bio</Button> : <Button onClick={() => setModalShow(true)}>Add Bio</Button>}
        <h5>Recipes</h5>
        <CardDeck>
          {recipes.filter(r => r.user_id === user.id)
          .map((recipe, idx) => <RecipeCard key={idx} recipe={recipe}/>)}
        </CardDeck>
      </Container>
      <BioForm show={modalShow} 
        onHide={() => setModalShow(false)} 
        user={user} 
        bio={bio}
        setBio={setBio}/>
    </div>
  )
}
export default Profile