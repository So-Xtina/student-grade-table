import React, { Component } from "react";
import "./App.css";

class Loader extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className="loader" />
			</div>
		);
	}
}

export default Loader;
