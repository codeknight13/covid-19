import React from 'react'


const searchResults = props => {
  // console.log('SearchResults',props.cities);
  let searchResult = [];
  // for (let i=0; i<props.cities.length; i++) {
  //   searchResult.push(
  //     <a href="/state/AR">
  //       <div class="result">
  //         <div class="result-name">
  //           Arunachal Pradesh
  //         </div>
  //         <div class="result-type">
  //           Visit state page
  //         </div>
  //       </div>
  //     </a>
  //   )
  // }
  return (
    <div>
      {searchResults}
    </div>
  )
}

export default searchResults;