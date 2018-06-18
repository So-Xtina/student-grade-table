import React, { Component } from "react";
import { connect } from "react-redux";
import { getStudentList, deleteStudent, editStudentData, clearInput, gradeAverage } from "../actions";
import EditStudent from "./edit_student";

class StudentList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false,
			student: null
		};

		//calls the function when the page loads;
		this.getServerData();
		this.handleDeleteItem = this.handleDeleteStudent.bind(this);
		this.handleModalInputs = this.handleModalInputs.bind(this);
		this.showEditModal = this.showEditModal.bind(this);
		this.editStudentDataInput = this.editStudentDataInput.bind(this);
	}

	async getServerData() {
		await this.props.getStudentList();

		const { studentList } = this.props;

		this.props.gradeAverage(studentList);
	}

	async handleDeleteStudent(id) {
		await this.props.deleteStudent(id);

		this.getServerData();
	}

	showEditModal(student) {
		const { show } = this.state;

		this.setState({
			show: !show,
			student
		});
	}

	handleModalInputs(event) {
		const { value, name } = event.target;
		const { student } = this.state;
		student[name] = value;

		this.setState({
			student: { ...student }
		});
	}

	async editStudentDataInput() {
		const { show } = this.state;

		await this.props.editStudentData(this.state.student);

		this.getServerData();

		this.setState({
			show: !show
		});
	}

	render() {
		const { studentList } = this.props;
		const { show, student } = this.state;

		const students = studentList.map((student, index) => {
			return (
				<tr key={index}>
					<td>{student.student_name}</td>
					<td>{student.class_name}</td>
					<td>{student.grade_value}</td>
					<td
						onClick={() => this.showEditModal(student)}
						type="button"
						className="btn btn-success btn-sm editBtn"
					>
						Edit
					</td>
					<td
						onClick={() => this.handleDeleteStudent(student.id)}
						type="button"
						className="btn btn-danger btn-sm deleteBtn"
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
				{show ? (
					<EditStudent
						studentObj={student}
						editStudentDataInput={this.editStudentDataInput}
						editModalInputs={this.handleModalInputs}
						showEditModal={this.showEditModal}
					/>
				) : (
					""
				)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { studentList: state.studentListReducer.studentList, average: state.averageReducer.average };
}

export default connect(
	mapStateToProps,
	{ getStudentList, deleteStudent, editStudentData, clearInput, gradeAverage }
)(StudentList);
