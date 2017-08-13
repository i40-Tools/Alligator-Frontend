import { EventEmitter } from "events";

import dispatcher from "../dispatcher";


/**
This is a store for handling every request sent by dispatcher. The store then 
updates the container.  

*/
class AmlStore extends EventEmitter {
  constructor() {
    super()
    this.xmlA="";
    this.xmlB="";
    this.xmlI=[];
    this.fileNameA="";
    this.fileNameB="";

  }

  // returns File A content
  getXmlA() {
    return this.xmlA;
  }

  // returns File B content
  getXmlB() {
    return this.xmlB;
  }


  // returns File A content
  getfileNameA() {
    return this.fileNameA;
  }

  // returns File B content
  getfileNameB() {
    return this.fileNameB;
  }



  getXmlI() {
    return this.xmlI;
  }



  // handles actions 
  handleActions(action) {
    switch(action.type) {

      case "SHOW_XML_A": {
        this.xmlA = action.xmlA;
        this.emit("change");
        break;
      }


      case "SHOW_XML_B": {
        this.xmlB = action.xmlB;
        this.emit("change");
        break;
      }

        case "SHOW_Name_A": {
        this.fileNameA = action.fileNameA;
        this.emit("change");
        break;
      }

      
      case "SHOW_Name_B": {
        this.fileNameB = action.fileNameB;
        this.emit("change");
        break;
      }

      case "GET_DATA_FULFILLED": {
        this.xmlI = action.payload;
        this.emit("update");
        break;
      }



    }
  }

}

// registering the store so it can get every change
const amlStore = new AmlStore;
dispatcher.register(amlStore.handleActions.bind(amlStore));

export default amlStore;
