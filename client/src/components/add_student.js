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

		this.getServerData();

		this.getServerData = this.getServerData.bind(this);
		this.handleAddItem = this.handleAddItem.bind(this);
		this.updateInput = this.updateInput.bind(this);
		this.clearInput = this.clearInput.bind(this);
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

	async getServerData() {
		await this.props.getStudentList();

		const { studentList } = this.props;

		this.props.gradeAverage(studentList);
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
				</div>
				<span className={displayErrStudent ? "" : "hideErrMessage"}>Please enter full name.</span>
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
				</div>
				<span className={displayErrClass ? "" : "hideErrMessage"}>Please enter a class name.</span>
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
						type="number"
						className="form-control"
						name="grade_value"
						id="studentGrade"
						placeholder="Student Grade"
					/>
				</div>
				<span className={displayErrGrade ? "" : "hideErrMessage"}>
					Please enter a grade percentage, Example: 70.00
				</span>
				<br />
				<button onClick={() => this.handleAddItem()} type="button" className="btn btn-success btn-md addBtn">
					Add
				</button>
				<button onClick={() => this.clearInput()} type="button" className="btn btn-danger btn-md cancelBtn">
					Cancel
				</button>
				<button
					onClick={() => this.getServerData()}
					type="button"
					className="btn btn-primary btn-md dataServerBtn"
				>
					Reload Student Data
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
