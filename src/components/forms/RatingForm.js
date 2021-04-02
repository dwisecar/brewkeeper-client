import React from "react";
import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import 'react-rangeslider/lib/index.css'

import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import PropTypes from 'prop-types';

const RatingForm = ({user, recipe, ratings, setRatings}) => {

  const [rating, setRating] = useState(0)
  const [userHasRated, setUserHasRated] = useState(false)
  const [previousRating, setPreviousRating] = useState({})
  const [hover, setHover] = useState(-1);

  //when a user changes a recipe's ratings state, this will handle it and flip the user has rated state to true 
  useEffect(() => {
    const userRating = ratings.filter(rating => rating.user_id === user.id) 
    userRating.length !== 0 ? handleUserPrevRating(userRating) : setUserHasRated(false) 
  }, [ratings])

  //will note that a user has made a rating and if they change it, it should be a patch instead of post
  const handleUserPrevRating = rating => {
    setUserHasRated(true)
    setRating(rating[0].stars)
    setPreviousRating(rating[0])
  }

  const postRating = (val) => {
    setUserHasRated(true)
    const token = localStorage.token
    setTimeout(() => {
      fetch("https://brewkeeper-api.herokuapp.com/ratings", {
        method: "POST", 
        headers: {
          Authorization: `Bearer ${token}`,
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
        setRatings([...ratings, rating])
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
        const prevRatings = ratings.filter(r => r.id !== rating.id)
        setRatings([...prevRatings, rating])
      })
    }, 1000);
    
  }  

  //checks for if the user has rated this recipe before and whether to post or patch the rating
  const setSliderRating = e => {
    !userHasRated ? postRating(e.target.value) : patchRating(e.target.value)
  }

  //setting styles for custom ratings slider
  const useStyles = makeStyles({
    root: {
      width: 200,
      display: 'flex',
      alignItems: 'center',
    },
  })

  const classes = useStyles()

  //setting all ten icons to the beverage icon instead of stars default
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
