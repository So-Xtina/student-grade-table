import types from "./types";
import axios from "axios";

export function incrementCount(count) {
	return {
		type: types.INCREMENT_COUNT,
		payload: ++count
	};
}

export function getStudentList() {
	const response = axios.get("/api/get_student_data");

	return {
		type: types.GET_STUDENT_LIST,
		payload: response
	};
}

export function addStudent(student) {
	const response = axios.post("/api/add_student", student);

	return {
		type: types.ADD_STUDENT,
		payload: response
	};
}

export function updateInput(name, value) {
	return {
		type: types.UPDATE_INPUT,
		payload: {
			name,
			value
		}
	};
}

export function clearInput(name) {
	return {
		type: types.CLEAR_INPUT,
		payload: name
	};
}

export function deleteStudent(id) {
	const response = axios.delete("/api/delete_student", {
		params: {
			id
		}
	});

	return {
		type: types.DELETE_STUDENT,
		payload: response
	};
}

export function editStudentData(student) {
	const response = axios.put("/api/edit_student_data", { student });

	return {
		type: types.EDIT_STUDENT,
		payload: response
	};
}

export function gradeAverage(students) {
	let totalGrades = null;

	students.map(currentStudent => {
		totalGrades += parseInt(currentStudent.grade_value, 10);

		return totalGrades;
	});

	const totalAverage = totalGrades / students.length;
	const average = totalAverage.toFixed(2);

	return {
		type: types.GRADE_AVERAGE,
		payload: average
	};
}

export function requestSent() {
	return {
		type: types.REQUEST_SENT,
		payload: {
			requestInProgress: true
		}
	};
}
