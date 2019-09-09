import React, { Component } from 'react';
import {CardList} from './components/card-list/card-list.component';
import {SearchBox} from './components/search-box/search-box.component';
import './App.css';


class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: '',
      isLoaded: false
    };
  }


  fetchFile(){
    fetch('https://jsonplaceholder.typicode.com/users')
      .then (response => response.json())
      .then(users => this.setState({monsters: users, isLoaded: true}))
  }

  componentDidMount(){
    this.fetchFile();
  }

  handleChange = e => {
    this.setState({searchField: e.target.value});
  }

  render() {
    const { monsters ,searchField } = this.state;
    const filteredMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(searchField.toLowerCase()));
    
    if(this.state.isLoaded){
      return (
        <div className="App">
          <h1>Monster Rolodex</h1>
          <SearchBox 
            placeholder='Search monster' 
            handleChange={this.handleChange}
          />
          <CardList monsters = {filteredMonsters}></CardList>
        </div>
      );
    }else {
      return (
        <div className="App">
          <h1>Monster Rolodex</h1>
          <SearchBox 
            placeholder='Search monster' 
            handleChange={this.handleChange}
          />
          <div className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
          </div>
        </div>
      );
    }

    
  }
}

export default App;