import React, { Component } from "react";
import { connect } from "react-redux";
import { getStudentList, addStudent, updateInput, clearInput, gradeAverage } from "../actions";

class AddStudent extends Component {
	constructor(props) {
		super(props);

		this.student = {
			student_name: "",
			class_name: "",
			grade_value: ""
		};

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

		await this.props.addStudent(this.student);

		this.getServerData();

		this.clearInput();
	}

	updateInput(event) {
		const { name, value } = event.target;

		this.props.updateInput(name, value);
	}

	clearInput() {
		for (let key in this.student) {
			this.props.clearInput(key);
		}
	}

	render() {
		const { student_name, class_name, grade_value } = this.props;

		const style = {
			fontSize: "24px"
		};

		return (
			<div className="student-add-form col-md-3 col-lg-3 pull-right">
				<h4>Add Student</h4>
				<div className="input-group form-group">
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
				<div className="input-group form-group">
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
				<div className="input-group form-group">
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
