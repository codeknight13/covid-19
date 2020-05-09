import React from 'react'
import classes from './Card.css'

const card = (props) => {
  console.log(props);
  let cardClass = null;
  if (props.cardData.zone==='Green') {
    cardClass=classes.cardGreen
  }
  if (props.cardData.zone==='Red') {
    cardClass=classes.cardRed
  }
  if (props.cardData.zone==='Orange') {
    cardClass=classes.cardOrange
  }
  return (
    <div className={cardClass}>
      <div className={classes.container}>
        <h2>City: {props.cardData.city}</h2>
        <h2>State: {props.cardData.state}</h2>
        <h2>Zone: {props.cardData.zone}</h2>
      </div>
    </div>
  )
}

export default card;