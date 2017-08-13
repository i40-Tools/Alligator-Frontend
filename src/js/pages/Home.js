import * as AmlActions from "../actions/AmlActions";
import AmlStore from "../stores/AmlStore";
import React, { Component, PropTypes } from 'react'
import FileUploader from "../components/FileUploader";
import XMLVisualizer from "../components/XMLVisualizer/XMLVisualizer";
import vkbeautify from 'vkbeautify'
import Integrate from "../components/Integrate";


/**
This class displays all the data on the main page.

**/
export default class Home extends React.Component {
  constructor() {

    super();

  //setting the initial states
    this.state = {
      xmlA:"",
      xmlB:"",
      FileA:"",
      FileB:"",
      
    };

    this.getData = this.getData.bind(this);
  }


//called at start or reload of page.
  
  componentDidMount() {

// reloads data from memory when user navigate back to the page.
    this.getData();
  }

//called once the page is loaded or reloaded 
  componentWillMount() {
    AmlStore.on("change", this.getData);

  }

// free up memory
  componentWillUnmount() {
    AmlStore.removeListener("change", this.getData);

  }

// gets data from stores and updates
  getData() {
    this.setState({
      xmlA : AmlStore.getXmlA(),
      xmlB: AmlStore.getXmlB(),
      FileA : AmlStore.getfileNameA(),
      FileB: AmlStore.getfileNameB(),

    });


  }


// calls the action
  showDataFileA(text,name) {
    AmlActions.showDataFileA(text,name);
  }

  showDataFileB(text,name) {
    AmlActions.showDataFileB(text,name);

  }

  showDataFileC(text,name) {
    AmlActions.showDataFileC(text,name);

  }

  

// main render method which display everything.
  render() {

    const { xmlA } = this.state;  // getting fileA content
    const { xmlB } = this.state;  // getting fileB content
    const { FileA } = this.state;  // getting fileA content
    const { FileB } = this.state;  // getting fileB content

// defining style. only allowed as variable string
    const containerStyle = {
      border: "3px solid #cccccc",
      padding: "5px",
      fontFamily: "Tahoma , sans-serif ",
      color:"#003399",
    };

// start rendering
    return (
      <div>
      <h3> <b>Please Select your Heterogeneity Files</b></h3>
      <FileUploader showDataFileA={this.showDataFileA.bind(this)} showDataFileB={this.showDataFileB.bind(this)} showDataFileC={this.showDataFileC.bind(this)}/> 
      <div class="row">
      <div class="col-sm-5 ">
      <textarea  style={containerStyle} rows="15" cols="50" id="aboutDescription"
      data-role="none" value={vkbeautify.xml(xmlA)}></textarea>
      </div>
      <div class="col-sm-5 ">
      
      <textarea rows="15" style={containerStyle} cols="50" id="aboutDescription"
      data-role="none" value={vkbeautify.xml(xmlB)}></textarea>
       </div>
       </div>
      <XMLVisualizer showDataFileA={this.showDataFileA.bind(this)} xml={xmlA} xmlB={xmlB} showDataFileB={this.showDataFileB.bind(this)}/>
      <Integrate showDataFileA={this.showDataFileA.bind(this)} xml={xmlA} xmlB={xmlB} FileA={FileA} FileB={FileB} showDataFileB={this.showDataFileB.bind(this)} showDataFileC={this.showDataFileC.bind(this)} />

      </div>
      );
  }
}
