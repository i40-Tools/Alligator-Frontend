/**
 * Class for visualizing XML files in a tree structure
 */

 import React, {Component, PropTypes} from 'react'
 import { renderXML } from './xmlvis/renderXML'

 export default class XMLVisualizer extends Component {

// intializes the class
  constructor(){
    super();
    this.state = {
      error: null,
      obj:[],
    };
  }

// string to store which files are visualized
  static FILENAMEA=""; 
  static FILENAMEB="";


// hides the string when user navigate back to page
  componentDidMount() {
    XMLVisualizer.FILENAMEA="";
    XMLVisualizer.FILENAMEB="";
  }



// handles file A content for visualization upon button click
  handleFileA() {
    XMLVisualizer.FILENAMEA="Displaying File A";  // File A is activated for visualization
    XMLVisualizer.FILENAMEB=""; // hides the B string

// call the appropriate action and updates visualization 
    if (this.props.showDataFileA) 
      this.props.showDataFileA(this.props.xml);
    const { xml } = this.props

    try {

      renderXML('.vis-div', xml, [], [])
      this.setState({ error: '',
        obj:xml
      })

    } catch (err) {
      this.setState({ error: 'Error while parsing XML' }) // eslint-disable-line
      alert('Error while parsing XML');
    }



  }

// handles file A content for visualization upon button click
  handleFileB() {
    XMLVisualizer.FILENAMEB="Displaying File B";  // File b is activated for visualization
    XMLVisualizer.FILENAMEA="";   // hides File A name 
    if (this.props.showDataFileB) 
      this.props.showDataFileB(this.props.xmlB);

    const { xmlB } = this.props
    try {

      renderXML('.vis-div', xmlB, [], []) // renders the tree on appropriate div 
      this.setState({ error: '' })
    } catch (err) {
      this.setState({ error: 'Error while parsing XML' }) // eslint-disable-line
      alert('Error while parsing XML');

    }


  }


// main html part for visualization  
  render() {


    return (


      <div class="row ">

      <div class="col-sm-5 " id="abc">
      <button class="btn btn-success" id="fileA" onClick={this.handleFileA.bind(this)}>Visualize FileA</button>
      </div>

      <div class="col-sm-5">
      <button class="btn btn-success" id="fileA" onClick={this.handleFileB.bind(this) }>Visualize FileB</button>
      <br></br>
      <br></br>
      </div>

      <br></br>
      <br></br>

      <div class="container" >
      <h3>{XMLVisualizer.FILENAMEA}</h3>
      <h3>{XMLVisualizer.FILENAMEB}</h3>


      <div class="row row-eq-height  panel">

      <div class="col-xs-14 col-sm-6 " className="vis-div">
      </div>
      </div>
      </div>

      </div>
      )
  }
}
