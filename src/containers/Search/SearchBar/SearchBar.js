import React,{Component} from 'react'
import classes from './SearchBar.css'
import axios from 'axios'
import SearchResults from '../SearchResults/SearchResults'
import Spinner from '../../../UI/Spinner/Spinner'
import Card from '../../../UI/Card/Card'

class SearchBar extends Component {
  state = {
    cardData: null,                     // data of clicked city
    cityData: null,                     // data loaded through api
    mostSearchedCities: null,           // top 10 cities searched
    searchPattern: '',                  // pattern typed in the search-box
    displaySearchResults: null,         // search results to be displayed 
    cityClicked: false,                 // to check if a city has been clicked
    showMostSearchedResults: false,     // whether to show the top searched cities or not
  }


  // gets the top-searched cities and all the cities
  componentDidMount = () => {
    let data = [];
    let arr = [];
    axios.get('https://api.covid19india.org/zones.json')
    .then(res => {
      for (let i=0; i<res.data.zones.length; i++) {
        data.push({
          city: res.data.zones[i].district,
          state: res.data.zones[i].state,
          zone: res.data.zones[i].zone
        })
      }
      data.sort((a,b) => {
        return a.city.localeCompare(b.city);      // Sorted data so that cities are always shown in lexicographic order
      })
      let alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let j=0;
      for (let i=0; i<data.length; i++) {
        if (data[i].zone==='Red') {
          if (data[i].city[0]===alpha[j]){
            arr.push(data[i]);
            j++;
            if (arr.length===10) {
              break;
            }
          }
        }
      }
      // console.log(arr);
    })
    
    // setting timeout just to see the spinner
    setTimeout(() => {
      this.setState({mostSearchedCities:arr,cityData:data});
    },1000)
  }


  // additional feature added to show top cities when clicked the search bar
  mostSearchCityDisplay = () => {
    if (this.state.searchPattern.length===0)
    this.setState({showMostSearchedResults: true,cardData: null})
  }

  
  // dynamically changing input
  inputChangedHandler = (event) => {
    const inputString = event.target.value
    const searchPattern = new RegExp(inputString, 'i');
    let searchResults = [];
    // console.log(searchPattern);
    let counter=0;
    for (let i=0; i<this.state.cityData.length; i++) {
      let startPosition = this.state.cityData[i].city.search(searchPattern);
      if (startPosition!==-1) {
        searchResults.push({
          ...this.state.cityData[i],
          startPosition: startPosition,       // passing for marking in bold
          patternLength: inputString.length   // the length that has to be made bold
        });
        // console.log(searchResults[searchResults.length-1]);
        counter++;
        if (counter===10) break;
      }
    }
    // console.log(searchResults);
    this.setState({
      searchPattern: inputString,
      showMostSearchedResults: inputString.length === 0 ? true : false,
      displaySearchResults: searchResults,
      cardData: null
    });
  }


  cityClickedHandler = (cardData) => {
    this.setState({
      cityClicked: true,
      cardData:cardData,
      searchPattern:''
    });
  }


  render () {
    const showBold=true;
    const mostSearchedCities = <SearchResults clicked={this.cityClickedHandler} cities={this.state.mostSearchedCities} />
    const displaySearchResults = <SearchResults showBold={showBold} clicked={this.cityClickedHandler}  cities={this.state.displaySearchResults} />
    let input = <Spinner />
    if (this.state.cityData) {
      input = 
      <div>
        <input 
          onChange={(event) => this.inputChangedHandler(event)} 
          onClick={this.mostSearchCityDisplay} 
          type='text' placeholder='Search...' 
          className={classes.SearchBar}
          value={this.state.searchPattern}
        />
      </div>
    }
    let showCard = true;
    if (this.state.cardData === null) {
      showCard = false;
    }
    let showTopSearches = this.state.showMostSearchedResults && this.props.showResult;
    let displaySearchResult = this.state.searchPattern.length!==0 && this.state.showMostSearchedResults===false;
    // console.log('first', this.state.showMostSearchedResults && this.props.showResult)
    // console.log('second',this.state.searchPattern.length!==0 && this.state.showMostSearchedResults===false)
    // console.log('third', this.props.showResult)
    return (
      <div>
        {input}
        {showTopSearches && this.state.cardData===null?mostSearchedCities:null}
        {displaySearchResult && this.state.cardData=== null && this.props.showResult?displaySearchResults:null}
        {showCard?<Card cardData={this.state.cardData}/>:null}
      </div>
    );
  }
}

export default SearchBar;