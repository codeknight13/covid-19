import React, { Component } from 'react';
import Header from './components/Header/Header'
import classes from './App.css';
import SearchBar from './containers/Search/SearchBar/SearchBar'

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Header />
        <SearchBar />
      </div>
    );
  }
}

export default App;