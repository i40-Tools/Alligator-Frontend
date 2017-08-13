/**
 * Class for visualizing XML files in a tree structure
 */

 import React, {Component, PropTypes} from 'react'
 import * as AmlActions from "../actions/AmlActions";
 import AmlStore from "../stores/AmlStore";
 import Xml from "./Xml";
 import { renderXML } from './XMLVisualizer/xmlvis/renderXML'


 export default class Integrate extends Component {

// intializes the class
constructor() {

    super();

  //setting the initial states
    this.state = {
      xmlI:[],
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
    AmlStore.on("update", this.getData);
    

  }

// free up memory
  componentWillUnmount() {
    AmlStore.removeListener("update", this.getData);

  }

// gets data from stores and updates
  getData() {
    this.setState({
      xmlI : AmlStore.getXmlI(),
   
    });


  }


visual(){

    const { xmlI } = this.state;  // getting fileA content

if(xmlI!=""){
          try {

      renderXML('.visual-div', xmlI, [], [])
     
    } catch (err) {
      this.setState({ error: 'Error while parsing XML' }) // eslint-disable-line
      alert('Error while parsing XML');
    }
  }
}

  handleFileA() {
    XMLVisualizer.FILENAMEA="Displaying File A";  // File A is activated for visualization
    XMLVisualizer.FILENAMEB=""; // hides the B string

// call the appropriate action and updates visualization 
    if (this.props.showDataFileA) 
      this.props.showDataFileA(this.props.xml);
    const { xml } = this.props

    try {


    } catch (err) {
      this.setState({ error: 'Error while parsing XML' }) // eslint-disable-line
      alert('Error while parsing XML');
    }



  }


// handles file A content for visualization upon button click
  getResponse() {

     // this.props.showDataFileA(this.props.xml);
    const { xml } = this.props
    //this.props.showDataFileA(this.props.xml);
    const { xmlB } = this.props
    const { FileA } = this.props
    const { FileB } = this.props
      

    AmlActions.getData(xml,xmlB,FileA,FileB);
  
  }


// main html part for visualization  
  render() {

    const { xmlI } = this.state;  // getting fileA content
    console.log(xmlI);

   // const xmlComponents = xmlI.map((xml) => {
   //      return <Xml key={xml.id} {...xml}/>;
   //              });
//           {xmlComponents}

    return (


      <div>

      <button class="btn btn-primary" id="fileA" onClick={this.getResponse.bind(this)}>Integrate</button>
      <br></br>
      <br></br>
      <br></br>
      <div class="col-xs-14 col-sm-6 " className="visual-div">
      </div>

{this.visual()}    
      </div>
      )
  }
}
