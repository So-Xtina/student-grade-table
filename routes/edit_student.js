module.exports = (webserver, mysql, database) => {
	webserver.put("/api/edit_student_data", (req, res) => {
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
	});
};
