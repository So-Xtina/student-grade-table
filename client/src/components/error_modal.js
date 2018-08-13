import React, { Component } from "react";

class Modal extends Component {
	render() {
		return (
			<div id="errorModal" className="modal fade" role="dialog">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal">
								&times;
							</button>
							<h4 className="modal-title">Error Message</h4>
						</div>
						<div className="modal-body">
							<p>{this.props.message}</p>
							<p>{this.props.errorMessage}</p>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-default" data-dismiss="modal">
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Modal;
