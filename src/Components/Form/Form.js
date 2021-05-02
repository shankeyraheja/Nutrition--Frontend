import React from "react";
import "./Form.css"

class Forms extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render(){
    return(
    <div className="form-container">
    <h5>My Daily Nutrition Requirement</h5>
    <form>

      <input className="forminput" id="age" type="number" min="1" max="100" placeholder="Enter your Age" onChange={(event) => this.props.onAgeInput(event)}/>
      <input className="forminput" id="weight" type="number" min="1" max="200" placeholder="Enter your weight in pounds" onChange={(event) => this.props.onWeightInput(event)}/>
      <input className="forminput" id="height" type="number" min="1" max="250" placeholder="Enter your height in cm" onChange={(event) => this.props.onHeightInput(event)}/>
      <input className="radio" type="radio" id="male" name="gender" value="male" onChange={(event) => this.props.onRadioInput(event)}/>
      <label  className="label1" htmlFor="male">Male</label>
      <input className="radio" type="radio" id="female" name="gender" value="female" onChange={(event) => this.props.onRadioInput(event)}/>
      <label className="label2" htmlFor="female">Female</label>
      <button className="submit" value="Evaluate" onClick={(event) => {this.props.onEvaluate(event)}}>Evaluate</button>
    </form>
    </div>
    )
}}
export default Forms;
