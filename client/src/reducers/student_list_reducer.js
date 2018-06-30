import types from "../actions/types";

const DEFAULT_STATE = {
	studentList: [],
	requestInProgress: false
};

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case types.GET_STUDENT_LIST:
			if (action.payload.data.success) {
				return { ...state, studentList: action.payload.data.data, requestInProgress: false };
			} else {
				return { ...state, errors: [...state.errors, action.payload.data.errors] };
			}
		case types.REQUEST_SENT:
			return { ...state, requestInProgress: action.payload.requestInProgress };
		default:
			return state;
	}
};
