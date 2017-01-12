/* eslint-disable */

import {drawTree} from './treeDrawer';

function xmlToArray(text) {
  let head = '';
  let currentString = '';
  let documentType = '';
  let ifCurrentStringIsHead = false;
  let ifCurrentStringIsComment = false;
  let ifCurrentStringIsTag = false;
  let ifCurrentStringIsDocumentType = false;
  let newTag = {};
  let tagArray = [];
  let tagStack = [];
  let id = 0;
  for (let i=0; i<text.length; i++) {  // for all symbols in the text
    if (text[i] == '<' && !ifCurrentStringIsComment) {  // if we found an open tag and we are not writing a comment at the moment
      if (text[i+1] == '?') {  // if that's a headline
        ifCurrentStringIsHead = true;
      } else if (text[i+1] == '!' && text[i+2] == '-' && text[i+3] == '-') {  // if that's an end of a comment
        ifCurrentStringIsComment = true;
      } else if (text[i+1] == '!') {
        ifCurrentStringIsDocumentType = true;
      } else {
        if (tagStack.length) { // if tagStack is not empty
          while (currentString[currentString.length-1] == ' ') {
            currentString = currentString.substring(0, currentString.length-1);
          }
          tagArray[tagStack[tagStack.length-1].id-1].value = currentString;  // add the information that's outside tags
          currentString = '';
        }
        ifCurrentStringIsTag = true;  // start the next tag
      }
    } else if (text[i] == '>') {  // if we found a close tag
      if (ifCurrentStringIsHead) {  // if we are writing a headline
        if (text[i-1] == '?') {
          ifCurrentStringIsHead = false;
        } else {
          //
        }
      } else if (ifCurrentStringIsComment) {  // if we are writing a comment
        if (text[i-1] == '-' && text[i-2] == '-') {  // and that's the end of the comment
          ifCurrentStringIsComment = false;
        }
      } else if (ifCurrentStringIsDocumentType) {  // if we are writing the document type
        ifCurrentStringIsDocumentType = false;
      } else if (ifCurrentStringIsTag) {  // if we are writing the information that's inside tags
        if (text[i-1] == '/') {  // if the tag is closed inside itself
          newTag.tag = currentString.substring(0, currentString.length-1);  // isolating the information inside the tag
          currentString = '';
          id += 1;
          newTag.id = id;
          newTag.children = [];
          newTag.depth = tagStack.length;  // adding the depth level of the tag
          if (tagStack.length) {  // if there is smth in the stack
            newTag.parent = tagStack[tagStack.length-1].id;  // we save the last element of stack as current tag's parent
            tagArray[tagStack[tagStack.length-1].id-1].children.push(newTag.id);  // we add a current tag as a child to the last element
          } else {
            newTag.parent = 0;
          }
          tagArray.push(newTag);
        } else {
          if (currentString[0] == '/') {  // if it is a closing tag
            currentString = '';
            tagStack.pop();  // delete this tag from the stack
          } else {
            newTag.tag = currentString;
            currentString = '';
            id += 1;
            newTag.id = id;
            newTag.children = [];
            newTag.depth = tagStack.length;  // adding the depth level of the tag
            if (tagStack.length) {  // if there is smth in the stack
              newTag.parent = tagStack[tagStack.length-1].id;  // we save the last element of stack as current tag's parent
              tagArray[tagStack[tagStack.length-1].id-1].children.push(newTag.id);  // we add a current tag as a child to the last element
            } else {
              newTag.parent = 0;
            }
            tagArray.push(newTag);
            tagStack.push(newTag);
          }
        }
        ifCurrentStringIsTag = false;
        newTag={};
      }
    } else if (ifCurrentStringIsHead) {
      if (text[i] !== '?' && !(text[i] == '?' && text[i+1] == '>') && !(text[i] == '?' && text[i-1] == '<')) {
        head += text[i];
      } else {
        //
      }
    } else if (ifCurrentStringIsComment) {
      //
    } else if (ifCurrentStringIsTag) {
      currentString += text[i];
    } else if (ifCurrentStringIsDocumentType) {
      documentType += text[i];
    } else {  // avoid all the irrelevant symbols inside and outside the tags
      if (text[i] !== '\n' && text[i] != '\r' && text[i] != '\t' && !(text[i] == ' ' && !currentString.length)) {
        currentString += text[i];
      } else {
        //
      }
    }
  }
  if (tagStack.length) {  // if after the end of the process, the stack is not empty - means number of opening tags is bigger than closing
    alert('XML file is not correct!');
  }
  return tagArray;
}

