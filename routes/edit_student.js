const { check, validationResult } = require("express-validator/check");
const letters = /^[a-z ,.'-]+$/i;
const numberLetters = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;

module.exports = (webserver, mysql, database) => {
	webserver.put(
		"/api/edit_student_data",
		[
			check("class_name")
				.isLength({ min: 1, max: 50 })
				.matches(numberLetters),
			check("grade_value")
				.isLength({ min: 1 })
				.isDecimal({ force_decimal: false, decimal_digits: "1,3", locale: "en-US" }),
			check("student_name")
				.isLength({ min: 1, max: 100 })
				.matches(letters)
		],
		(req, res) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}

			const output = {
				success: false,
				data: [],
				errors: [],
				message: ""
			};

			let { class_name, student_name, grade_value, id } = req.body.student;

			let query = `
            UPDATE grades SET class_name = ?, student_name = ?, grade_value = ?
            WHERE id = ?
        `;

			let inserts = [class_name, student_name, grade_value, id];

			let mysqlQuery = mysql.format(query, inserts);

			database.query(mysqlQuery, (err, data, fields) => {
				if (!err) {
					output.success = true;
					output.data = data;
					output.message = "Student was successfully updated";
				} else {
					output.errors = err;
					output.message = "Student was not updated";
				}

				res.json(output);
			});
		}
	);
};
