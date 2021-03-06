import React, { Component } from "react";
import { connect } from "react-redux";
import { gradeAverage } from "../actions";

class Header extends Component {
	render() {
		const { average } = this.props;

		return (
			<div className="col-xs-12 col-md-12 page-header media-heading screen">
				<h1 className="visible-sm visible-md visible-lg row">
					Student Grade Table
					<small className="pull-right">
						Grade Average:
						<span className="avgGrade label label-default">{isNaN(average) ? "0" : average}</span>
					</small>
				</h1>
				<h3 className="visible-xs row">
					Student Grade Table
					<small className="pull-right">
						Grade Average:
						<span className="avgGrade label label-default">{isNaN(average) ? "0" : average}</span>
					</small>
				</h3>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		average: state.averageReducer.average
	};
}

export default connect(
	mapStateToProps,
	{ gradeAverage }
)(Header);
