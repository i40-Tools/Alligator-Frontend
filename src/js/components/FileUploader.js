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


var path = document.getElementById('file');
    fileReader.onloadend = () => {
     this.props.showDataFileA(fileReader.result,"ttt"); // calls the action
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
    this.props.showDataFileB(fileReader.result,"ttt");
  }

  if (file) {
    fileReader.readAsText(file)
  }
}


fileUploadC({ target }) {

  let fileReader = new FileReader()
  let file = target.files[0]

  fileReader.onloadend = () => {
    this.props.showDataFileC(fileReader.result,"ttt");
  }

  if (file) {
    fileReader.readAsText(file)
  }
}



// main html for File upload
render() {


  return (


    <div class="row">

    <div class="col-sm-5">
    <input type="file" name="Select AML file -1"  onChange={::this.fileUploadA}  id="file" accept=".xsd,.xml,.aml" className="btn btn-primary"/>
    </div>

    <div class="col-sm-5 ">
    <input type="file" name="Select AML file -2" onChange={::this.fileUploadB}  id="file2" accept=".xsd,.xml,.aml" className="btn btn-primary"/>
    </div>

    <div class="col-sm-1">
    <label>Select GoldStandard </label>
    <input type="file" name="Select AML file -2" onChange={::this.fileUploadC}  id="file3" accept=".txt,.xml,.aml"/>
    </div>

    </div>

    )
}
}
