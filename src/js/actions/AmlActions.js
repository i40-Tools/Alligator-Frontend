import dispatcher from "../dispatcher";
import axios from "axios";


export function showDataFileA(text,name) {
    dispatcher.dispatch({type: "SHOW_XML_A", xmlA: text});

 }

export function showDataFileB(text,name) {
    dispatcher.dispatch({type: "SHOW_XML_B", xmlB: text});

 }

export function showDataFileC(text,name) {
    dispatcher.dispatch({type: "SHOW_Name_A", fileNameA: text});

 }


export function getData(text,text2,text3,text4) {
 //axios.get("/integrate")
 //sendData();
 //axios.get("/integrate")
    axios.post("/integrate/id", 
    {file1: text,
    file2: text2,
    file3: text3,
    file4: text4
    })
//axios.get("http://rest.learncode.academy/api/test123/tweets")
      .then((response) => {
        dispatcher.dispatch({type: "GET_DATA_FULFILLED", payload: response.data})
      });

  }



export function sendData() {
    axios.post("/integrate", { id: '1'})
  .then(function(response){
    console.log('saved successfully')
  });  

  }







