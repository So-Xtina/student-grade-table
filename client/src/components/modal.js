import React, { Component } from "react";

class Modal extends Component {
	render() {
		return (
			<div id="errorModal" class="modal fade" role="dialog">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal">
								&times;
							</button>
							<h4 class="modal-title">Error Message</h4>
						</div>
						<div class="modal-body">
							<p>Data Error!</p>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">
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
