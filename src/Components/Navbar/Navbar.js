import React from "react";
import "./navbar.css"
class Navbar extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render(){
    return (
      <header className="bg-white black-80 tc pv4 avenir ">
      <nav className="tc mt4 nav">
        <a className="f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l" href="/">Sign Out</a>
      </nav>
        <h1 className="mt2 mb0 baskerville i fw1 f1">Your Nutrition Consultant</h1>
        <h2 className="mt2 mb0 f6 fw4 ttu tracked">We aim to Empower you to take control of your Diet and Nutrition</h2>
      </header>
    );
  }
}

export default Navbar;
