import React from 'react';
import classes from './SearchResults.css'

export const makeid = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


const searchResults = props => {
  // console.log('SearchResults',props.cities);
  let searchResult = [];
  for (let i=0; i<props.cities.length; i++) {
    let itemClass = classes.SearchResultZoneNotProvided;
    // console.log('zone',(props.cities[i].zone))
    if (props.cities[i].zone==='Green') {
      itemClass=classes.SearchResultItemGreen;
    }
    if (props.cities[i].zone==='Red') {
      itemClass=classes.SearchResultItemRed;
    }
    if (props.cities[i].zone==='Orange') {
      itemClass=classes.SearchResultItemOrange;
    }
    let cardData = {
      ...props.cities[i]
    }
    // console.log(props)
    const cityName = props.cities[i].city;
    const startIndex = props.cities[i].startPosition;
    const boldLength = props.cities[i].patternLength;
    // console.log(cityName,startIndex,boldLength);
    // console.log(
    //   cityName.substring(0,startIndex),
    //   cityName.substring(startIndex,boldLength+startIndex),
    //   cityName.substring(startIndex+boldLength)
    // )
    let displayCityName = <p>{cityName}</p>
    if (props.showBold)
    displayCityName = <p>{cityName.substring(0,startIndex)}<strong>{cityName.substring(startIndex,boldLength+startIndex)}</strong>{cityName.substring(startIndex+boldLength)}</p>
    
    searchResult.push(
      <a className={classes.Link} href='#!' onClick={() => props.clicked(cardData)} key={makeid(4)}>
        <div className={itemClass}>
          {displayCityName}
          <p>{props.cities[i].state}</p>
          <p>Zone: {props.cities[i].zone}</p>
        </div>
      </a>
    )
  }
  // console.log('searchResult', searchResult);
  return (
    <div style={{textAlign: "center"}}>
      {searchResult}
    </div>
  )
}

export default searchResults;