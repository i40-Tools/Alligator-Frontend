import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Research from "./pages/Research";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import About from "./pages/About";

const app = document.getElementById('app');

ReactDOM.render(
	<Router history={hashHistory}>
	<Route path="/" component={Layout}>
	<IndexRoute  component={Home}></IndexRoute>
	<Route path="research" component={Research}></Route>
	<Route path="about" component={About}></Route>
	

	</Route>
	</Router>,
	app);
