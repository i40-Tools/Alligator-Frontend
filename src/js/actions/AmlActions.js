import dispatcher from "../dispatcher";
import axios from "axios";


export function showDataFileA(text) {
    dispatcher.dispatch({type: "SHOW_XML_A", xmlA: text});
 }

export function showDataFileB(text) {
    dispatcher.dispatch({type: "SHOW_XML_B", xmlB: text});
 }


export function getData() {
 axios.get("/integrate")
//    axios.get("http://localhost:9000/integrate")
//axios.get("http://rest.learncode.academy/api/test123/tweets")
      .then((response) => {
        dispatcher.dispatch({type: "GET_DATA_FULFILLED", payload: response.data})
      });
  }



