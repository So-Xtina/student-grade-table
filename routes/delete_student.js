const { check, validationResult } = require("express-validator/check");

module.exports = (webserver, mysql, database) => {
	webserver.delete("/api/delete_student", [check("id").isInt()], (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const output = {
			success: false,
			errors: [],
			message: ""
		};

		let id = req.query.id;

		let query = `
            DELETE FROM grades 
            WHERE id = ? 
        `;

		let inserts = [id];

		let mysqlQuery = mysql.format(query, inserts);

		database.query(mysqlQuery, (err, data, fields) => {
			if (!err) {
				output.success = true;
				output.message = "Student has been deleted successfully";
			} else {
				output.errors = err;
			}

			res.json(output);
		});
	});
};
