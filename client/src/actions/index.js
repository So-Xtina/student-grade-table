import types from "./types";
import dummyData from "../dummyData";

export function incrementCount(count) {
	return {
		type: types.INCREMENT_COUNT,
		payload: ++count
	};
}

//export async function getStudentList()
export function getStudentList() {
	//axios call can go here
	//const response = await axios.get("url", dataToSend);

	return {
		type: types.GET_STUDENT_LIST,
		payload: dummyData
	};
}
