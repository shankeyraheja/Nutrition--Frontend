import React from "react";
import "./Searchbar.css"
class Searchbar extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render(){
    return (
      <div >
        <input className="Search" type="text" placeholder="Search for your favourite food" onChange={this.props.OnSearch}/>
      </div>

    )
  }
}

export default Searchbar;
