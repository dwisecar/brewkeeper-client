import React from "react";
import { useState, useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import PropTypes from 'prop-types';

const RatingForm = ({user, recipe}) => {

  const [rating, setRating] = useState(0)
  const [userHasRated, setUserHasRated] = useState(false)
  const [previousRating, setPreviousRating] = useState({})
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);

  useEffect(() => {
    const userRating = user.ratings.filter(rating => rating.recipe_id === recipe.id) 
    userRating.length !== 0 ? handleUserPrevRating(userRating) : setUserHasRated(false)
    
  }, [])

  const handleUserPrevRating = rating => {
    setUserHasRated(true)
    setRating(rating[0].stars)
    setPreviousRating(rating[0])
  }

  const postRating = (val) => {
    setUserHasRated(true)
    setTimeout(() => {
      fetch("https://brewkeeper-api.herokuapp.com/ratings", {
        method: "POST", 
        headers: {
          "Content-type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          user_id: user.id,
          recipe_id: recipe.id,
          value: parseInt(val)
        })
      }).then(res => res.json())
      .then(rating => {
        setPreviousRating(rating)
      })
    }, 1000);
  }  

  const patchRating = (val) => {
    setTimeout(() => {
      fetch(`https://brewkeeper-api.herokuapp.com/ratings/${previousRating.id}`, {
        method: "PATCH", 
        headers: {
          "Content-type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          id: previousRating.id,
          user_id: user.id,
          recipe_id: recipe.id,
          value: parseInt(val)
        })
      }).then(res => res.json())
      .then(rating => {
        setPreviousRating(rating)
      })
    }, 1000);
    
  }  

  const setSliderRating = e => {
    !userHasRated ? postRating(e.target.value) : patchRating(e.target.value)
  }

  const useStyles = makeStyles({
    root: {
      width: 200,
      display: 'flex',
      alignItems: 'center',
    },
  })

  const classes = useStyles()

  const customIcons = {
    1: {icon: <LocalDrinkIcon/>, label: "Hop Image" },
    2: {icon: <LocalDrinkIcon/>, label: "Hop Image" },
    3: {icon: <LocalDrinkIcon/>, label: "Hop Image" },
    4: {icon: <LocalDrinkIcon/>, label: "Hop Image" },
    5: {icon: <LocalDrinkIcon/>, label: "Hop Image" },
    6: {icon: <LocalDrinkIcon/>, label: "Hop Image" },
    7: {icon: <LocalDrinkIcon/>, label: "Hop Image" },
    8: {icon: <LocalDrinkIcon/>, label: "Hop Image" },
    9: {icon: <LocalDrinkIcon/>, label: "Hop Image" },
    10: {icon: <LocalDrinkIcon/>, label: "Hop Image" }
  }

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }
  
  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };

  return (
    <Container style={{marginTop: "15px"}}>
      <Row>
        <label>Your Rating: {rating} </label>
      </Row>
        <div className={classes.root}>
          <Rating
            name="hover-feedback"
            value={rating}
            precision={1}
            max={10}
            IconContainerComponent={IconContainer}
            onChange={(event, newValue) => {
              setRating(newValue)
              setSliderRating(event)
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover)
            }}
          />
        </div>  
    </Container>
  )
}
export default RatingForm
