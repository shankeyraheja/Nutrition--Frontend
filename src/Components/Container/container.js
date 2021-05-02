import React from "react";
import "./container.css"
import "../Searchbar/Searchbar.css"
import Searchbar from "../Searchbar/Searchbar"
import Chart from "../Chart/Chart"
import Forms from "../Form/Form"
class Containers extends React.Component{
  constructor(props){
    super(props)
    this.state = {
        collection:[],
        breakfast:[],
        lunch:[],
        dinner:[],
        search: "",
        protein:[], fat:[], carbohydrate:[], fiber:[], calcium:[], iron:[], magnesium:[],phosphorous:[],potassium:[], sodium:[],zinc:[], vita:[],vitb1:[],
        vitb2:[],vitb3:[],vitb6:[],vitb9:[],vitb12:[],vitc:[],vitd:[],vite:[],vitk:[],
        data:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        data1: [0,0,0,0,0,0,0,0,0],
        data2: [0,0,0,0,0,0,0,0,0,0,0,0,0],
        data_diet: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        age:"",
        height:"",
        weight:"",
        gender:"",
        chartdata: {
          labels: ["Protein(g)", "Fat(g)", "Carbohydrate(g)", "Fiber(g)", "Calcium(mg)", "Iron(mg)", "Magnesium(mg)", "Phosphorous(mg)", "Potassium(mg)", "Sodium(mg)", "Zinc(mg)", "Vitamin A(mcg)", "Vitamin B1(mg)","Vitamin B2(mg)","Vitamin B3(mg)","Vitamin B6(mg)","Vitamin B9(mcg)","Vitamin B12(mcg)","Vitamin C(mg)", "Vitamin D(mcg)", "Vitamin E(mg)", "Vitamin K(mcg)"],
          datasets: [
            {
              label: "Daily Requirement",
              data:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              backgroundColor: ["rgba(153, 242, 145)"]
            },
            {
              label: "Your Diet Contains",
              data:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              backgroundColor: ["rgba(240, 245, 144)"]
            }
          ]
        },
        chartdata1: {
          labels: ["Carbohydrate(g)", "Calcium(mg)", "Magnesium(mg)", "Phosphorous(mg)", "Potassium(mg)", "Sodium(mg)", "Vitamin A(mcg)","Vitamin B9(mcg)", "Vitamin K(mcg)"],
          datasets: [
            {
              label: "Daily Requirement",
              data:[0,0,0,0,0,0,0,0,0],
              backgroundColor: ["rgba(153, 242, 145)"]
            },
            {
              label: "Your Diet Contains",
              data:[0,0,0,0,0,0,0,0,0,0],
              backgroundColor: ["rgba(240, 245, 144)"]
            }
          ]
        },
        chartdata2: {
          labels: ["Protein(g)", "Fat(g)", "Fiber(g)", "Zinc(mg)", "Vitamin B1(mg)","Vitamin B2(mg)","Vitamin B3(mg)","Vitamin B6(mg)","Vitamin B12(mcg)","Vitamin C(mg)", "Vitamin D(mcg)", "Vitamin E(mg)"],
          datasets: [
            {
              label: "Daily Requirement",
              data:[0,0,0,0,0,0,0,0,0,0,0,0],
              backgroundColor: ["rgba(153, 242, 145)"]
            },
            {
              label: "Your Diet Contains",
              data:[0,0,0,0,0,0,0,0,0,0,0,0],
              backgroundColor: ["rgba(240, 245, 144)"]
            }
          ]
        }
    }
  }


