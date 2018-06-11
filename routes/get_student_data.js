module.exports = (webserver, mysql, database) => {
	webserver.get("/api/get_student_data", (req, res) => {
		const output = {
			success: false,
			data: [],
			errors: []
		};

		//assume class id of biology
		let class_name = "biology";

		//let class_name = req.body.class_name;

		let query = `
		SELECT 
		users.first_name,
		users.last_name,
		classes.grade_value,
		classes.class_name
		FROM classes
		JOIN users
			ON classes.student_id = users.id
		WHERE class_name = ?`;

		let inserts = [class_name];

		let mysqlQuery = mysql.format(query, inserts);

		database.query(mysqlQuery, (err, data, fields) => {
			if (!err) {
				output.success = true;
				output.data = data;
				output.message = "Query was successful";
			} else {
				output.errors = err;
			}

			res.json(output);
		});
	});
};
