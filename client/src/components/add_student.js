import React, { Component } from "react";
import { connect } from "react-redux";
import { getStudentList, addStudent, updateInput, clearInput, gradeAverage } from "../actions";
import { lettersValidation, numLetValidation, numbersValidation } from "./input_validation";

class AddStudent extends Component {
	constructor(props) {
		super(props);

		this.student = {
			student_name: "",
			class_name: "",
			grade_value: ""
		};

		this.state = { displayErrStudent: false, displayErrClass: false, displayErrGrade: false };

		this.getServerData = this.getServerData.bind(this);
		this.handleAddItem = this.handleAddItem.bind(this);
		this.updateInput = this.updateInput.bind(this);
		this.clearInput = this.clearInput.bind(this);
	}

	async getServerData() {
		await this.props.getStudentList();

		const { studentList } = this.props;

		this.props.gradeAverage(studentList);
	}

	async handleAddItem() {
		const { student_name, class_name, grade_value } = this.props;

		this.student = {
			student_name,
			class_name,
			grade_value
		};

		let inputErrors = {};

		for (var studentKey in this.student) {
			if (studentKey === "student_name") {
				inputErrors[studentKey] = lettersValidation(this.student[studentKey]);
			}
			if (studentKey === "class_name") {
				inputErrors[studentKey] = numLetValidation(this.student[studentKey]);
			}
			if (studentKey === "grade_value") {
				inputErrors[studentKey] = numbersValidation(this.student[studentKey]);
			}
		}

		if (Object.values(inputErrors).indexOf(true) !== -1) {
			this.setState({
				displayErrStudent: inputErrors["student_name"],
				displayErrClass: inputErrors["class_name"],
				displayErrGrade: inputErrors["grade_value"]
			});
		} else {
			await this.props.addStudent(this.student);

			this.getServerData();

			this.clearInput();
		}
	}

	updateInput(event) {
		const { name, value } = event.target;

		this.props.updateInput(name, value);
	}

	clearInput() {
		for (let key in this.student) {
			this.props.clearInput(key);
		}

		this.setState({
			displayErrStudent: false,
			displayErrClass: false,
			displayErrGrade: false
		});
	}

	render() {
		const { student_name, class_name, grade_value } = this.props;
		const { displayErrStudent, displayErrClass, displayErrGrade } = this.state;

		const style = {
			fontSize: "24px"
		};

		return (
			<div className="student-add-form col-md-3 col-lg-3 pull-right">
				<h4>Add Student</h4>
				<div
					className={
						displayErrStudent ? "input-group form-group has-error" : "input-group form-group has-primary"
					}
				>
					<span className="input-group-addon">
						<span className="glyphicon glyphicon-user" />
					</span>
					<input
						onChange={this.updateInput}
						value={student_name}
						type="text"
						className="form-control"
						name="student_name"
						id="studentName"
						placeholder="Student Name"
					/>
					<span className={displayErrStudent ? "" : "hideErrMessage"}>
						Not a valid input, must contain letters up to 2-50 characters long.
					</span>
				</div>
				<div
					className={
						displayErrClass ? "input-group form-group has-error" : "input-group form-group has-primary"
					}
				>
					<span className="input-group-addon">
						<span className="glyphicon glyphicon-list-alt" />
					</span>
					<input
						onChange={this.updateInput}
						value={class_name}
						type="text"
						className="form-control"
						name="class_name"
						id="course"
						placeholder="Student Course"
					/>
					<span className={displayErrClass ? "" : "hideErrMessage"}>
						Not a valid input, must contain alphanumeric characters from 2-50 characters long for class
						name.
					</span>
				</div>
				<div
					className={
						displayErrGrade ? "input-group form-group has-error" : "input-group form-group has-primary"
					}
				>
					<span className="input-group-addon">
						<span className="glyphicon glyphicon-education" />
					</span>
					<input
						onChange={this.updateInput}
						value={grade_value}
						type="text"
						className="form-control"
						name="grade_value"
						id="studentGrade"
						placeholder="Student Grade"
					/>
					<span className={displayErrGrade ? "" : "hideErrMessage"}>
						Not a valid input, must contain only numbers that are 1-4 characters long for the grade value.
					</span>
				</div>
				<button onClick={() => this.handleAddItem()} type="button" className="btn btn-success btn-md addBtn">
					<i className="fa fa-spinner fa-pulse hide addSpinner" style={style} />Add
				</button>
				<button onClick={() => this.clearInput()} type="button" className="btn btn-danger btn-md cancelBtn">
					Cancel
				</button>
				<button
					onClick={() => this.getServerData()}
					type="button"
					className="btn btn-primary btn-md dataServerBtn"
				>
					<i className="fa fa-spinner fa-pulse hide dataSpinner" style={style} />Get Data
				</button>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		studentList: state.studentListReducer.studentList,
		student_name: state.inputReducer.student_name,
		grade_value: state.inputReducer.grade_value,
		class_name: state.inputReducer.class_name,
		average: state.averageReducer.average
	};
}

export default connect(
	mapStateToProps,
	{ getStudentList, addStudent, updateInput, clearInput, gradeAverage }
)(AddStudent);
