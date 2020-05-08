import React,{Component} from 'react'
import classes from './SearchBar.css'
import axios from 'axios'
import SearchResults from '../SearchResults/SearchResults'
import Spinner from '../../../UI/Spinner/Spinner'

class SearchBar extends Component {
  state = {
    cityData: null,                     // data loaded through api
    mostSearchedCities: null,           // top 10 cities searched
    searchPattern: '',                  // pattern typed in the search-box
    displaySearchResults: null,         // search results to be displayed 
    showMostSearchedResults: false,     // whether to show the top searched cities or not
  }


  // gets the top-searched cities and all the cities
  componentDidMount = () => {
    let data = [];
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
    })
    let arr = [];
    axios.get('https://covid-19-11d2b.firebaseio.com/mostSearchedCities.json')    // getting the most searched cities from the firebase it will be kept updated
    .then(res => {
      // console.log(res);
      for (let city in res.data) {
        if (arr.length<5) {
          arr.push(city);
        } else {
          let min_visits_name = arr[0];
          let index = 0;
          for (let i=0; i<5; i++) {
            if (res.data[min_visits_name]>res.data[arr[i]]) {
              min_visits_name=arr[i];
              index=i;
            }
          }
          if (res.data[arr[index]]<res.data[city]) {
            arr[index]=city;
          }
        }
      }
      // console.log(arr);
    })
    // setting timeout just to see the spinner
    setTimeout(() => {
      this.setState({mostSearchedCities:arr,cityData:data});
    },2)
  }


  // additional feature added to show top cities when clicked the search bar
  mostSearchCityDisplay = () => {
    this.setState({showMostSearchedResults: true})
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
        console.log(searchResults[searchResults.length-1]);
        counter++;
        if (counter===10) break;
      }
    }
    // console.log(searchResults);
    this.setState({
      searchPattern: inputString,
      showMostSearchedResults: inputString.length === 0 ? true : false,
      displaySearchResults: searchResults
    });
  }


  render () {
    const mostSearchedCities = <SearchResults cities={this.state.mostSearchedCities} />
    const displaySearchResults = <SearchResults  cities={this.state.displaySearchResults} />
    let input = <Spinner />
    if (this.state.cityData) {
      input = 
      <input 
        onChange={(event) => this.inputChangedHandler(event)} 
        onClick={this.mostSearchCityDisplay} 
        type='text' placeholder='Search...' 
        className={classes.SearchBar}
        value={this.state.searchPattern}
      />
    }
    
    return (
      <div>
        {input}        
        {
          this.state.showMostSearchedResults ?
          mostSearchedCities : null
        }
        {
          this.state.searchPattern.length!==0 
            && 
          this.state.showMostSearchedResults===false ?
          displaySearchResults : null
        }
      </div>
    );
  }
}

export default SearchBar;