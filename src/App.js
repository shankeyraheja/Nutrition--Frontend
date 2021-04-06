import React from "react";
import './App.css';
import Container from "./Components/Container/container"
import Navbar from "./Components/Navbar/Navbar"
import Searchbar from "./Components/Searchbar/Searchbar"
class App extends React.Component {
  constructor(){
  super()
  this.state = {
    search:""
    }
  }
  OnSearch = (event) => {
    this.setState({search:event.target.value})
  }
  render(){
    return (
      <div>
      <Navbar/>
      <Searchbar OnSearch = {this.OnSearch}/>
      <div className="App-header">
        <Container/>
      </div>
      </div>

    );
  }
}

export default App;
