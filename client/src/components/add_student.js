import React, { Component } from "react";
import { connect } from "react-redux";
import { getStudentList } from "../actions";

class AddStudent extends Component {
	render() {
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
						type="text"
						className="form-control"
						name="studentName"
						id="studentName"
						placeholder="Student Name"
					/>
				</div>
				<div className="input-group form-group">
					<span className="input-group-addon">
						<span className="glyphicon glyphicon-list-alt" />
					</span>
					<input
						type="text"
						className="form-control"
						name="course"
						id="course"
						placeholder="Student Course"
					/>
				</div>
				<div className="input-group form-group">
					<span className="input-group-addon">
						<span className="glyphicon glyphicon-education" />
					</span>
					<input
						type="text"
						className="form-control"
						name="studentGrade"
						id="studentGrade"
						placeholder="Student Grade"
					/>
				</div>
				<button type="button" className="btn btn-success btn-lg addBtn">
					<i className="fa fa-spinner fa-pulse hide addSpinner" style={style} />Add
				</button>
				<button type="button" className="btn btn-danger btn-lg cancelBtn">
					Cancel
				</button>
				<button type="button" className="btn btn-primary btn-lg dataServerBtn">
					<i className="fa fa-spinner fa-pulse hide dataSpinner" style={style} />Get Data
				</button>
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
)(AddStudent);
