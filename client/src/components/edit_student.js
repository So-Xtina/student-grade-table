import React, { Component } from "react";

class EditStudent extends Component {
	//used this to debug and be able to call this.props in the console of the chrome dev once the state has been first rendered, if you want to see the state after the update use componentWillUpdate
	// componentDidMount() {
	// 	debugger;
	// }

	render() {
		const { student_name, class_name, grade_value, id } = this.props.studentObj;
		const { displayErrStudent, displayErrClass, displayErrGrade } = this.props;

		return (
			<div className="editModal" role="dialog">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button
								onClick={this.props.showEditModal}
								type="button"
								className="close"
								data-dismiss="modal"
							>
								&times;
							</button>
							<h4 className="modal-title text-center">Edit Student Info &amp; Grade</h4>
						</div>
						<div className="modal-body">
							<form className="form-horizontal">
								<div
									className={
										displayErrStudent
											? "input-group form-group col-sm-12 has-error"
											: "input-group form-group col-sm-12 has-primary"
									}
								>
									<span className="input-group-addon">
										<span className="glyphicon glyphicon-user" />
									</span>
									<input
										onChange={this.props.editModalInputs}
										ref={id}
										value={student_name}
										type="text"
										className="form-control"
										id="inputStudentName3"
										name="student_name"
										placeholder="Student Name"
									/>
								</div>
								<span className={displayErrStudent ? "" : "hideErrMessage"}>
									Please enter a full name.
								</span>
								<div
									className={
										displayErrClass
											? "input-group form-group col-sm-12 has-error"
											: "input-group form-group col-sm-12 has-primary"
									}
								>
									<span className="input-group-addon">
										<span className="glyphicon glyphicon-list-alt" />
									</span>
									<input
										onChange={this.props.editModalInputs}
										ref={id}
										value={class_name}
										type="text"
										className="form-control"
										id="inputStudentCourse3"
										name="class_name"
										placeholder="Student Course"
									/>
								</div>
								<span className={displayErrClass ? "" : "hideErrMessage"}>
									Please enter a class name.
								</span>
								<div
									className={
										displayErrGrade
											? "input-group form-group col-sm-12 has-error"
											: "input-group form-group col-sm-12 has-primary"
									}
								>
									<span className="input-group-addon">
										<span className="glyphicon glyphicon-education" />
									</span>
									<input
										onChange={this.props.editModalInputs}
										ref={id}
										value={grade_value}
										type="number"
										className="form-control"
										id="inputStudentGrade3"
										name="grade_value"
										placeholder="Student Grade"
									/>
								</div>
								<span className={displayErrGrade ? "" : "hideErrMessage"}>
									Please enter a grade percentage, Example: 70.00
								</span>
							</form>
						</div>
						<div className="modal-footer">
							<button
								onClick={this.props.editStudentDataInput}
								type="button"
								className="btn btn-info"
								data-dismiss="modal"
							>
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default EditStudent;