  componentDidMount() {
    const list = async () => {
      await fetch("https://warm-badlands-38064.herokuapp.com/list", {
        method:"post",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({
          "search": this.state.search
        })
      })
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data)
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
  onAgeInput = (event) => {
    console.log(event.target.value)
    this.setState({age:event.target.value})
  }
  onHeightInput = (event) => {
    console.log(event.target.value)
    this.setState({height:event.target.value})
  }
  onWeightInput = (event) => {
    console.log(event.target.value)
    this.setState({weight:event.target.value})
  }
  onRadioInput = (event) => {
    console.log(event.target.value)
    this.setState({gender:event.target.value})
  }
  onEvaluate = (event) => {
    if(this.state.age != "" & this.state.height != ""  & this.state.weight != "" & this.state.gender != ""){

      console.log("clicked")
      let protein = this.state.weight * 0.36
      let fat = 0
      let fiber = 0
      let carbs = 0
      let calcium = 1000
      let iron = 0
      let magnesium = 0
      let phosphorous = 700
      let potassium = 3500
      let sodium = 1500
      let zinc = 0
      let vita = 0
      let vitb1 = 1.2
      let vitb2 = 1.2
      let vitb3 = 0
      let vitb6 = 1.3
      let vitb9 = 400
      let vitb12 = 2.4
      let vitc = 0
      let vitd = 15
      let vite = 15
      let vitk = this.state.weight


      if (this.state.gender === "male"){
        fat = fat + ((88.362 + (13.397 * this.state.weight * 0.453592) + (4.799 * this.state.height) - (5.677 * this.state.age))*1.2*0.3) / 9
        fiber = fiber + 30
        carbs = carbs + (88.362 + (13.397 * this.state.weight * 0.453592) + (4.799 * this.state.height) - (5.677 * this.state.age))*1.2 * 0.5 * 0.25
        iron = iron + 8
        magnesium = magnesium + 400
        zinc = zinc + 11
        vita = vita + 900
        vitb3 = vitb3 + 16
        vitc = vitc + 90
      }else{
        fat = fat + ((447.593 + (9.247 * this.state.weight * 0.453592) + (3.098 * this.state.height) - (4.330 * this.state.age))*1.2*0.3 ) / 9
        carbs = carbs + (447.593 + (9.247 * this.state.weight * 0.453592) + (3.098 * this.state.height) - (4.330 * this.state.age))*1.2*0.5 * 0.25
        fiber = fiber + 25
        iron = iron + 18
        vitb3 = vitb3 + 14
        magnesium = magnesium + 310
        zinc = zinc + 8
        vita = vita + 700
        vitc = vitc + 75
      }
      let daily = [protein, fat, carbs,fiber, calcium, iron, magnesium, phosphorous, potassium, sodium, zinc, vita, vitb1, vitb2, vitb3, vitb6, vitb9, vitb12, vitc, vitd, vite, vitk]
      let daily1 = [carbs,calcium,magnesium,phosphorous,potassium,sodium,vita,vitb9,vitk]
      let daily2 = [protein, fat, fiber, iron, zinc,vitb1, vitb2, vitb3, vitb6, vitb12, vitc, vitd, vite]
      // this.setState({data:daily})
      this.setState({data1:daily1, data2:daily2})
      // this.setState({data2:[protein, fat, fiber, zinc, vitb1, vitb2, vitb3, vitb6, vitb12, vitc, vitd, vite]})
      console.log(daily)
      // console.log(this.state.data)
      // this.setState({chartdata:{
      //   labels: ["Protein(g)", "Fat(g)", "Carbohydrate(g)", "Fiber(g)", "Calcium(mg)", "Iron(mg)", "Magnesium(mg)", "Phosphorous(mg)", "Potassium(mg)", "Sodium(mg)", "Zinc(mg)", "Vitamin A(mcg)", "Vitamin B1(mg)","Vitamin B2(mg)","Vitamin B3(mg)","Vitamin B6(mg)","Vitamin B9(mcg)","Vitamin B12(mcg)","Vitamin C(mg)", "Vitamin D(mcg)", "Vitamin E(mg)", "Vitamin K(mcg)"],
      //   datasets: [
      //     {
      //       label: "Daily Requirement",
      //       data: daily,
      //       backgroundColor: ["rgba(153, 242, 145)"]
      //     },
      //     {
      //       label: "Your Diet Contains",
      //       data:this.state.data_diet,
      //       backgroundColor: ["rgba(240, 245, 144)"]
      //     }
      //   ]
      // }})
      this.setState({chartdata1:{
        labels: ["Carbohydrate(g)", "Calcium(mg)", "Magnesium(mg)", "Phosphorous(mg)", "Potassium(mg)", "Sodium(mg)", "Vitamin A(mcg)","Vitamin B9(mcg)", "Vitamin K(mcg)"],
        datasets: [
          {
            label: "Daily Requirement",
            data: daily1,
            backgroundColor: ["rgba(153, 242, 145)"]
          },
          {
            label: "Your Diet Contains",
            data:this.state.data_diet,
            backgroundColor: ["rgba(240, 245, 144)"]
          }
        ]
      },
      chartdata2:{
        labels: ["Protein(g)", "Fat(g)", "Fiber(g)", "Iron(mg)", "Zinc(mg)", "Vitamin B1(mg)","Vitamin B2(mg)","Vitamin B3(mg)","Vitamin B6(mg)","Vitamin B12(mcg)","Vitamin C(mg)", "Vitamin D(mcg)", "Vitamin E(mg)"],
        datasets: [
          {
            label: "Daily Requirement",
            data: daily2,
            backgroundColor: ["rgba(153, 242, 145)"]
          },
          {
            label: "Your Diet Contains",
            data:this.state.data_diet,
            backgroundColor: ["rgba(240, 245, 144)"]
          }
        ]
      }

    })

    }
    event.preventDefault();
  }
  OnSearch = (event) => {
      if(event.key === "Enter"){
        console.log(event.key)
        fetch("https://warm-badlands-38064.herokuapp.com/list", {
          method:"post",
          headers:{"Content-Type": "application/json"},
          body: JSON.stringify({
            "search": event.target.value
          })
        })
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
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
  }

  onDragOver = (event) => {
    console.log("Drag over")
    event.preventDefault();
  }
  onDragStart = (event, id) => {
    console.log("Drag start", id)
    event.dataTransfer.setData("id", id)
  }
  onClick = (event, id, container, id2) => {
    console.log("Trying to Delete", id)
    console.log(id2)
    console.log(event._reactName)
    if(container === "breakfast"){
      console.log(this.state.breakfast)
      let item = this.state.breakfast.find(b => b.props.children[1] === id)
      console.log(item)
      let index = this.state.breakfast.indexOf(item)
      let array = this.state.breakfast
      array.splice(index,1)
      console.log(array)
      this.setState({breakfast:array})
      this.onChange(event, [...this.state.breakfast,...this.state.lunch,...this.state.dinner], container, id2)
    }
    if(container === "lunch"){
      console.log(this.state.lunch)
      let item = this.state.lunch.find(b => b.props.children[1] === id)
      console.log(item)
      let index = this.state.lunch.indexOf(item)
      let array = this.state.lunch
      array.splice(index,1)
      console.log(array)
      this.setState({lunch:array})
      this.onChange(event, [...this.state.breakfast,...this.state.lunch,...this.state.dinner], container, id2)
    }
    if(container === "dinner"){
      console.log(this.state.dinner)
      let item = this.state.dinner.find(b => b.props.children[1] === id)
      console.log(item)
      let index = this.state.dinner.indexOf(item)
      let array = this.state.dinner
      array.splice(index,1)
      console.log(array)
      this.setState({dinner:array})
      this.onChange(event, [...this.state.breakfast,...this.state.lunch,...this.state.dinner], container, id2)
    }

  }
  onChange = (event, container,meal, id) => {
    // PROTEIN
    if(event._reactName === "onChange"){
    console.log(container)
    console.log("qty change", event.target.value)
    console.log("qty change", event.target.getAttribute("id"))
    let status = ""
    for(let i=0; i<container.length;i++){
      if (container[i].key === id){
        for(let j=0;j<this.state.protein.length;j++){
          if(this.state.protein.length === 0){
            this.state.protein.push({id: id, meal: meal, value: (((container[i].props.nutrients[0].value) / 100 ) * (event.target.value))})
            status = "completed"
          }
          else if(this.state.protein[j].id === id & this.state.protein[j].meal === meal){
            this.state.protein[j].value = ((container[i].props.nutrients[0].value) / 100 ) * (event.target.value)
            status = "completed"
          }
        }
        if (status !== "completed"){
          this.state.protein.push({id: id, meal: meal, value: (((container[i].props.nutrients[0].value) / 100 ) * (event.target.value))})
        }
      }
    }
    let protein = 0
    for(let k=0;k<this.state.protein.length;k++){
      protein = protein + this.state.protein[k].value
    }
    console.log(protein)
  }
  if(event._reactName === "onClick"){

    console.log("Before", this.state.protein)
    for(let j=0;j<this.state.protein.length;j++){

      if(this.state.protein[j].id == id & this.state.protein[j].meal == meal){
        console.log("Removing item from protein")
        this.state.protein.splice(j,1)
      }
    console.log("After", this.state.protein)
    }
  }

    let protein = 0
    for(let k=0;k<this.state.protein.length;k++){
      protein = protein + this.state.protein[k].value
    }
    console.log(protein)
    this.setState({chartdata:{
      labels: ["Protein(g)", "Fat(g)", "Carbohydrate(g)", "Fiber(g)", "Calcium(mg)", "Iron(mg)", "Magnesium(mg)", "Phosphorous(mg)", "Potassium(mg)", "Sodium(mg)", "Zinc(mg)", "Vitamin A(mcg)", "Vitamin B1(mg)","Vitamin B2(mg)","Vitamin B3(mg)","Vitamin B6(mg)","Vitamin B9(mcg)","Vitamin B12(mcg)","Vitamin C(mg)", "Vitamin D(mcg)", "Vitamin E(mg)", "Vitamin K(mcg)"],
      datasets: [
        {
          label: "Daily Requirement",
          data:this.state.data,
          backgroundColor: ["rgba(153, 242, 145)"]
        },
        {
          label: "Your Diet Contains",
          data:[protein,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          backgroundColor: ["rgba(240, 245, 144)"]
        }
      ]
    }})
    // fat
    if(event._reactName === "onChange"){
    console.log(container)
    console.log("qty change", event.target.value)
    console.log("qty change", event.target.getAttribute("id"))
    let status = ""
    for(let i=0; i<container.length;i++){
      if (container[i].key === id){
        for(let j=0;j<this.state.fat.length;j++){
          if(this.state.fat.length === 0){
            this.state.fat.push({id: id, meal: meal, value: (((container[i].props.nutrients[1].value) / 100 ) * (event.target.value))})
            status = "completed"
          }
          else if(this.state.fat[j].id === id & this.state.fat[j].meal === meal){
            this.state.fat[j].value = ((container[i].props.nutrients[1].value) / 100 ) * (event.target.value)
            status = "completed"
          }
        }
        if (status !== "completed"){
          this.state.fat.push({id: id, meal: meal, value: (((container[i].props.nutrients[1].value) / 100 ) * (event.target.value))})
        }
      }
    }
    let fat = 0
    for(let k=0;k<this.state.fat.length;k++){
      fat = fat + this.state.fat[k].value
    }
    console.log(fat)
  }
  if(event._reactName === "onClick"){

    console.log("Before", this.state.fat)
    for(let j=0;j<this.state.fat.length;j++){

      if(this.state.fat[j].id == id & this.state.fat[j].meal == meal){
        console.log("Removing item from protein")
        this.state.fat.splice(j,1)
      }
    console.log("After", this.state.fat)
    }
  }

    let fat = 0
    for(let k=0;k<this.state.fat.length;k++){
      fat = fat + this.state.fat[k].value
    }
    console.log(fat)
    this.setState({chartdata:{
      labels: ["Protein(g)", "Fat(g)", "Carbohydrate(g)", "Fiber(g)", "Calcium(mg)", "Iron(mg)", "Magnesium(mg)", "Phosphorous(mg)", "Potassium(mg)", "Sodium(mg)", "Zinc(mg)", "Vitamin A(mcg)", "Vitamin B1(mg)","Vitamin B2(mg)","Vitamin B3(mg)","Vitamin B6(mg)","Vitamin B9(mcg)","Vitamin B12(mcg)","Vitamin C(mg)", "Vitamin D(mcg)", "Vitamin E(mg)", "Vitamin K(mcg)"],
      datasets: [
        {
          label: "Daily Requirement",
          data:[120,100,20,120,100,50,20,120,100,50,20,120,100,50,20,120,100,50,20,20,20,30],
          backgroundColor: ["rgba(153, 242, 145)"]
        },
        {
          label: "Your Diet Contains",
          data:[protein,fat,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          backgroundColor: ["rgba(240, 245, 144)"]
        }
      ]
    }})
    // carbohydrate
    if(event._reactName === "onChange"){
    console.log(container)
    console.log("qty change", event.target.value)
    console.log("qty change", event.target.getAttribute("id"))
    let status = ""
    for(let i=0; i<container.length;i++){
      if (container[i].key === id){
        for(let j=0;j<this.state.carbohydrate.length;j++){
          if(this.state.carbohydrate.length === 0){
            this.state.carbohydrate.push({id: id, meal: meal, value: (((container[i].props.nutrients[2].value) / 100 ) * (event.target.value))})
            status = "completed"
          }
          else if(this.state.carbohydrate[j].id === id & this.state.carbohydrate[j].meal === meal){
            this.state.carbohydrate[j].value = ((container[i].props.nutrients[2].value) / 100 ) * (event.target.value)
            status = "completed"
          }
        }
        if (status !== "completed"){
          this.state.carbohydrate.push({id: id, meal: meal, value: (((container[i].props.nutrients[2].value) / 100 ) * (event.target.value))})
        }
      }
    }
    let carbohydrate = 0
    for(let k=0;k<this.state.carbohydrate.length;k++){
      carbohydrate = carbohydrate + this.state.carbohydrate[k].value
    }
    console.log(carbohydrate)
  }
  if(event._reactName === "onClick"){

    console.log("Before", this.state.carbohydrate)
    for(let j=0;j<this.state.carbohydrate.length;j++){

      if(this.state.carbohydrate[j].id == id & this.state.carbohydrate[j].meal == meal){
        console.log("Removing item from protein")
        this.state.carbohydrate.splice(j,1)
      }
    console.log("After", this.state.carbohydrate)
    }
  }

    let carbohydrate = 0
    for(let k=0;k<this.state.carbohydrate.length;k++){
      carbohydrate = carbohydrate + this.state.carbohydrate[k].value
    }
    console.log(carbohydrate)
    this.setState({chartdata:{
      labels: ["Protein(g)", "Fat(g)", "Carbohydrate(g)", "Fiber(g)", "Calcium(mg)", "Iron(mg)", "Magnesium(mg)", "Phosphorous(mg)", "Potassium(mg)", "Sodium(mg)", "Zinc(mg)", "Vitamin A(mcg)", "Vitamin B1(mg)","Vitamin B2(mg)","Vitamin B3(mg)","Vitamin B6(mg)","Vitamin B9(mcg)","Vitamin B12(mcg)","Vitamin C(mg)", "Vitamin D(mcg)", "Vitamin E(mg)", "Vitamin K(mcg)"],
      datasets: [
        {
          label: "Daily Requirement",
          data:this.state.data,
          backgroundColor: ["rgba(153, 242, 145)"]
        },
        {
          label: "Your Diet Contains",
          data:[protein,fat,carbohydrate,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          backgroundColor: ["rgba(240, 245, 144)"]
        }
      ]
    }})
    // fiber
    if(event._reactName === "onChange"){
    console.log(container)
    console.log("qty change", event.target.value)
    console.log("qty change", event.target.getAttribute("id"))
    let status = ""
    for(let i=0; i<container.length;i++){
      if (container[i].key === id){
        for(let j=0;j<this.state.fiber.length;j++){
          if(this.state.fiber.length === 0){
            this.state.fiber.push({id: id, meal: meal, value: (((container[i].props.nutrients[9].value) / 100 ) * (event.target.value))})
            status = "completed"
          }
          else if(this.state.fiber[j].id === id & this.state.fiber[j].meal === meal){
            this.state.fiber[j].value = ((container[i].props.nutrients[9].value) / 100 ) * (event.target.value)
            status = "completed"
          }
        }
        if (status !== "completed"){
          this.state.fiber.push({id: id, meal: meal, value: (((container[i].props.nutrients[9].value) / 100 ) * (event.target.value))})
        }
      }
    }
    let fiber = 0
    for(let k=0;k<this.state.fiber.length;k++){
      fiber = fiber + this.state.fiber[k].value
    }
    console.log(fiber)
  }
  if(event._reactName === "onClick"){

    console.log("Before", this.state.fiber)
    for(let j=0;j<this.state.fiber.length;j++){

      if(this.state.fiber[j].id == id & this.state.fiber[j].meal == meal){
        console.log("Removing item from fiber")
        this.state.fiber.splice(j,1)
      }
    console.log("After", this.state.fiber)
    }
  }

    let fiber = 0
    for(let k=0;k<this.state.fiber.length;k++){
      fiber = fiber + this.state.fiber[k].value
    }
    console.log(fiber)
    this.setState({chartdata:{
      labels: ["Protein(g)", "Fat(g)", "Carbohydrate(g)", "Fiber(g)", "Calcium(mg)", "Iron(mg)", "Magnesium(mg)", "Phosphorous(mg)", "Potassium(mg)", "Sodium(mg)", "Zinc(mg)", "Vitamin A(mcg)", "Vitamin B1(mg)","Vitamin B2(mg)","Vitamin B3(mg)","Vitamin B6(mg)","Vitamin B9(mcg)","Vitamin B12(mcg)","Vitamin C(mg)", "Vitamin D(mcg)", "Vitamin E(mg)", "Vitamin K(mcg)"],
      datasets: [
        {
          label: "Daily Requirement",
          data:this.state.data,
          backgroundColor: ["rgba(153, 242, 145)"]
        },
        {
          label: "Your Diet Contains",
          data:[protein,fat,carbohydrate,fiber,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          backgroundColor: ["rgba(240, 245, 144)"]
        }
      ]
    }})
    // calcium
    if(event._reactName === "onChange"){
    console.log(container)
    console.log("qty change", event.target.value)
    console.log("qty change", event.target.getAttribute("id"))
    let status = ""
    for(let i=0; i<container.length;i++){
      if (container[i].key === id){
        for(let j=0;j<this.state.calcium.length;j++){
          if(this.state.calcium.length === 0){
            this.state.calcium.push({id: id, meal: meal, value: ((((container[i].props.nutrients[10].value) / 100 ) * (event.target.value)))})
            status = "completed"
          }
          else if(this.state.calcium[j].id === id & this.state.calcium[j].meal === meal){
            this.state.calcium[j].value = (((container[i].props.nutrients[10].value) / 100 ) * (event.target.value))
            status = "completed"
          }
        }
        if (status !== "completed"){
          this.state.calcium.push({id: id, meal: meal, value: ((((container[i].props.nutrients[10].value) / 100 ) * (event.target.value)))})
        }
      }
    }
    let calcium = 0
    for(let k=0;k<this.state.calcium.length;k++){
      calcium = calcium + this.state.calcium[k].value
    }
    console.log(calcium)
  }
  if(event._reactName === "onClick"){

    console.log("Before", this.state.calcium)
    for(let j=0;j<this.state.calcium.length;j++){

      if(this.state.calcium[j].id == id & this.state.calcium[j].meal == meal){
        console.log("Removing item from calcium")
        this.state.calcium.splice(j,1)
      }
    console.log("After", this.state.calcium)
    }
  }

    let calcium = 0
    for(let k=0;k<this.state.calcium.length;k++){
      calcium = calcium + this.state.calcium[k].value
    }
    console.log(calcium)
    this.setState({chartdata:{
      labels: ["Protein(g)", "Fat(g)", "Carbohydrate(g)", "Fiber(g)", "Calcium(mg)", "Iron(mg)", "Magnesium(mg)", "Phosphorous(mg)", "Potassium(mg)", "Sodium(mg)", "Zinc(mg)", "Vitamin A(mcg)", "Vitamin B1(mg)","Vitamin B2(mg)","Vitamin B3(mg)","Vitamin B6(mg)","Vitamin B9(mcg)","Vitamin B12(mcg)","Vitamin C(mg)", "Vitamin D(mcg)", "Vitamin E(mg)", "Vitamin K(mcg)"],
      datasets: [
        {
          label: "Daily Requirement",
          data:this.state.data,
          backgroundColor: ["rgba(153, 242, 145)"]
        },
        {
          label: "Your Diet Contains",
          data:[protein,fat,carbohydrate,fiber,calcium,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          backgroundColor: ["rgba(240, 245, 144)"]
        }
      ]
    }})
    // iron
    if(event._reactName === "onChange"){
    console.log(container)
    console.log("qty change", event.target.value)
    console.log("qty change", event.target.getAttribute("id"))
    let status = ""
    for(let i=0; i<container.length;i++){
      if (container[i].key === id){
        for(let j=0;j<this.state.iron.length;j++){
          if(this.state.iron.length === 0){
            this.state.iron.push({id: id, meal: meal, value: (((container[i].props.nutrients[11].value) / 100 ) * (event.target.value))})
            status = "completed"
          }
          else if(this.state.iron[j].id === id & this.state.iron[j].meal === meal){
            this.state.iron[j].value = ((container[i].props.nutrients[11].value) / 100 ) * (event.target.value)
            status = "completed"
          }
        }
        if (status !== "completed"){
          this.state.iron.push({id: id, meal: meal, value: (((container[i].props.nutrients[11].value) / 100 ) * (event.target.value))})
        }
      }
    }
    let iron = 0
    for(let k=0;k<this.state.iron.length;k++){
      iron = iron + this.state.iron[k].value
    }
    console.log(iron)
  }
  if(event._reactName === "onClick"){

    console.log("Before", this.state.iron)
    for(let j=0;j<this.state.iron.length;j++){

      if(this.state.iron[j].id == id & this.state.iron[j].meal == meal){
        console.log("Removing item from iron")
        this.state.iron.splice(j,1)
      }
    console.log("After", this.state.iron)
    }
  }

    let iron = 0
    for(let k=0;k<this.state.iron.length;k++){
      iron = iron + this.state.iron[k].value
    }
    console.log(iron)
    this.setState({chartdata:{
      labels: ["Protein(g)", "Fat(g)", "Carbohydrate(g)", "Fiber(g)", "Calcium(mg)", "Iron(mg)", "Magnesium(mg)", "Phosphorous(mg)", "Potassium(mg)", "Sodium(mg)", "Zinc(mg)", "Vitamin A(mcg)", "Vitamin B1(mg)","Vitamin B2(mg)","Vitamin B3(mg)","Vitamin B6(mg)","Vitamin B9(mcg)","Vitamin B12(mcg)","Vitamin C(mg)", "Vitamin D(mcg)", "Vitamin E(mg)", "Vitamin K(mcg)"],
      datasets: [
        {
          label: "Daily Requirement",
          data:this.state.data,
          backgroundColor: ["rgba(153, 242, 145)"]
        },
        {
          label: "Your Diet Contains",
          data:[protein,fat,carbohydrate,fiber,calcium,iron,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          backgroundColor: ["rgba(240, 245, 144)"]
        }
      ]
    }})
    // magnesium
    if(event._reactName === "onChange"){
    console.log(container)
    console.log("qty change", event.target.value)
    console.log("qty change", event.target.getAttribute("id"))
    let status = ""
    for(let i=0; i<container.length;i++){
      if (container[i].key === id){
        for(let j=0;j<this.state.magnesium.length;j++){
          if(this.state.magnesium.length === 0){
            this.state.magnesium.push({id: id, meal: meal, value: ((((container[i].props.nutrients[12].value) / 100 ) * (event.target.value)))})
            status = "completed"
          }
          else if(this.state.magnesium[j].id === id & this.state.magnesium[j].meal === meal){
            this.state.magnesium[j].value = (((container[i].props.nutrients[12].value) / 100 ) * (event.target.value))
            status = "completed"
          }
        }
        if (status !== "completed"){
          this.state.magnesium.push({id: id, meal: meal, value: ((((container[i].props.nutrients[12].value) / 100 ) * (event.target.value)))})
        }
      }
    }
    let magnesium = 0
    for(let k=0;k<this.state.magnesium.length;k++){
      magnesium = magnesium + this.state.magnesium[k].value
    }
    console.log(magnesium)
  }
  if(event._reactName === "onClick"){

    console.log("Before", this.state.magnesium)
    for(let j=0;j<this.state.magnesium.length;j++){

      if(this.state.magnesium[j].id == id & this.state.magnesium[j].meal == meal){
        console.log("Removing item from magnesium")
        this.state.magnesium.splice(j,1)
      }
    console.log("After", this.state.magnesium)
    }
  }

    let magnesium = 0
    for(let k=0;k<this.state.magnesium.length;k++){
      magnesium = magnesium + this.state.magnesium[k].value
    }
    console.log(magnesium)
    this.setState({chartdata:{
      labels: ["Protein(g)", "Fat(g)", "Carbohydrate(g)", "Fiber(g)", "Calcium(mg)", "Iron(mg)", "Magnesium(mg)", "Phosphorous(mg)", "Potassium(mg)", "Sodium(mg)", "Zinc(mg)", "Vitamin A(mcg)", "Vitamin B1(mg)","Vitamin B2(mg)","Vitamin B3(mg)","Vitamin B6(mg)","Vitamin B9(mcg)","Vitamin B12(mcg)","Vitamin C(mg)", "Vitamin D(mcg)", "Vitamin E(mg)", "Vitamin K(mcg)"],
      datasets: [
        {
          label: "Daily Requirement",
          data:this.state.data,
          backgroundColor: ["rgba(153, 242, 145)"]
        },
        {
          label: "Your Diet Contains",
          data:[protein,fat,carbohydrate,fiber,calcium,iron,magnesium,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          backgroundColor: ["rgba(240, 245, 144)"]
        }
      ]
    }})
    // phosphorous
    if(event._reactName === "onChange"){
    console.log(container)
    console.log("qty change", event.target.value)
    console.log("qty change", event.target.getAttribute("id"))
    let status = ""
    for(let i=0; i<container.length;i++){
      if (container[i].key === id){
        for(let j=0;j<this.state.phosphorous.length;j++){
          if(this.state.phosphorous.length === 0){
            this.state.phosphorous.push({id: id, meal: meal, value: ((((container[i].props.nutrients[13].value) / 100 ) * (event.target.value)))})
            status = "completed"
          }
          else if(this.state.phosphorous[j].id === id & this.state.phosphorous[j].meal === meal){
            this.state.phosphorous[j].value = (((container[i].props.nutrients[13].value) / 100 ) * (event.target.value))
            status = "completed"
          }
        }
        if (status !== "completed"){
          this.state.phosphorous.push({id: id, meal: meal, value: ((((container[i].props.nutrients[13].value) / 100 ) * (event.target.value)))})
        }
      }
    }
    let phosphorous = 0
    for(let k=0;k<this.state.phosphorous.length;k++){
      phosphorous = phosphorous + this.state.phosphorous[k].value
    }
    console.log(phosphorous)
  }
  if(event._reactName === "onClick"){

    console.log("Before", this.state.phosphorous)
    for(let j=0;j<this.state.phosphorous.length;j++){

      if(this.state.phosphorous[j].id == id & this.state.phosphorous[j].meal == meal){
        console.log("Removing item from phosphorous")
        this.state.phosphorous.splice(j,1)
      }
    console.log("After", this.state.phosphorous)
    }
  }

    let phosphorous = 0
    for(let k=0;k<this.state.phosphorous.length;k++){
      phosphorous = phosphorous + this.state.phosphorous[k].value
    }
    console.log(phosphorous)
    this.setState({chartdata:{
      labels: ["Protein(g)", "Fat(g)", "Carbohydrate(g)", "Fiber(g)", "Calcium(mg)", "Iron(mg)", "Magnesium(mg)", "Phosphorous(mg)", "Potassium(mg)", "Sodium(mg)", "Zinc(mg)", "Vitamin A(mcg)", "Vitamin B1(mg)","Vitamin B2(mg)","Vitamin B3(mg)","Vitamin B6(mg)","Vitamin B9(mcg)","Vitamin B12(mcg)","Vitamin C(mg)", "Vitamin D(mcg)", "Vitamin E(mg)", "Vitamin K(mcg)"],
      datasets: [
        {
          label: "Daily Requirement",
          data:this.state.data,
          backgroundColor: ["rgba(153, 242, 145)"]
        },
        {
          label: "Your Diet Contains",
          data:[protein,fat,carbohydrate,fiber,calcium,iron,magnesium,phosphorous,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          backgroundColor: ["rgba(240, 245, 144)"]
        }
      ]
    }})
    // potassium
    if(event._reactName === "onChange"){
    console.log(container)
    console.log("qty change", event.target.value)
    console.log("qty change", event.target.getAttribute("id"))
    let status = ""
    for(let i=0; i<container.length;i++){
      if (container[i].key === id){
        for(let j=0;j<this.state.potassium.length;j++){
          if(this.state.potassium.length === 0){
            this.state.potassium.push({id: id, meal: meal, value: (((container[i].props.nutrients[14].value) / 100 ) * (event.target.value))})
            status = "completed"
          }
          else if(this.state.potassium[j].id === id & this.state.potassium[j].meal === meal){
            this.state.potassium[j].value = ((container[i].props.nutrients[14].value) / 100 ) * (event.target.value)
            status = "completed"
          }
        }
        if (status !== "completed"){
          this.state.potassium.push({id: id, meal: meal, value: (((container[i].props.nutrients[14].value) / 100 ) * (event.target.value))})
        }
      }
    }
    let potassium = 0
    for(let k=0;k<this.state.potassium.length;k++){
      potassium = potassium + this.state.potassium[k].value
    }
    console.log(potassium)
  }
  if(event._reactName === "onClick"){

    console.log("Before", this.state.potassium)
    for(let j=0;j<this.state.potassium.length;j++){

      if(this.state.potassium[j].id == id & this.state.potassium[j].meal == meal){
        console.log("Removing item from potassium")
        this.state.potassium.splice(j,1)
      }
    console.log("After", this.state.potassium)
    }
  }

    let potassium = 0
    for(let k=0;k<this.state.potassium.length;k++){
      potassium = potassium + this.state.potassium[k].value
    }
    console.log(potassium)
    this.setState({chartdata:{
      labels: ["Protein(g)", "Fat(g)", "Carbohydrate(g)", "Fiber(g)", "Calcium(mg)", "Iron(mg)", "Magnesium(mg)", "Phosphorous(mg)", "Potassium(mg)", "Sodium(mg)", "Zinc(mg)", "Vitamin A(mcg)", "Vitamin B1(mg)","Vitamin B2(mg)","Vitamin B3(mg)","Vitamin B6(mg)","Vitamin B9(mcg)","Vitamin B12(mcg)","Vitamin C(mg)", "Vitamin D(mcg)", "Vitamin E(mg)", "Vitamin K(mcg)"],
      datasets: [
        {
          label: "Daily Requirement",
          data:this.state.data,
          backgroundColor: ["rgba(153, 242, 145)"]
        },
        {
          label: "Your Diet Contains",
          data:[protein,fat,carbohydrate,fiber,calcium,iron,magnesium,phosphorous,potassium,0,0,0,0,0,0,0,0,0,0,0,0,0],
          backgroundColor: ["rgba(240, 245, 144)"]
        }
      ]
    }})
    // sodium
    if(event._reactName === "onChange"){
    console.log(container)
    console.log("qty change", event.target.value)
    console.log("qty change", event.target.getAttribute("id"))
    let status = ""
    for(let i=0; i<container.length;i++){
      if (container[i].key === id){
        for(let j=0;j<this.state.sodium.length;j++){
          if(this.state.sodium.length === 0){
            this.state.sodium.push({id: id, meal: meal, value: (((container[i].props.nutrients[15].value) / 100 ) * (event.target.value))})
            status = "completed"
          }
          else if(this.state.sodium[j].id === id & this.state.sodium[j].meal === meal){
            this.state.sodium[j].value = ((container[i].props.nutrients[15].value) / 100 ) * (event.target.value)
            status = "completed"
          }
        }
        if (status !== "completed"){
          this.state.sodium.push({id: id, meal: meal, value: (((container[i].props.nutrients[15].value) / 100 ) * (event.target.value))})
        }
      }
    }
    let sodium = 0
    for(let k=0;k<this.state.sodium.length;k++){
      sodium = sodium + this.state.sodium[k].value
    }
    console.log(sodium)
  }
  if(event._reactName === "onClick"){

    console.log("Before", this.state.sodium)
    for(let j=0;j<this.state.sodium.length;j++){

      if(this.state.sodium[j].id == id & this.state.sodium[j].meal == meal){
        console.log("Removing item from sodium")
        this.state.sodium.splice(j,1)
      }
    console.log("After", this.state.sodium)
    }
  }

    let sodium = 0
    for(let k=0;k<this.state.sodium.length;k++){
      sodium = sodium + this.state.sodium[k].value
    }
    console.log(sodium)
    this.setState({chartdata:{
      labels: ["Protein(g)", "Fat(g)", "Carbohydrate(g)", "Fiber(g)", "Calcium(mg)", "Iron(mg)", "Magnesium(mg)", "Phosphorous(mg)", "Potassium(mg)", "Sodium(mg)", "Zinc(mg)", "Vitamin A(mcg)", "Vitamin B1(mg)","Vitamin B2(mg)","Vitamin B3(mg)","Vitamin B6(mg)","Vitamin B9(mcg)","Vitamin B12(mcg)","Vitamin C(mg)", "Vitamin D(mcg)", "Vitamin E(mg)", "Vitamin K(mcg)"],
      datasets: [
        {
          label: "Daily Requirement",
          data:this.state.data,
          backgroundColor: ["rgba(153, 242, 145)"]
        },
        {
          label: "Your Diet Contains",
          data:[protein,fat,carbohydrate,fiber,calcium,iron,magnesium,phosphorous,potassium,sodium,0,0,0,0,0,0,0,0,0,0,0,0],
          backgroundColor: ["rgba(240, 245, 144)"]
        }
      ]
    }})
    // zinc
    if(event._reactName === "onChange"){
    console.log(container)
    console.log("qty change", event.target.value)
    console.log("qty change", event.target.getAttribute("id"))
    let status = ""
    for(let i=0; i<container.length;i++){
      if (container[i].key === id){
        for(let j=0;j<this.state.zinc.length;j++){
          if(this.state.zinc.length === 0){
            this.state.zinc.push({id: id, meal: meal, value: (((container[i].props.nutrients[16].value) / 100 ) * (event.target.value))})
            status = "completed"
          }
          else if(this.state.zinc[j].id === id & this.state.zinc[j].meal === meal){
            this.state.zinc[j].value = ((container[i].props.nutrients[16].value) / 100 ) * (event.target.value)
            status = "completed"
          }
        }
        if (status !== "completed"){
          this.state.zinc.push({id: id, meal: meal, value: (((container[i].props.nutrients[16].value) / 100 ) * (event.target.value))})
        }
      }
    }
    let zinc = 0
    for(let k=0;k<this.state.zinc.length;k++){
      zinc = zinc + this.state.zinc[k].value
    }
    console.log(zinc)
  }
  if(event._reactName === "onClick"){

    console.log("Before", this.state.zinc)
    for(let j=0;j<this.state.zinc.length;j++){

      if(this.state.zinc[j].id == id & this.state.zinc[j].meal == meal){
        console.log("Removing item from zinc")
        this.state.zinc.splice(j,1)
      }
    console.log("After", this.state.zinc)
    }
  }

    let zinc = 0
    for(let k=0;k<this.state.zinc.length;k++){
      zinc = zinc + this.state.zinc[k].value
    }
    console.log(zinc)
    this.setState({chartdata:{
      labels: ["Protein(g)", "Fat(g)", "Carbohydrate(g)", "Fiber(g)", "Calcium(mg)", "Iron(mg)", "Magnesium(mg)", "Phosphorous(mg)", "Potassium(mg)", "Sodium(mg)", "Zinc(mg)", "Vitamin A(mcg)", "Vitamin B1(mg)","Vitamin B2(mg)","Vitamin B3(mg)","Vitamin B6(mg)","Vitamin B9(mcg)","Vitamin B12(mcg)","Vitamin C(mg)", "Vitamin D(mcg)", "Vitamin E(mg)", "Vitamin K(mcg)"],
      datasets: [
        {
          label: "Daily Requirement",
          data:this.state.data,
          backgroundColor: ["rgba(153, 242, 145)"]
        },
        {
          label: "Your Diet Contains",
          data:[protein,fat,carbohydrate,fiber,calcium,iron,magnesium,phosphorous,potassium,sodium,zinc,0,0,0,0,0,0,0,0,0,0,0],
          backgroundColor: ["rgba(240, 245, 144)"]
        }
      ]
    }})
    // vita
    if(event._reactName === "onChange"){
    console.log(container)
    console.log("qty change", event.target.value)
    console.log("qty change", event.target.getAttribute("id"))
    let status = ""
    for(let i=0; i<container.length;i++){
      if (container[i].key === id){
        for(let j=0;j<this.state.vita.length;j++){
          if(this.state.vita.length === 0){
            this.state.vita.push({id: id, meal: meal, value: ((((container[i].props.nutrients[20].value) / 100 ) * (event.target.value)))})
            status = "completed"
          }
          else if(this.state.vita[j].id === id & this.state.vita[j].meal === meal){
            this.state.vita[j].value = (((container[i].props.nutrients[20].value) / 100 ) * (event.target.value))
            status = "completed"
          }
        }
        if (status !== "completed"){
          this.state.vita.push({id: id, meal: meal, value: ((((container[i].props.nutrients[20].value) / 100 ) * (event.target.value)))})
        }
      }
    }
    let vita = 0
    for(let k=0;k<this.state.vita.length;k++){
      vita = vita + this.state.vita[k].value
    }
    console.log(vita)
  }
  if(event._reactName === "onClick"){

    console.log("Before", this.state.vita)
    for(let j=0;j<this.state.vita.length;j++){

      if(this.state.vita[j].id == id & this.state.vita[j].meal == meal){
        console.log("Removing item from vita")
        this.state.vita.splice(j,1)
      }
    console.log("After", this.state.vita)
    }
  }

    let vita = 0
    for(let k=0;k<this.state.vita.length;k++){
      vita = vita + this.state.vita[k].value
    }
    console.log(vita)
    this.setState({chartdata:{
      labels: ["Protein(g)", "Fat(g)", "Carbohydrate(g)", "Fiber(g)", "Calcium(mg)", "Iron(mg)", "Magnesium(mg)", "Phosphorous(mg)", "Potassium(mg)", "Sodium(mg)", "Zinc(mg)", "Vitamin A(mcg)", "Vitamin B1(mg)","Vitamin B2(mg)","Vitamin B3(mg)","Vitamin B6(mg)","Vitamin B9(mcg)","Vitamin B12(mcg)","Vitamin C(mg)", "Vitamin D(mcg)", "Vitamin E(mg)", "Vitamin K(mcg)"],
      datasets: [
        {
          label: "Daily Requirement",
          data:this.state.data,
          backgroundColor: ["rgba(153, 242, 145)"]
        },
        {
          label: "Your Diet Contains",
          data:[protein,fat,carbohydrate,fiber,calcium,iron,magnesium,phosphorous,potassium,sodium,zinc,vita,0,0,0,0,0,0,0,0,0,0],
          backgroundColor: ["rgba(240, 245, 144)"]
        }
      ]
    }})
    // vitb1
    if(event._reactName === "onChange"){
    console.log(container)
    console.log("qty change", event.target.value)
    console.log("qty change", event.target.getAttribute("id"))
    let status = ""
    for(let i=0; i<container.length;i++){
      if (container[i].key === id){
        for(let j=0;j<this.state.vitb1.length;j++){
          if(this.state.vitb1.length === 0){
            this.state.vitb1.push({id: id, meal: meal, value: (((container[i].props.nutrients[29].value) / 100 ) * (event.target.value))})
            status = "completed"
          }
          else if(this.state.vitb1[j].id === id & this.state.vitb1[j].meal === meal){
            this.state.vitb1[j].value = ((container[i].props.nutrients[29].value) / 100 ) * (event.target.value)
            status = "completed"
          }
        }
        if (status !== "completed"){
          this.state.vitb1.push({id: id, meal: meal, value: (((container[i].props.nutrients[29].value) / 100 ) * (event.target.value))})
        }
      }
    }
    let vitb1 = 0
    for(let k=0;k<this.state.vitb1.length;k++){
      vitb1 = vitb1 + this.state.vitb1[k].value
    }
    console.log(vitb1)
  }
  if(event._reactName === "onClick"){

    console.log("Before", this.state.vitb1)
    for(let j=0;j<this.state.vitb1.length;j++){

      if(this.state.vitb1[j].id == id & this.state.vitb1[j].meal == meal){
        console.log("Removing item from vitb1")
        this.state.vitb1.splice(j,1)
      }
    console.log("After", this.state.vitb1)
    }
  }

    let vitb1 = 0
    for(let k=0;k<this.state.vitb1.length;k++){
      vitb1 = vitb1 + this.state.vitb1[k].value
    }
    console.log(vitb1)
    this.setState({chartdata:{
      labels: ["Protein(g)", "Fat(g)", "Carbohydrate(g)", "Fiber(g)", "Calcium(mg)", "Iron(mg)", "Magnesium(mg)", "Phosphorous(mg)", "Potassium(mg)", "Sodium(mg)", "Zinc(mg)", "Vitamin A(mcg)", "Vitamin B1(mg)","Vitamin B2(mg)","Vitamin B3(mg)","Vitamin B6(mg)","Vitamin B9(mcg)","Vitamin B12(mcg)","Vitamin C(mg)", "Vitamin D(mcg)", "Vitamin E(mg)", "Vitamin K(mcg)"],
      datasets: [
        {
          label: "Daily Requirement",
          data:this.state.data,
          backgroundColor: ["rgba(153, 242, 145)"]
        },
        {
          label: "Your Diet Contains",
          data:[protein,fat,carbohydrate,fiber,calcium,iron,magnesium,phosphorous,potassium,sodium,zinc,vita,vitb1,0,0,0,0,0,0,0,0,0],
          backgroundColor: ["rgba(240, 245, 144)"]
        }
      ]
    }})
    // vitb2
    if(event._reactName === "onChange"){
    console.log(container)
    console.log("qty change", event.target.value)
    console.log("qty change", event.target.getAttribute("id"))
    let status = ""
    for(let i=0; i<container.length;i++){
      if (container[i].key === id){
        for(let j=0;j<this.state.vitb2.length;j++){
          if(this.state.vitb2.length === 0){
            this.state.vitb2.push({id: id, meal: meal, value: (((container[i].props.nutrients[30].value) / 100 ) * (event.target.value))})
            status = "completed"
          }
          else if(this.state.vitb2[j].id === id & this.state.vitb2[j].meal === meal){
            this.state.vitb2[j].value = ((container[i].props.nutrients[30].value) / 100 ) * (event.target.value)
            status = "completed"
          }
        }
        if (status !== "completed"){
          this.state.vitb2.push({id: id, meal: meal, value: (((container[i].props.nutrients[30].value) / 100 ) * (event.target.value))})
        }
      }
    }
    let vitb2 = 0
    for(let k=0;k<this.state.vitb2.length;k++){
      vitb2 = vitb2 + this.state.vitb2[k].value
    }
    console.log(vitb2)
  }
  if(event._reactName === "onClick"){

    console.log("Before", this.state.vitb2)
    for(let j=0;j<this.state.vitb2.length;j++){

      if(this.state.vitb2[j].id == id & this.state.vitb2[j].meal == meal){
        console.log("Removing item from vitb2")
        this.state.vitb2.splice(j,1)
      }
    console.log("After", this.state.vitb2)
    }
  }

    let vitb2 = 0
    for(let k=0;k<this.state.vitb2.length;k++){
      vitb2 = vitb2 + this.state.vitb2[k].value
    }
    console.log(vitb2)
    this.setState({chartdata:{
      labels: ["Protein(g)", "Fat(g)", "Carbohydrate(g)", "Fiber(g)", "Calcium(mg)", "Iron(mg)", "Magnesium(mg)", "Phosphorous(mg)", "Potassium(mg)", "Sodium(mg)", "Zinc(mg)", "Vitamin A(mcg)", "Vitamin B1(mg)","Vitamin B2(mg)","Vitamin B3(mg)","Vitamin B6(mg)","Vitamin B9(mcg)","Vitamin B12(mcg)","Vitamin C(mg)", "Vitamin D(mcg)", "Vitamin E(mg)", "Vitamin K(mcg)"],
      datasets: [
        {
          label: "Daily Requirement",
          data:this.state.data,
          backgroundColor: ["rgba(153, 242, 145)"]
        },
        {
          label: "Your Diet Contains",
          data:[protein,fat,carbohydrate,fiber,calcium,iron,magnesium,phosphorous,potassium,sodium,zinc,vita,vitb1,vitb2,0,0,0,0,0,0,0,0],
          backgroundColor: ["rgba(240, 245, 144)"]
        }
      ]
    }})
    // vitb3
    if(event._reactName === "onChange"){
    console.log(container)
    console.log("qty change", event.target.value)
    console.log("qty change", event.target.getAttribute("id"))
    let status = ""
    for(let i=0; i<container.length;i++){
      if (container[i].key === id){
        for(let j=0;j<this.state.vitb3.length;j++){
          if(this.state.vitb3.length === 0){
            this.state.vitb3.push({id: id, meal: meal, value: (((container[i].props.nutrients[31].value) / 100 ) * (event.target.value))})
            status = "completed"
          }
          else if(this.state.vitb3[j].id === id & this.state.vitb3[j].meal === meal){
            this.state.vitb3[j].value = ((container[i].props.nutrients[31].value) / 100 ) * (event.target.value)
            status = "completed"
          }
        }
        if (status !== "completed"){
          this.state.vitb3.push({id: id, meal: meal, value: (((container[i].props.nutrients[31].value) / 100 ) * (event.target.value))})
        }
      }
    }
    let vitb3 = 0
    for(let k=0;k<this.state.vitb2.length;k++){
      vitb3 = vitb3 + this.state.vitb3[k].value
    }
    console.log(vitb3)
  }
  if(event._reactName === "onClick"){

    console.log("Before", this.state.vitb3)
    for(let j=0;j<this.state.vitb3.length;j++){

      if(this.state.vitb3[j].id == id & this.state.vitb3[j].meal == meal){
        console.log("Removing item from vitb3")
        this.state.vitb3.splice(j,1)
      }
    console.log("After", this.state.vitb3)
    }
  }

    let vitb3 = 0
    for(let k=0;k<this.state.vitb3.length;k++){
      vitb3 = vitb3 + this.state.vitb3[k].value
    }
    console.log(vitb3)
    this.setState({chartdata:{
      labels: ["Protein(g)", "Fat(g)", "Carbohydrate(g)", "Fiber(g)", "Calcium(mg)", "Iron(mg)", "Magnesium(mg)", "Phosphorous(mg)", "Potassium(mg)", "Sodium(mg)", "Zinc(mg)", "Vitamin A(mcg)", "Vitamin B1(mg)","Vitamin B2(mg)","Vitamin B3(mg)","Vitamin B6(mg)","Vitamin B9(mcg)","Vitamin B12(mcg)","Vitamin C(mg)", "Vitamin D(mcg)", "Vitamin E(mg)", "Vitamin K(mcg)"],
      datasets: [
        {
          label: "Daily Requirement",
          data:this.state.data,
          backgroundColor: ["rgba(153, 242, 145)"]
        },
        {
          label: "Your Diet Contains",
          data:[protein,fat,carbohydrate,fiber,calcium,iron,magnesium,phosphorous,potassium,sodium,zinc,vita,vitb1,vitb2,vitb3,0,0,0,0,0,0,0],
          backgroundColor: ["rgba(240, 245, 144)"]
        }
      ]
    }})
    // vitb6
    if(event._reactName === "onChange"){
    console.log(container)
    console.log("qty change", event.target.value)
    console.log("qty change", event.target.getAttribute("id"))
    let status = ""
    for(let i=0; i<container.length;i++){
      if (container[i].key === id){
        for(let j=0;j<this.state.vitb6.length;j++){
          if(this.state.vitb6.length === 0){
            this.state.vitb6.push({id: id, meal: meal, value: (((container[i].props.nutrients[32].value) / 100 ) * (event.target.value))})
            status = "completed"
          }
          else if(this.state.vitb6[j].id === id & this.state.vitb6[j].meal === meal){
            this.state.vitb6[j].value = ((container[i].props.nutrients[32].value) / 100 ) * (event.target.value)
            status = "completed"
          }
        }
        if (status !== "completed"){
          this.state.vitb6.push({id: id, meal: meal, value: (((container[i].props.nutrients[32].value) / 100 ) * (event.target.value))})
        }
      }
    }
    let vitb6 = 0
    for(let k=0;k<this.state.vitb6.length;k++){
      vitb6 = vitb6 + this.state.vitb6[k].value
    }
    console.log(vitb6)
  }
  if(event._reactName === "onClick"){

    console.log("Before", this.state.vitb6)
    for(let j=0;j<this.state.vitb6.length;j++){

      if(this.state.vitb6[j].id == id & this.state.vitb6[j].meal == meal){
        console.log("Removing item from vitb6")
        this.state.vitb6.splice(j,1)
      }
    console.log("After", this.state.vitb6)
    }
  }

    let vitb6 = 0
    for(let k=0;k<this.state.vitb6.length;k++){
      vitb6 = vitb6 + this.state.vitb6[k].value
    }
    console.log(vitb6)
    this.setState({chartdata:{
      labels: ["Protein(g)", "Fat(g)", "Carbohydrate(g)", "Fiber(g)", "Calcium(mg)", "Iron(mg)", "Magnesium(mg)", "Phosphorous(mg)", "Potassium(mg)", "Sodium(mg)", "Zinc(mg)", "Vitamin A(mcg)", "Vitamin B1(mg)","Vitamin B2(mg)","Vitamin B3(mg)","Vitamin B6(mg)","Vitamin B9(mcg)","Vitamin B12(mcg)","Vitamin C(mg)", "Vitamin D(mcg)", "Vitamin E(mg)", "Vitamin K(mcg)"],
      datasets: [
        {
          label: "Daily Requirement",
          data:[120,100,20,120,100,50,20,120,100,50,20,120,100,50,20,120,100,50,20,20,20,30],
          backgroundColor: ["rgba(153, 242, 145)"]
        },
        {
          label: "Your Diet Contains",
          data:[protein,fat,carbohydrate,fiber,calcium,iron,magnesium,phosphorous,potassium,sodium,zinc,vita,vitb1,vitb2,vitb3,vitb6,0,0,0,0,0,0],
          backgroundColor: ["rgba(240, 245, 144)"]
        }
      ]
    }})
    // vitb9
    if(event._reactName === "onChange"){
    console.log(container)
    console.log("qty change", event.target.value)
    console.log("qty change", event.target.getAttribute("id"))
    let status = ""
    for(let i=0; i<container.length;i++){
      if (container[i].key === id){
        for(let j=0;j<this.state.vitb9.length;j++){
          if(this.state.vitb9.length === 0){
            this.state.vitb9.push({id: id, meal: meal, value: ((((container[i].props.nutrients[33].value) / 100 ) * (event.target.value)))})
            status = "completed"
          }
          else if(this.state.vitb9[j].id === id & this.state.vitb9[j].meal === meal){
            this.state.vitb9[j].value = (((container[i].props.nutrients[33].value) / 100 ) * (event.target.value))
            status = "completed"
          }
        }
        if (status !== "completed"){
          this.state.vitb9.push({id: id, meal: meal, value: ((((container[i].props.nutrients[33].value) / 100 ) * (event.target.value)))})
        }
      }
    }
    let vitb9 = 0
    for(let k=0;k<this.state.vitb9.length;k++){
      vitb9 = vitb9 + this.state.vitb9[k].value
    }
    console.log(vitb9)
  }
  if(event._reactName === "onClick"){

    console.log("Before", this.state.vitb9)
    for(let j=0;j<this.state.vitb9.length;j++){

      if(this.state.vitb9[j].id == id & this.state.vitb9[j].meal == meal){
        console.log("Removing item from vitb9")
        this.state.vitb9.splice(j,1)
      }
    console.log("After", this.state.vitb9)
    }
  }

    let vitb9 = 0
    for(let k=0;k<this.state.vitb9.length;k++){
      vitb9 = vitb9 + this.state.vitb9[k].value
    }
    console.log(vitb9)
    this.setState({chartdata:{
      labels:["Protein(g)", "Fat(g)", "Carbohydrate(g)", "Fiber(g)", "Calcium(mg)", "Iron(mg)", "Magnesium(mg)", "Phosphorous(mg)", "Potassium(mg)", "Sodium(mg)", "Zinc(mg)", "Vitamin A(mcg)", "Vitamin B1(mg)","Vitamin B2(mg)","Vitamin B3(mg)","Vitamin B6(mg)","Vitamin B9(mcg)","Vitamin B12(mcg)","Vitamin C(mg)", "Vitamin D(mcg)", "Vitamin E(mg)", "Vitamin K(mcg)"],
      datasets: [
        {
          label: "Daily Requirement",
          data:this.state.data,
          backgroundColor: ["rgba(153, 242, 145)"]
        },
        {
          label: "Your Diet Contains",
          data:[protein,fat,carbohydrate,fiber,calcium,iron,magnesium,phosphorous,potassium,sodium,zinc,vita,vitb1,vitb2,vitb3,vitb6,vitb9,0,0,0,0,0],
          backgroundColor: ["rgba(240, 245, 144)"]
        }
      ]
    }})
    // vitb12
    if(event._reactName === "onChange"){
    console.log(container)
    console.log("qty change", event.target.value)
    console.log("qty change", event.target.getAttribute("id"))
    let status = ""
    for(let i=0; i<container.length;i++){
      if (container[i].key === id){
        for(let j=0;j<this.state.vitb12.length;j++){
          if(this.state.vitb12.length === 0){
            this.state.vitb12.push({id: id, meal: meal, value: (((container[i].props.nutrients[34].value) / 100 ) * (event.target.value))})
            status = "completed"
          }
          else if(this.state.vitb12[j].id === id & this.state.vitb12[j].meal === meal){
            this.state.vitb12[j].value = ((container[i].props.nutrients[34].value) / 100 ) * (event.target.value)
            status = "completed"
          }
        }
        if (status !== "completed"){
          this.state.vitb12.push({id: id, meal: meal, value: (((container[i].props.nutrients[34].value) / 100 ) * (event.target.value))})
        }
      }
    }
    let vitb12 = 0
    for(let k=0;k<this.state.vitb12.length;k++){
      vitb12 = vitb12 + this.state.vitb12[k].value
    }
    console.log(vitb12)
  }
  if(event._reactName === "onClick"){

    console.log("Before", this.state.vitb12)
    for(let j=0;j<this.state.vitb12.length;j++){

      if(this.state.vitb12[j].id == id & this.state.vitb12[j].meal == meal){
        console.log("Removing item from vitb12")
        this.state.vitb12.splice(j,1)
      }
    console.log("After", this.state.vitb12)
    }
  }

    let vitb12 = 0
    for(let k=0;k<this.state.vitb12.length;k++){
      vitb12 = vitb12 + this.state.vitb12[k].value
    }
    console.log(vitb12)
    this.setState({chartdata:{
      labels: ["Protein(g)", "Fat(g)", "Carbohydrate(g)", "Fiber(g)", "Calcium(mg)", "Iron(mg)", "Magnesium(mg)", "Phosphorous(mg)", "Potassium(mg)", "Sodium(mg)", "Zinc(mg)", "Vitamin A(mcg)", "Vitamin B1(mg)","Vitamin B2(mg)","Vitamin B3(mg)","Vitamin B6(mg)","Vitamin B9(mcg)","Vitamin B12(mcg)","Vitamin C(mg)", "Vitamin D(mcg)", "Vitamin E(mg)", "Vitamin K(mcg)"],
      datasets: [
        {
          label: "Daily Requirement",
          data:this.state.data,
          backgroundColor: ["rgba(153, 242, 145)"]
        },
        {
          label: "Your Diet Contains",
          data:[protein,fat,carbohydrate,fiber,calcium,iron,magnesium,phosphorous,potassium,sodium,zinc,vita,vitb1,vitb2,vitb3,vitb6,vitb9,vitb12,0,0,0,0],
          backgroundColor: ["rgba(240, 245, 144)"]
        }
      ]
    }})
    // vitc
    if(event._reactName === "onChange"){
    console.log(container)
    console.log("qty change", event.target.value)
    console.log("qty change", event.target.getAttribute("id"))
    let status = ""
    for(let i=0; i<container.length;i++){
      if (container[i].key === id){
        for(let j=0;j<this.state.vitc.length;j++){
          if(this.state.vitc.length === 0){
            this.state.vitc.push({id: id, meal: meal, value: (((container[i].props.nutrients[28].value) / 100 ) * (event.target.value))})
            status = "completed"
          }
          else if(this.state.vitc[j].id === id & this.state.vitc[j].meal === meal){
            this.state.vitc[j].value = ((container[i].props.nutrients[28].value) / 100 ) * (event.target.value)
            status = "completed"
          }
        }
        if (status !== "completed"){
          this.state.vitc.push({id: id, meal: meal, value: (((container[i].props.nutrients[28].value) / 100 ) * (event.target.value))})
        }
      }
    }
    let vitc = 0
    for(let k=0;k<this.state.vitc.length;k++){
      vitc = vitc + this.state.vitc[k].value
    }
    console.log(vitc)
  }
  if(event._reactName === "onClick"){

    console.log("Before", this.state.vitc)
    for(let j=0;j<this.state.vitc.length;j++){

      if(this.state.vitc[j].id == id & this.state.vitc[j].meal == meal){
        console.log("Removing item from vitc")
        this.state.vitc.splice(j,1)
      }
    console.log("After", this.state.vitc)
    }
  }

    let vitc = 0
    for(let k=0;k<this.state.vitc.length;k++){
      vitc = vitc + this.state.vitc[k].value
    }
    console.log(vitc)
    this.setState({chartdata:{
      labels: ["Protein(g)", "Fat(g)", "Carbohydrate(g)", "Fiber(g)", "Calcium(mg)", "Iron(mg)", "Magnesium(mg)", "Phosphorous(mg)", "Potassium(mg)", "Sodium(mg)", "Zinc(mg)", "Vitamin A(mcg)", "Vitamin B1(mg)","Vitamin B2(mg)","Vitamin B3(mg)","Vitamin B6(mg)","Vitamin B9(mcg)","Vitamin B12(mcg)","Vitamin C(mg)", "Vitamin D(mcg)", "Vitamin E(mg)", "Vitamin K(mcg)"],
      datasets: [
        {
          label: "Daily Requirement",
          data:this.state.data,
          backgroundColor: ["rgba(153, 242, 145)"]
        },
        {
          label: "Your Diet Contains",
          data:[protein,fat,carbohydrate,fiber,calcium,iron,magnesium,phosphorous,potassium,sodium,zinc,vita,vitb1,vitb2,vitb3,vitb6,vitb9,vitb12,vitc,0,0,0],
          backgroundColor: ["rgba(240, 245, 144)"]
        }
      ]
    }})
    // vitd
    if(event._reactName === "onChange"){
    console.log(container)
    console.log("qty change", event.target.value)
    console.log("qty change", event.target.getAttribute("id"))
    let status = ""
    for(let i=0; i<container.length;i++){
      if (container[i].key === id){
        for(let j=0;j<this.state.vitd.length;j++){
          if(this.state.vitd.length === 0){
            this.state.vitd.push({id: id, meal: meal, value: (((container[i].props.nutrients[24].value) / 100 ) * (event.target.value))})
            status = "completed"
          }
          else if(this.state.vitd[j].id === id & this.state.vitd[j].meal === meal){
            this.state.vitd[j].value = ((container[i].props.nutrients[24].value) / 100 ) * (event.target.value)
            status = "completed"
          }
        }
        if (status !== "completed"){
          this.state.vitd.push({id: id, meal: meal, value: (((container[i].props.nutrients[24].value) / 100 ) * (event.target.value))})
        }
      }
    }
    let vitd = 0
    for(let k=0;k<this.state.vitd.length;k++){
      vitd = vitd + this.state.vitd[k].value
    }
    console.log(vitd)
  }
  if(event._reactName === "onClick"){

    console.log("Before", this.state.vitd)
    for(let j=0;j<this.state.vitd.length;j++){

      if(this.state.vitd[j].id == id & this.state.vitd[j].meal == meal){
        console.log("Removing item from vitd")
        this.state.vitd.splice(j,1)
      }
    console.log("After", this.state.vitd)
    }
  }

    let vitd = 0
    for(let k=0;k<this.state.vitd.length;k++){
      vitd = vitd + this.state.vitd[k].value
    }
    console.log(vitd)
    this.setState({chartdata:{
      labels: ["Protein(g)", "Fat(g)", "Carbohydrate(g)", "Fiber(g)", "Calcium(mg)", "Iron(mg)", "Magnesium(mg)", "Phosphorous(mg)", "Potassium(mg)", "Sodium(mg)", "Zinc(mg)", "Vitamin A(mcg)", "Vitamin B1(mg)","Vitamin B2(mg)","Vitamin B3(mg)","Vitamin B6(mg)","Vitamin B9(mcg)","Vitamin B12(mcg)","Vitamin C(mg)", "Vitamin D(mcg)", "Vitamin E(mg)", "Vitamin K(mcg)"],
      datasets: [
        {
          label: "Daily Requirement",
          data:this.state.data,
          backgroundColor: ["rgba(153, 242, 145)"]
        },
        {
          label: "Your Diet Contains",
          data:[protein,fat,carbohydrate,fiber,calcium,iron,magnesium,phosphorous,potassium,sodium,zinc,vita,vitb1,vitb2,vitb3,vitb6,vitb9,vitb12,vitc,vitd,0,0],
          backgroundColor: ["rgba(240, 245, 144)"]
        }
      ]
    }})
    // vite
    if(event._reactName === "onChange"){
    console.log(container)
    console.log("qty change", event.target.value)
    console.log("qty change", event.target.getAttribute("id"))
    let status = ""
    for(let i=0; i<container.length;i++){
      if (container[i].key === id){
        for(let j=0;j<this.state.vite.length;j++){
          if(this.state.vite.length === 0){
            this.state.vite.push({id: id, meal: meal, value: (((container[i].props.nutrients[40].value) / 100 ) * (event.target.value))})
            status = "completed"
          }
          else if(this.state.vite[j].id === id & this.state.vite[j].meal === meal){
            this.state.vite[j].value = ((container[i].props.nutrients[40].value) / 100 ) * (event.target.value)
            status = "completed"
          }
        }
        if (status !== "completed"){
          this.state.vite.push({id: id, meal: meal, value: (((container[i].props.nutrients[40].value) / 100 ) * (event.target.value))})
        }
      }
    }
    let vite = 0
    for(let k=0;k<this.state.vite.length;k++){
      vite = vite + this.state.vite[k].value
    }
    console.log(vite)
  }
  if(event._reactName === "onClick"){

    console.log("Before", this.state.vite)
    for(let j=0;j<this.state.vite.length;j++){

      if(this.state.vite[j].id == id & this.state.vite[j].meal == meal){
        console.log("Removing item from vite")
        this.state.vite.splice(j,1)
      }
    console.log("After", this.state.vite)
    }
  }

    let vite = 0
    for(let k=0;k<this.state.vite.length;k++){
      vite = vite + this.state.vite[k].value
    }
    console.log(vite)
    this.setState({chartdata:{
      labels: ["Protein(g)", "Fat(g)", "Carbohydrate(g)", "Fiber(g)", "Calcium(mg)", "Iron(mg)", "Magnesium(mg)", "Phosphorous(mg)", "Potassium(mg)", "Sodium(mg)", "Zinc(mg)", "Vitamin A(mcg)", "Vitamin B1(mg)","Vitamin B2(mg)","Vitamin B3(mg)","Vitamin B6(mg)","Vitamin B9(mcg)","Vitamin B12(mcg)","Vitamin C(mg)", "Vitamin D(mcg)", "Vitamin E(mg)", "Vitamin K(mcg)"],
      datasets: [
        {
          label: "Daily Requirement",
          data:this.state.data,
          backgroundColor: ["rgba(153, 242, 145)"]
        },
        {
          label: "Your Diet Contains",
          data:[protein,fat,carbohydrate,fiber,calcium,iron,magnesium,phosphorous,potassium,sodium,zinc,vita,vitb1,vitb2,vitb3,vitb6,vitb9,vitb12,vitc,vitd,vite,0],
          backgroundColor: ["rgba(240, 245, 144)"]
        }
      ]
    }})
    // vitk
    if(event._reactName === "onChange"){
    console.log(container)
    console.log("qty change", event.target.value)
    console.log("qty change", event.target.getAttribute("id"))
    let status = ""
    for(let i=0; i<container.length;i++){
      if (container[i].key === id){
        for(let j=0;j<this.state.vitk.length;j++){
          if(this.state.vitk.length === 0){
            this.state.vitk.push({id: id, meal: meal, value: (((container[i].props.nutrients[36].value) / 100 ) * (event.target.value))})
            status = "completed"
          }
          else if(this.state.vitk[j].id === id & this.state.vitk[j].meal === meal){
            this.state.vitk[j].value = ((container[i].props.nutrients[36].value) / 100 ) * (event.target.value)
            status = "completed"
          }
        }
        if (status !== "completed"){
          this.state.vitk.push({id: id, meal: meal, value: (((container[i].props.nutrients[36].value) / 100 ) * (event.target.value))})
        }
      }
    }
    let vitk = 0
    for(let k=0;k<this.state.vitk.length;k++){
      vitk = vitk + this.state.vitk[k].value
    }
    console.log(vitk)
  }
  if(event._reactName === "onClick"){

    console.log("Before", this.state.vitk)
    for(let j=0;j<this.state.vitk.length;j++){

      if(this.state.vitk[j].id == id & this.state.vitk[j].meal == meal){
        console.log("Removing item from vitk")
        this.state.vitk.splice(j,1)
      }
    console.log("After", this.state.vitk)
    }
  }

    let vitk = 0
    for(let k=0;k<this.state.vitk.length;k++){
      vitk = vitk + this.state.vitk[k].value
    }
    console.log(vitk)
    this.setState({data_diet: [protein,fat,carbohydrate,fiber,calcium,iron,magnesium,phosphorous,potassium,sodium,zinc,vita,vitb1,vitb2,vitb3,vitb6,vitb9,vitb12,vitc,vitd,vite,vitk]})
    // this.setState({chartdata:{
    //   labels: ["Protein(g)", "Fat(g)", "Carbohydrate(g)", "Fiber(g)", "Calcium(mg)", "Iron(mg)", "Magnesium(mg)", "Phosphorous(mg)", "Potassium(mg)", "Sodium(mg)", "Zinc(mg)", "Vitamin A(mcg)", "Vitamin B1(mg)","Vitamin B2(mg)","Vitamin B3(mg)","Vitamin B6(mg)","Vitamin B9(mcg)","Vitamin B12(mcg)","Vitamin C(mg)", "Vitamin D(mcg)", "Vitamin E(mg)", "Vitamin K(mcg)"],
    //   datasets: [
    //     {
    //       label: "Daily Requirement",
    //       data:this.state.data,
    //       backgroundColor: ["rgba(153, 242, 145)"]
    //     },
    //     {
    //       label: "Your Diet Contains",
    //       data:[protein,fat,carbohydrate,fiber,calcium,iron,magnesium,phosphorous,potassium,sodium,zinc,vita,vitb1,vitb2,vitb3,vitb6,vitb9,vitb12,vitc,vitd,vite,vitk],
    //       backgroundColor: ["rgba(240, 245, 144)"]
    //     }
    //   ]
    // }})
    this.setState({chartdata1:{
      labels: ["Carbohydrate(g)", "Calcium(mg)", "Magnesium(mg)", "Phosphorous(mg)", "Potassium(mg)", "Sodium(mg)", "Vitamin A(mcg)","Vitamin B9(mcg)", "Vitamin K(mcg)"],
      datasets: [
        {
          label: "Daily Requirement",
          data:this.state.data1,
          backgroundColor: ["rgba(153, 242, 145)"]
        },
        {
          label: "Your Diet Contains",
          data:[carbohydrate,calcium,magnesium,phosphorous,potassium,sodium,vita,vitb9,vitk],
          backgroundColor: ["rgba(240, 245, 144)"]
        }
      ]
    },
    chartdata2:{
      labels: ["Protein(g)", "Fat(g)", "Fiber(g)", "Iron(mg)", "Zinc(mg)", "Vitamin B1(mg)","Vitamin B2(mg)","Vitamin B3(mg)","Vitamin B6(mg)","Vitamin B12(mcg)","Vitamin C(mg)", "Vitamin D(mcg)", "Vitamin E(mg)"],
      datasets: [
        {
          label: "Daily Requirement",
          data:this.state.data2,
          backgroundColor: ["rgba(153, 242, 145)"]
        },
        {
          label: "Your Diet Contains",
          data:[protein,fat,fiber,iron,zinc,vitb1,vitb2,vitb3,vitb6,vitb12,vitc,vitd,vite],
          backgroundColor: ["rgba(240, 245, 144)"]
        }
      ]
    }

  })
  }

  onDrop = (event, container) => {
    let id = event.dataTransfer.getData("id")
    fetch("https://warm-badlands-38064.herokuapp.com/data", {
      method:"post",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({
        "search": id
      })
    })
  .then(response => response.json())
  .then(data => {
    let array1 = []
    let array2 = []
    let array3 = []


    console.log(this.state.breakfast)
    console.log(array1)
    console.log(data)
    // if (container === "breakfast" && this.state.breakfast.includes(array1[0]) === false) {
    if (container === "breakfast") {
      array1 = array1.concat(
            <div className="grid3" key={data[0]} nutrients={data[2]}>
              <div  id2={data[0]} draggable onDragStart={(e) => {this.onDragStart(e,data[1])}} container = "breakfast" className="draggable item4 ">
                <button className="x" id2={data[0]} onClick = {(e) => {this.onClick(e, data[1], "breakfast", data[0])}}>x</button>
                {data[1]}
              </div>
              <div draggable onDragStart={(e) => {this.onDragStart(e,data[1])}} key={data[0]} container = "breakfast" className="draggable item5 ">
                grams
              </div>
              <div draggable onDragStart={(e) => {this.onDragStart(e,data[1])}} key={data[0]} container = "breakfast" className="draggable item6 ">
                <input type="number" id={data[0]} name="points" min="0" step="1" className="input" onChange={(event) => {this.onChange(event, [...this.state.breakfast, ...this.state.lunch, ...this.state.dinner], "breakfast",event.target.getAttribute("id"))}}></input>
              </div>
            </div>
          )

      if (this.state.breakfast.find(b => b.key === array1[0].key) === undefined){
        array1 = array1.concat(this.state.breakfast)
        this.setState({breakfast:array1})
        console.log(this.state.breakfast)
      }
            }


    if (container === "lunch"){
      array2 = array2.concat(
            <div className="grid3" key={data[0]} nutrients={data[2]}>
            <div draggable  onDragStart={(e) => {this.onDragStart(e,data[1])}} container = "lunch" className="draggable item4">
              <button className="x" onClick = {(e) => {this.onClick(e, data[1], "lunch", data[0])}}>x</button>
              {data[1]}
            </div>
            <div draggable onDragStart={(e) => {this.onDragStart(e,data[1])}} key={data[0]} container = "lunch" className="draggable item5 ">
              grams
            </div>
            <div draggable onDragStart={(e) => {this.onDragStart(e,data[1])}} key={data[0]} container = "lunch" className="draggable item6 ">
              <input type="number" id={data[0]} name="points" min="0" step="1" className="input" onChange={(event) => {this.onChange(event, [...this.state.breakfast, ...this.state.lunch, ...this.state.dinner], "lunch", event.target.getAttribute("id"))}}></input>
            </div>
            </div>
          )
      if(this.state.lunch.find(b => b.key === array2[0].key) === undefined){
        array2 = array2.concat(this.state.lunch)
        this.setState({lunch:array2})
      }

    }
    if (container === "dinner"){
      array3 = array3.concat(
            <div className="grid3" key={data[0]} nutrients={data[2]}>
              <div draggable onDragStart={(e) => {this.onDragStart(e,data[1])}} container = "dinner" className="draggable item4 ">
              <button className="x" onClick = {(e) => {this.onClick(e, data[1], "dinner", data[0])}}>x</button>
                <span>{data[1]}</span>
              </div>
              <div draggable onDragStart={(e) => {this.onDragStart(e,data[1])}} key={data[0]} container = "dinner" className="draggable item5 ">
                grams
              </div>
              <div draggable onDragStart={(e) => {this.onDragStart(e,data[1])}} key={data[0]} container = "dinner" className="draggable item6 ">

                <input type="number" id={data[0]} name="points" step="1" className="input" onChange={(event) => {this.onChange(event, [...this.state.breakfast, ...this.state.lunch, ...this.state.dinner], "dinner", event.target.getAttribute("id"))}}></input>
              </div>
            </div>
          )
      console.log(array3)
      if (this.state.dinner.find(b => b.key === array3[0].key) === undefined){
        array3 = array3.concat(this.state.dinner)
        this.setState({dinner:array3})

      }
    }
  })
    console.log(container, "dropped")
  }

  data = async (id) => {
    await fetch("https://warm-badlands-38064.herokuapp.com/data", {
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

    return (


      <div>

      <div className="grid">
      <div className="Search">
        <Searchbar OnSearch={(event) => {this.OnSearch(event)}}/>
      </div>
    
        <div className="container2">
          <div className="grid2">
            <div className="leftcolumn">
              {this.state.collection}
            </div>
          </div>
        </div>
        <h3 className="heading">Breakfast</h3>
        <div className="droppable container1" onDrop={(e)=> {this.onDrop(e,"breakfast")}} onDragOver = {(e)=> {this.onDragOver(e)}}>
          <div className="grid3">
            <div className="leftcolumn">
              {this.state.breakfast}
            </div>
          </div>
        </div>
        <h3 className="heading">Lunch</h3>
        <div className="droppable container1" onDrop={(e)=> {this.onDrop(e,"lunch")}} onDragOver = {(e)=> {this.onDragOver(e)}}>
          <div className="grid3">
            <div className="leftcolumn">
              {this.state.lunch}
            </div>
          </div>
        </div>
        <h3 className="heading">Dinner</h3>
        <div className="droppable container1" onDrop={(e)=> {this.onDrop(e,"dinner")}} onDragOver = {(e)=> {this.onDragOver(e)}}>
          <div className="grid3">
            <div className="leftcolumn">
              {this.state.dinner}
            </div>
          </div>
        </div>
      </div>
      <div className="gridchart">
      <div className="form">
        <Forms onAgeInput={this.onAgeInput} onHeightInput={this.onHeightInput} onWeightInput={this.onWeightInput} onRadioInput={this.onRadioInput} onEvaluate={this.onEvaluate}/>
      </div>
        <div className="chartback">
        <Chart chartdata = {this.state.chartdata1}/>
        </div>
        <div className="chartback">
        <Chart chartdata = {this.state.chartdata2}/>
        </div>
      </div>
      </div>

    );
  }
}

export default Containers;
