import React, { Component } from "react";
import { connect } from "react-redux";
import { getStudentList, deleteStudent } from "../actions";

class StudentList extends Component {
	constructor(props) {
		super(props);

		//calls the function when the page loads;
		this.getServerData();
		this.handleDeleteItem = this.handleDeleteItem.bind(this);
	}

	async getServerData() {
		await this.props.getStudentList();
	}

	async handleDeleteItem(id) {
		this.props.deleteStudent(id);

		await this.getServerData();
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
					<td
						onClick={() => this.handleDeleteItem(student.id)}
						type="button"
						className="btn btn-danger btn-sm cancelBtn"
					>
						Delete
					</td>
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
	{ getStudentList, deleteStudent }
)(StudentList);
