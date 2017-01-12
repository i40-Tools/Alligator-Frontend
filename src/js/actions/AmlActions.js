import dispatcher from "../dispatcher";


export function showDataFileA(text) {
    dispatcher.dispatch({type: "SHOW_XML_A", xmlA: text});
 }

export function showDataFileB(text) {
    dispatcher.dispatch({type: "SHOW_XML_B", xmlB: text});
 }

