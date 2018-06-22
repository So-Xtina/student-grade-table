export function lettersValidation(value) {
	const letters = /^[a-z ,.'-]+$/i;

	if (value === "" || !letters.test(value)) {
		return true;
	} else {
		return false;
	}
}

export function numbersValidation(value) {
	const numbers = /^[0-9 ,.]{2,5}$/;

	if (value === "" || !numbers.test(value)) {
		return true;
	} else {
		return false;
	}
}

export function numLetValidation(value) {
	const numberLetters = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;

	if (value === "" || !numberLetters.test(value)) {
		return true;
	} else {
		return false;
	}
}
