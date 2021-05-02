import React from "react";
import './App.css';
import Containers from "./Components/Container/container"
import Container from "react-bootstrap/Container"
import Navbar from "./Components/Navbar/Navbar"
class App extends React.Component {
  constructor(){
  super()
  this.state = {
    search:"",
    array: []
    }
  }


  render(){
    return (
      <div className="Box">

      <Navbar/>
      <div className="App-header">
        <Containers search/>
      </div>
      </div>

    );
  }
}

export default App;
