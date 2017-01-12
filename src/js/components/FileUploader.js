import React, { Component, PropTypes } from 'react'

/**
class for upload files
*/

export default class FileUploader extends Component {


// initializes the values
  constructor() {
    super();
    this.state = {
      FileA: [],
      FileB: [],
    };
  }


// calls the function on click and get FileA contents
  fileUploadA({ target }) {
    let fileReader = new FileReader()
    let file = target.files[0]

    fileReader.onloadend = () => {
     this.props.showDataFileA(fileReader.result); // calls the action
   }

   if (file) {
    fileReader.readAsText(file) // reads the data
  }
}

// calls the function on click and get FileB contents
fileUploadB({ target }) {

  let fileReader = new FileReader()
  let file = target.files[0]

  fileReader.onloadend = () => {
    this.props.showDataFileB(fileReader.result);

  }

  if (file) {
    fileReader.readAsText(file)
  }
}



// main html for File upload
render() {

  return (

    <div class="row row-eq-height">

    <div class="col-xs-14 col-sm-6">
    <input type="file" name="Select AML file -1"  onChange={::this.fileUploadA}  id="file" accept=".xsd,.xml,.aml" className="btn btn-primary"/>
    </div>

    <div class="col-xs-14 col-sm-6 ">
    <input type="file" name="Select AML file -2" onChange={::this.fileUploadB}  id="file2" accept=".xsd,.xml,.aml" className="btn btn-primary"/>
    </div>
    </div>

    )
}
}
