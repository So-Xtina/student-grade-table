const { check, validationResult } = require("express-validator/check");
const letters = /^[a-z ,.'-]+$/i;
const numberLetters = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;

module.exports = (webserver, mysql, database) => {
	webserver.post(
		"/api/add_student",
		[
			check("class_name")
				.isLength({ min: 1, max: 50 })
				.matches(numberLetters),
			check("grade_value")
				.isLength({ min: 1 })
				.isDecimal({ force_decimal: false, decimal_digits: "1,2", locale: "en-US" }),
			check("student_name")
				.isLength({ min: 1, max: 50 })
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

			//if field names are variable OR if field name is provided by front end, reason to do this is to prevent injection attacks;
			// let query = `
			// 	INSERT INTO ??
			// 	(??, ??, ??)
			// 	VALUES (?, ?, ?)
			// `;
			// let inserts = ['grades', 'class_name', 'student_name', 'grade_value', class_name, student_name, grade_value];

			let { class_name, grade_value, student_name } = req.body;

			let query = `
			INSERT INTO grades
			(class_name, student_name, grade_value)
			VALUES (?, ?, ?)
        `;

			let inserts = [class_name, student_name, grade_value];

			let mysqlQuery = mysql.format(query, inserts);

			database.query(mysqlQuery, (err, data, fields) => {
				if (!err) {
					output.success = true;
					output.data = data;
					output.message = "Query successful";
				} else {
					output.errors = err;
					output.message = "Query unsuccessful";
				}
				res.json(output);
			});
		}
	);
};
