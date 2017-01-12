import React from "react";


export default class Footer extends React.Component {
  render() {
    const footerStyles = {
      marginTop: "30px",
    };

    return (
      <footer style={footerStyles}>
        <div class="row">
          <div class="col-lg-12">
            <p><b>Copyright &copy; University of Bonn 2017</b></p>
          </div>
        </div>
      </footer>
    );
  }
}
