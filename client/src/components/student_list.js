import React, { Component } from "react";
import { connect } from "react-redux";
import { getStudentList } from "../actions";

class StudentList extends Component {
	constructor(props) {
		super(props);

		//calls the function when the page loads;
		this.getServerData();
	}

	//If you want the data to automatically populate in the browser on open;
	async getServerData() {
		await this.props.getStudentList();
	}

	render() {
		console.log(this.props);
		const { studentList } = this.props;

		const students = studentList.map((student, index) => {
			return (
				<tr key={index}>
					<td>{student.student_name}</td>
					<td>{student.class_name}</td>
					<td>{student.grade_value}</td>
				</tr>
			);
		});

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
					<tbody>{students}</tbody>
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
