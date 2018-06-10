import React, { Component } from "react";

class Header extends Component {
	render() {
		return (
			<div className="col-xs-12 col-md-12 page-header media-heading screen">
				<h1 className="visible-sm visible-md visible-lg row">
					Student Grade Table
					<small className="col-xs-offset-9 col-sm-3 col-md-3 col-lg-3">
						Grade Average : <span className="avgGrade label label-default">0</span>
					</small>
				</h1>
				<h3 className="visible-xs row">
					Student Grade Table
					<small className="col-xs-offset-6 col-xs-6">
						Grade Average : <span className="avgGrade label label-default">0</span>
					</small>
				</h3>
			</div>
		);
	}
}

export default Header;
