import React, { Component } from 'react';
import ReactGA from 'react-ga';
import $ from 'jquery';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import CoffeeRanks from './Components/CoffeeRanks';
import Portfolio from './Components/Portfolio';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      foo: 'bar',
      resumeData: {}
    };

    ReactGA.initialize('UA-110570651-1');
    ReactGA.pageview(window.location.pathname);

  }

  // getCoffeeData(){
  //   $.ajax({
  //     url:'https://spreadsheets.google.com/feeds/list/1eIVO73Tx7eMEnk3rabSe3FBj9_Z2oSztS2a3CbtAEOA/1/public/full?alt=json',
  //     dataType:'json',
  //     cache: false,
  //     success: function(data){
  //       this.setState({coffeeData: data});
  //     }.bind(this),
  //     error: function(xhr, status, err){
  //       console.log(err);
  //       alert(err);
  //     }
  //   });
  // }

  getResumeData(){
    $.ajax({
      url:'/resumeData.json',
      dataType:'json',
      cache: false,
      success: function(data){
        this.setState({resumeData: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
        alert(err);
      }
    });
  }

  // getResumeData(){
  //   $.get('https://spreadsheets.google.com/feeds/list/1eIVO73Tx7eMEnk3rabSe3FBj9_Z2oSztS2a3CbtAEOA/1/public/full?alt=json',
  //     function (data) {
  //       data = data.feed.entry;
  //       data.forEach(row => {

  //       let table = $('table');

  //       let notes = linkify(row.gsx$notes.$t);


  //       let row_info = "<tr>";
  //       row_info += "<td>" + row.gsx$title.$t + "</td>";
  //       row_info += "<td>" + row.gsx$author.$t + "</td>";
  //       row_info += "<td>" + row.gsx$yearread.$t + "</td>";
  //       row_info += "<td>" + notes + "</td>";
  //       row_info += "<td>" + row.gsx$tags.$t + "</td>";

  //       row_info += "</tr>";
        
  //       table.append(row_info);
  //     });
  // });
  // }

  componentDidMount(){
    // this.getResumeData();
    let resumeGET = new Promise((resolve, reject) => { 
      const xhr = new XMLHttpRequest(); 
      xhr.open("GET", '/resumeData.json'); 
      xhr.onload = () => resolve(xhr.responseText); 
      xhr.onerror = () => reject(xhr.statusText); 
      xhr.send(); 
    }); 
    
    let coffeeGET = new Promise((resolve, reject) => { 
      const xhr = new XMLHttpRequest(); 
      xhr.open("GET", 'https://spreadsheets.google.com/feeds/list/10oNX04vhkvBwinuBykmcTpIxWuYasbsY4k36xYi6hNw/1/public/full?alt=json'); 
      xhr.onload = () => resolve(xhr.responseText); 
      xhr.onerror = () => reject(xhr.statusText); 
      xhr.send(); 
    }); 
    
    Promise.all([resumeGET, coffeeGET]).then((values) =>
      // console.log(values[0])
      // console.log(values[1])
      this.setState({resumeData:JSON.parse(values[0]), coffeeData:JSON.parse(values[1])})
      // function(values){
      //   this.setState({resumeData: values[0], coffeeData: values[1]});
      // }.bind(this)
    );
  }

  render() {
    console.log("Look here v");
    console.log(this.state);
    console.log("Look there ^");
    console.log(this.state.coffeeData);
    return (
      <div className="App">
        <Header data={this.state.resumeData.main}/>
        <About data={this.state.resumeData.main}/>
        <Portfolio data={this.state.resumeData.portfolio}/>
        {/* <CoffeeRanks data={this.state.resumeData.ranks}/> */}
        <CoffeeRanks data={this.state.coffeeData}/>
        <Resume data={this.state.resumeData.resume}/>
        <Footer data={this.state.resumeData.main}/>
      </div>
    );
  }
}

export default App;
