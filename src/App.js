import React, { Component } from 'react';
import Header from './components/Header/Header'
import classes from './App.css';
import SearchBar from './containers/Search/SearchBar/SearchBar'

class App extends Component {
  state = {
    showResult: false
  }
  handel = (event) => {
    // console.log('click event', event);
    // console.log('click event target', event.target);
    // console.log('click event target value', event.target.value);
    if (event.target.value===undefined) {
      this.setState({showResult:false});
    } else {
      this.setState({showResult:true});
    }
    // console.log("App.js",this.state.showResult)
  }
  render() {
    return (
      <div className={classes.App} onClick={(event) => this.handel(event)}>
        <Header />
        <SearchBar showResult={this.state.showResult}/>
      </div>
    );
  }
}

export default App;