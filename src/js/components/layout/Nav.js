import React from "react";
import { IndexLink, Link } from "react-router";

/**
class for navigation menu

**/

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const homeClass = location.pathname === "/" ? "active" : "";
    const researchClass = location.pathname.match(/^\/research/) ? "active" : "";
    const aboutClass = location.pathname.match(/^\/about/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";

    return (

      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                                  </div>
          <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">

              <li class={homeClass}>
                <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Home</IndexLink>
              </li>
              <li class={researchClass}>
                <Link to="research" onClick={this.toggleCollapse.bind(this)}>Research Contribution</Link>
              </li>
              <li class={aboutClass}>
                <Link to="about" onClick={this.toggleCollapse.bind(this)}>About</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
