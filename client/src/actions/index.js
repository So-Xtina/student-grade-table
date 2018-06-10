import types from "./types";
import axios from "axios";
//import dummyData from "../dummy_data";

export function incrementCount(count) {
	return {
		type: types.INCREMENT_COUNT,
		payload: ++count
	};
}

export async function getStudentList() {
	//axios call can go here
	const response = await axios.get("/api/get_student_data");

	return {
		type: types.GET_STUDENT_LIST,
		payload: response
	};
}
