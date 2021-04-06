import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { uuid } from "uuidv4";
import "./dragdrop.css"
// import "./usestate.js"

const params = {
  api_key: "gBVxdic66dh8BJmcU9hZKBanpfqCdBeIoJm3x6Xi",
  dataType: ["Survey (FNDDS)"],
  pagesize: 100
}

const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&dataType=${encodeURIComponent(params.dataType)}&pageSize=${encodeURIComponent(params.pagesize)}`
// &query=${encodeURIComponent(params.query)}





const itemsFromBackend = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" },
  { id: uuid(), content: "Fifth task" }
];

const columnsFromBackend = {
  [uuid()]: {
    name: "Food List",
    items: itemsFromBackend
  },
  [uuid()]: {
    name: "Breakfast",
    items: []
  },
  [uuid()]: {
    name: "Lunch",
    items: []
  },
  [uuid()]: {
    name: "Dinner",
    items: []
  }
};



// const stateproblem = (columns_back) => {
//   return useState(columns_back);
// }

class Dragdrop extends React.Component{
        constructor(props){
          super(props)
          this.state = {
            columns: "columnsFromBackend",
            sourceItems: "",
            destItems: "",
            copiedItems: ""


          }
        }
        onDragEnd(result, columns){
          console.log("Called")
          if (!result.destination) return;
          const { source, destination } = result;
          if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            this.setState({sourceItems: sourceColumn.items})
            this.setState({destItems: destColumn.items})
            // const sourceItems = [...sourceColumn.items];
            // const destItems = [...destColumn.items];
            const [removed] = this.state.sourceItems.splice(source.index, 1);
            this.state.destItems.splice(destination.index, 0, removed);
            const columns2 = {[source.droppableId]: {
              name: sourceColumn,
              items: this.state.sourceItems
            },
            [destination.droppableId]: {
              name: destColumn,
              items: this.state.destItems
            }}
            this.setState({columns:columns2})
            // setColumns({
            //   ...columns,
            //   [source.droppableId]: {
            //     ...sourceColumn,
            //     items: sourceItems
            //   },
            //   [destination.droppableId]: {
            //     ...destColumn,
            //     items: destItems
            //   }
            // });
          } else {
            const column = columns[source.droppableId];
            this.setState({copiedItems: column.items})
            // const copiedItems = [...column.items];
            const [removed] = this.state.copiedItems.splice(source.index, 1);
            this.state.copiedItems.splice(destination.index, 0, removed);
            const columns3 = {[source.droppableId]: {
              name: column,
              items: this.state.copiedItems
            }}
            this.setState({columns:columns3})
            // setColumns({
            //   ...columns,
            //   [source.droppableId]: {
            //     ...column,
            //     items: copiedItems
            //   }
            // });
          }
        };
        getdata(){
          console.log("Called Get data")
          let params = {
            api_key: "gBVxdic66dh8BJmcU9hZKBanpfqCdBeIoJm3x6Xi",
            dataType: ["Survey (FNDDS)"],
            pagesize: 100,
            query: this.props.search
          }
          const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&query=${encodeURIComponent(params.query)}&dataType=${encodeURIComponent(params.dataType)}&pageSize=${encodeURIComponent(params.pagesize)}`
           let data = fetch(api_url).then(response => response.json()).then(data =>{
             this.items_back(data)
           }).then(data => {
             this.columns_back(data)
           }).then(data => {
             return data
             console.log(data)
           })
           // console.log(data)
           // return data
        }
        items_back(data){
              // const data = this.getdata(this.props.search)
              // data = data["foods"]
              // console.log("Printing data.foods")
              // console.log(data)
              Object.entries(data).then(data => {
              const map1 = data.map(x => x[1])
              return map1
            }).then(data => {
              const foodNutrients = data.map(x => x.foodNutrients)
              const description = data.map(x => x.description)
              const id = data.map(x => x.fdcId)
              let items = new Array()

              for(let i=0;i<data.length;i++){
                let obj = {}
                obj["id"] = data[i].fdcId
                obj["content"] = data[i].description
                items.push(obj)
              }
              console.log(items)
              return items
            })
          }
    // console.log(this.getdata())
      columns_back(items){

    let columns_backend = {[uuid()]: {
          name: "Food List",
          items: items
        },
        [uuid()]: {
          name: "Breakfast",
          items: []
        },
        [uuid()]: {
          name: "Lunch",
          items: []
        },
        [uuid()]: {
          name: "Dinner",
          items: []
        }
      };



  // getdata(search).then(data => {
  //   return data.foods
  // }).then(data => {
  //   return Object.entries(data)
  // }).then(data => {
  //   const map1 = data.map(x => x[1])
  //   return map1
  // }).then(data => {
  //   const resp = data.map(x => [x.fdcId, x.description, x.foodNutrients])
  //   return resp
  // }).then(data => console.log(data))

  let items2 = []
  let items1 = []
  for (let i=0;i< Object.values(columns_backend)[0].items.length;i++){
    if (Object.values(columns_backend)[0].items[i]["content"].toLowerCase().includes(this.props.search.toLowerCase())){
      items1.push(Object.values(columns_backend)[0].items[i])
    }else{
      items2.push(Object.values(columns_backend)[0].items[i])
    }
  }
  const items3 = items1.concat(items2)
  Object.values(columns_backend)[0].items = items3
  this.setState({columns:columns_backend})
  console.log(columns_backend)
  return columns_backend
}
  // console.log(Object.values(columns)[0].items[0]["content"].toLowerCase())
  render(){
    this.getdata()
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={result => {this.onDragEnd(result, this.getdata)}}
      >
        {Object.entries(this.state.columns).map(([columnId, column], index) => {
          return (
          <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "black"
              }}
              key={columnId}>
                <h1 className="name"> {column.name}</h1>
              <div style={{ margin: 15 }} className="drop">
                <Droppable droppableId={columnId} key={columnId} >
                  {(provided, snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}
                      >
                        {this.state.columns.items
                          .map((val) => {
                            return val
                          })
                          .map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      textalign: "center",
                                      color: "white",

                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}}

export default Dragdrop;
