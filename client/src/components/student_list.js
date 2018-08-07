import React, { Component } from "react";
import { connect } from "react-redux";
import { getStudentList, deleteStudent, editStudentData, clearInput, gradeAverage, requestSent } from "../actions";
import EditStudent from "./edit_student";
import DeleteStudent from "./delete_modal";
import { lettersValidation, numLetValidation, numbersValidation } from "./input_validation";
import Loader from "./screen_loader";

class StudentList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false,
			student: null,
			editModalErrorStudent: false,
			editModalErrorClass: false,
			editModalErrorGrade: false,
			showDelete: false
		};

		this.handleDeleteStudent = this.handleDeleteStudent.bind(this);
		this.handleModalInputs = this.handleModalInputs.bind(this);
		this.showEditModal = this.showEditModal.bind(this);
		this.showDeleteModal = this.showDeleteModal.bind(this);
		this.editStudentDataInput = this.editStudentDataInput.bind(this);
	}

	showEditModal(student) {
		const { show } = this.state;

		this.setState({
			show: !show,
			student
		});
	}

	showDeleteModal(student) {
		const { showDelete } = this.state;

		this.setState({
			showDelete: !showDelete,
			student
		});
	}

	componentDidUpdate() {
		this.props.gradeAverage(this.props.studentList);
	}

	handleModalInputs(event) {
		const { value, name } = event.target;
		const { student } = this.state;
		var val = value.trim();

		student[name] = val;

		this.setState({
			student: { ...student }
		});
	}

	async getServerData() {
		await this.props.requestSent();
		await this.props.getStudentList();
	}

	async editStudentDataInput() {
		const { show } = this.state;
		const { student } = this.state;

		let inputErrors = {};

		// const checkChar = /^[A-Za-z]+$/;

		for (var studentKey in student) {
			if (studentKey === "student_name") {
				inputErrors[studentKey] = lettersValidation(student[studentKey]);
			}
			if (studentKey === "class_name") {
				inputErrors[studentKey] = numLetValidation(student[studentKey]);
			}
			if (studentKey === "grade_value") {
				inputErrors[studentKey] = numbersValidation(student[studentKey]);
			}
		}

		if (Object.values(inputErrors).indexOf(true) !== -1) {
			this.setState({
				editModalErrorStudent: inputErrors["student_name"],
				editModalErrorClass: inputErrors["class_name"],
				editModalErrorGrade: inputErrors["grade_value"]
			});
		} else {
			await this.props.editStudentData(this.state.student);
			this.getServerData();
			this.setState({
				show: !show,
				editModalErrorStudent: false,
				editModalErrorClass: false,
				editModalErrorGrade: false
			});
		}
	}

	async handleDeleteStudent() {
		const { showDelete } = this.state;
		const { student } = this.state;

		await this.props.deleteStudent(student.id);

		this.getServerData();

		this.setState({
			showDelete: !showDelete
		});
	}

	render() {
		const { requestInProgress, studentList } = this.props;
		const { show, student, showDelete } = this.state;

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
						onClick={() => this.showDeleteModal(student)}
						type="button"
						className="btn btn-danger btn-sm deleteBtn"
					>
						Delete
					</td>
				</tr>
			);
		});

		if (requestInProgress) {
			return <Loader />;
		}
		return (
			<div className="student-list-container col-xs-12 col-md-9">
				<table className="student-list page-header media-heading table">
					<thead>
						<tr>
							<th>Student Name</th>
							<th>Student Course</th>
							<th>Student Grade</th>
							<th>Operations</th>
						</tr>
					</thead>
					<tbody>{requestInProgress ? null : students}</tbody>
				</table>
				{show ? (
					<EditStudent
						studentObj={student}
						editStudentDataInput={this.editStudentDataInput}
						editModalInputs={this.handleModalInputs}
						showEditModal={this.showEditModal}
						displayErrStudent={this.state.editModalErrorStudent}
						displayErrClass={this.state.editModalErrorClass}
						displayErrGrade={this.state.editModalErrorGrade}
						hasError={this.state.hasError}
					/>
				) : (
					""
				)}
				{showDelete ? (
					<DeleteStudent
						studentObj={student}
						showDeleteModal={this.showDeleteModal}
						deleteStudentId={this.handleDeleteStudent}
					/>
				) : (
					""
				)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		studentList: state.studentListReducer.studentList,
		average: state.averageReducer.average,
		requestInProgress: state.studentListReducer.requestInProgress
	};
}

export default connect(
	mapStateToProps,
	{ getStudentList, deleteStudent, editStudentData, clearInput, gradeAverage, requestSent }
)(StudentList);
