import { combineReducers } from "redux";
import countReducer from "./count_reducer";
import studentListReducer from "./student_list_reducer";
import inputReducer from "./update_input_reducer";
import averageReducer from "./grade_avg_reducer";

export default combineReducers({
	countReducer: countReducer,
	studentListReducer: studentListReducer,
	inputReducer: inputReducer,
	averageReducer: averageReducer
});
