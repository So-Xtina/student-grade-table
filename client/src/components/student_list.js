import React, { Component } from "react";
import { connect } from "react-redux";
import { getStudentList } from "../actions";

class StudentList extends Component {
	render() {
		console.log("student list:", this.props.getStudentList());
		return (
			<div className="student-list-container col-xs-12 col-sm-9">
				<table className="student-list page-header media-heading table">
					<thead>
						<tr>
							<th>Student Name</th>
							<th>Student Course</th>
							<th>Student Grade</th>
							<th>Operations</th>
						</tr>
					</thead>
					<tbody />
				</table>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		studentList: state.studentListReducer.studentList
	};
}

export default connect(
	mapStateToProps,
	{ getStudentList }
)(StudentList);
