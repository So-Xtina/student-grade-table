import React, { Component } from "react";

class EditStudent extends Component {
	//used this to debug and be able to call this.props in the console of the chrome dev once the state has been first rendered, if you want to see the state after the update use componentWillUpdate
	// componentDidMount() {
	// 	debugger;
	// }

	render() {
		const { student_name, class_name, grade_value, id } = this.props.studentObj;
		const { displayErrStudent, displayErrClass, displayErrGrade, hasError } = this.props;

		console.log("props", displayErrStudent, displayErrClass, displayErrGrade, hasError);

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
								<div className="form-group">
									<label htmlFor="inputStudentName3" className="col-sm-2 control-label">
										Student Name:
									</label>
									<div className={displayErrStudent ? "col-sm-9 has-error" : "col-sm-9 has-primary"}>
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
										<span className={displayErrStudent ? "" : "hideErrMessage"}>
											Not a valid input, must contain letters up to 2-50 characters long.
										</span>
									</div>
								</div>
								<div className="form-group">
									<label htmlFor="inputStudentCourse3" className="col-sm-2 control-label">
										Student Course:
									</label>
									<div className={displayErrClass ? "col-sm-9 has-error" : "col-sm-9 has-primary"}>
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
										<span className={displayErrClass ? "" : "hideErrMessage"}>
											Not a valid input, must contain alphanumeric characters from 2-50 characters
											long for class name.
										</span>
									</div>
								</div>
								<div className="form-group">
									<label htmlFor="inputStudentGrade3" className="col-sm-2 control-label">
										Student Grade:
									</label>
									<div className={displayErrGrade ? "col-sm-9 has-error" : "col-sm-9 has-primary"}>
										<input
											onChange={this.props.editModalInputs}
											ref={id}
											value={grade_value}
											type="text"
											className="form-control"
											id="inputStudentGrade3"
											name="grade_value"
											placeholder="Student Grade"
										/>
										<span className={displayErrGrade ? "" : "hideErrMessage"}>
											Not a valid input, must contain only numbers that are 1-4 characters long
											for the grade value.
										</span>
									</div>
								</div>
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
