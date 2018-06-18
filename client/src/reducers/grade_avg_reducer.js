import types from "../actions/types";

const DEFAULT_STATE = {
	average: 0
};

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case types.GRADE_AVERAGE:
			return {
				...state,
				average: action.payload
			};
		default:
			return state;
	}
};