function arrayMapping(tagArray, impNodes, impAttr) {
  let mapArray = attrTrans(tagArray, impAttr);
  if (!impNodes.length) {
    return mapArray;
  }

  let extra = {
    children : [],
    depth : 1,
    id : tagArray.length + 1,
    parent : 1,
    type : 'Extra'
  };
  tagArray.push(extra);
  noMoreChildren = [];
  let ifChild = false;
  for (let i = 0; i < tagArray.length - 1; i++) {  // length - 1 because we want to exclude newly added tag 'Extra'
    if (tagArray[i].depth === 1) {
      ifChild = impNodes.indexOf(tagArray[i].type) > -1;

      if (!ifChild) {
        tagArray[i].parent = extra.id;
        tagArray[tagArray.length-1].children.push(tagArray[i].id);
        noMoreChildren.push(tagArray[i].id);
      }
    }
  }
  newRootChildren = tagArray[0].children.map(tagChildren => {
    let ifEqual = noMoreChildren.indexOf(tagChildren) > -1;
    if (!ifEqual) {
      return tagChildren;
    }
  });

  tagArray[0].children = newRootChildren;
  tagArray[0].children.push(extra.id);

  return mapArray;
}

function attrTrans(tagArray, impAttr) {
  for (let tag of tagArray) {
    let tagString = tag.tag;
    let type = '';
    let name = '';
    let extra = '';
    for (let tagStr of tagString) {
      if (tagStr == ' ') {
        break;
      }
      type += tagStr;
    }
    let index = tagString.search('="') + 2;
    if (index > 1) {
      for (let j=index; j < tagString.length; j++) {
        if (tagString[j] == '"') {
          break;
        }
        name += tagString[j];
      }
      tag.name = name;

      if (impAttr.length && tagString.search(impAttr) !== -1) {
        for (let j = tagString.search(impAttr[0]) + impAttr[0].length + 2; tagString[j] != '"'; j++) {
          extra += tagString[j];
        }
      }
      tag.extra = extra;
    }
    tag.type = type;
  }
  return tagArray;
}

function objToJSON(tagArray, id, parent) {
  let node = {  // we create an empty object and save there all the relevant information about the node
    value : tagArray[id].value,
    name : tagArray[id].name,
    extra : tagArray[id].extra,
    type : tagArray[id].type,
    parent : parent ? parent.name : 'null'
  };

  node.children = tagArray[id].children.map(children => {
    return objToJSON(tagArray, children - 1, node)
  });

  return node;
}

export function renderXML(htmlTag, file, impNodes, impAttr) {
  let tagArray = xmlToArray(file);  // returns an array of all nodes with related info
  let mapArray = arrayMapping(tagArray, impNodes, impAttr);
  let jsonText = [objToJSON(mapArray, 0, false)];  // converts array into a JSON file
  let maxWidth = 0;  // we evaluate the maxWidth of the tree in order to draw a frame for it
  let depthArray = new Array(tagArray.length + 1).fill(0);

  for (let tag of tagArray) {
    if (tag.depth > maxWidth) {
      maxWidth = tag.depth;
    }
    depthArray[tag.depth] += 1;
  }
  maxWidth += 1;

  drawTree(htmlTag, jsonText, Math.max.apply(null, depthArray), maxWidth);
}
/* eslint-enable */
