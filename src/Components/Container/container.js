import React from "react";
import "./container.css"
class Container extends React.Component{
  constructor(props){
    super(props)
    this.state = {
        collection:[],
        breakfast:[],
        lunch:[],
        dinner:[]
    }
  }

  componentDidMount() {
    const list = async () => {
      await fetch("http://localhost:3001/list", {
        method:"post",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({
          "search": ""
        })
      })
    .then(response => {
      return response.json()
    })
    .then(data => {
      let array = []
      for(let i=0;i<data.length;i++){
        array = array.concat(
            <div draggable onDragStart={(e) => {this.onDragStart(e,data[i][1])}} key={data[i][0]} className="draggable item2 ">

              {data[i][1]}
            </div>
          )
      }
      this.setState({collection:array})
    })

    }
    list()
  }
  onDragOver = (event) => {
    console.log("Drag over")
    event.preventDefault();
  }
  onDragStart = (event, id) => {
    console.log("Drag start", id)
    event.dataTransfer.setData("id", id)
  }
  onDrop = (event, container) => {
    let id = event.dataTransfer.getData("id")
    fetch("http://localhost:3001/data", {
      method:"post",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({
        "search": id
      })
    })
  .then(response => response.json())
  .then(data => {
    let array1 = []

    array1 = array1.concat(
          <div draggable onDragStart={(e) => {this.onDragStart(e,data[1])}} key={data[0]} className="draggable item2 ">

            {data[1]}
          </div>
        )

    if (container === "breakfast") {
      this.setState({breakfast:array1})
    }else if (container === "lunch"){
      this.setState({lunch:array1})
    }
    else{
      this.setState({dinner:array1})
    }

  })
    console.log(container, "dropped")
  }

  data = async (id) => {
    await fetch("http://localhost:3001/data", {
      method:"post",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({
        "search": id
      })
    })
  .then(response => response.json())
  }


  render(){
    // var data = JSON.parse(this.list())
    // this.list()
    console.log(this.state.collection)

    return (

      // <div className="container-drag">
      //   <div className="wip">
      //
      //
      //   </div>
      //   <div className="droppable">
      //
      //
      //   </div>
      // </div>



      <div className="grid">
        <div className="container1">
          <div className="grid2">
            <div className="leftcolumn">
              {this.state.collection}
            </div>
          </div>
        </div>
        <div className="droppable container1 " onDrop={(e)=> {this.onDrop(e,"breakfast")}} onDragOver = {(e)=> {this.onDragOver(e)}}>
          <div className="grid2">
            <div className="leftcolumn">
              {this.state.breakfast}

            </div>
          </div>
        </div>
        <div className="droppable container1" onDrop={(e)=> {this.onDrop(e,"lunch")}} onDragOver = {(e)=> {this.onDragOver(e)}}>
          <div className="grid2">
            <div className="leftcolumn">
              {this.state.lunch}

            </div>
          </div>
        </div>
        <div className="droppable container1" onDrop={(e)=> {this.onDrop(e,"dinner")}} onDragOver = {(e)=> {this.onDragOver(e)}}>
          <div className="grid2">
            <div className="leftcolumn">
              {this.state.dinner}
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Container;
