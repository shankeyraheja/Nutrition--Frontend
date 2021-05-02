import React, {Component} from "react";
import {Bar} from "react-chartjs-2";
import './Chart.css';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartdata: {
        labels: ["Protein", "Fat", "Carbohydrate", "Fiber", "Calcium", "Iron", "Magnesium", "Phosphorous", "Potassium", "Sodium", "Zinc", "Vitamin A", "Vitamin B1","Vitamin B2","Vitamin B3","Vitamin B6","Vitamin B9","Vitamin B12","Vitamin C", "Vitamin D", "Vitamin E", "Vitamin K"],
        datasets: [
          {
            label: "Daily Requirement",
            data:[120,100,50,120,100,50,20,120,100,50,20,120,100,50,20,120,100,50,20,20,20,30],
            backgroundColor: ["rgba(153, 242, 145)"]
          },
          {
            label: "Your Diet Contains",
            data:[props.protein,100,50,20,120,100,50,20,120,100,50,20,120,100,50,20,120,100,50,20,20,20,30],
            backgroundColor: ["rgba(240, 245, 144)"]
          }
        ]
      }
    }

  }


  render(){
    return(
      <div className="bar">
      <Bar
      	data={this.props.chartdata}
      	options={{
          title:{
            display:true,
            text: "Nutrition Profile"
          },
        legend: {
          display: true,
          position: "bottom"
        }}}
      />
      </div>
    )
  }
}

export default Chart
