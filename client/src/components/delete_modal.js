import React from "react";

function DeleteModal(props) {
	return (
		<div className="deleteModal" role="dialog">
			<div className="modal-dialog">
				<div className="modal-content text-center">
					<div className="modal-header">
						<button onClick={props.showDeleteModal} type="button" className="close" data-dismiss="modal">
							&times;
						</button>
						<h4 className="modal-title">Delete Student</h4>
					</div>
					<div className="modal-body">
						<p>Are you sure you would like to delete this student?</p>
					</div>
					<div className="modal-footer">
						<button
							onClick={props.deleteStudentId}
							type="button"
							className="btn btn-success"
							data-dismiss="modal"
						>
							Yes
						</button>
						<button
							onClick={props.showDeleteModal}
							type="button"
							className="btn btn-danger"
							data-dismiss="modal"
						>
							No
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DeleteModal;
