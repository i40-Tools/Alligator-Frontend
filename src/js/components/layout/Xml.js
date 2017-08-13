import React from "react";

export default class Xml extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const {content} = this.props.content;

    const icon = complete ? "\u2714" : "\u2716"

    

    return (
      <li>
        <span>{content}</span>
        <span>{icon}</span>
      </li>
    );
  }
}
