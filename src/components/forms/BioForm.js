import React, { useEffect } from "react";
import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import {useSelector, useDispatch, connect} from 'react-redux'

const BioForm = (props) => {
  
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [bioText, setBioText] = useState(user.bio)
  const [usernameText, setUsernameText] = useState(user.username)
  useEffect(() => {
    setBioText(user.bio)
    setUsernameText(user.username)
  }, [user])

  //will send request to patch username and bio and then dispatch to user redux to update the user state
  const patchProfile = (e) => {
    e.preventDefault()  
    const form = e.target
    let token = localStorage.token;
    fetch(`https://brewkeeper-api.herokuapp.com/api/v1/edit`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Accepts: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        bio: bioText,
        id: user.id,
        username: usernameText,
        token: token
      }),
    }).then(res => res.json()).then(data => {
        if (data["error"]) {
          alert(data["error"])
        } else {
          dispatch({
            type: "UPDATE_USER",
            bio: bioText,
            username: usernameText
          })
          form.reset()
          props.onHide()
          props.setBio(bioText)
        }
      }
    )
  }  
  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={patchProfile}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group controlId="formBasicReview">
          <Form.Label>Username</Form.Label>

            <Form.Control
                className="username-input"
                name="username-input"
                as="textarea"
                rows="1"
                defaultValue={user.username}
                onChange={(e) => setUsernameText(e.target.value)}
              />

            
              <Form.Label>Bio</Form.Label>
              <Form.Control
                className="recipe-review-input"
                name="review"
                as="textarea"
                rows="3"
                placeholder="Add a bio..."
                defaultValue={user.bio && user.bio}
                onChange={(e) => setBioText(e.target.value)}
              />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer style={{justifyContent: "flex-start" }}>
          <Button variant="success" type="submit">Submit</Button> 
          
        </Modal.Footer>
      </Form>
    </Modal>
  )
} 

const mapStateToProps = state => {
  return {
    user: state.user,
    recipes: state.recipes
  }
}
export default connect(mapStateToProps)(BioForm)