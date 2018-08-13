module.exports = (webserver, mysql, database) => {
	webserver.get("/api/get_student_data", (req, res) => {
		const output = {
			success: false,
			data: [],
			errors: []
		};

		//assume class id of biology
		// let class_name = "biology";

		//let class_name = req.body.class_name;

		let query = `
		SELECT
		id,
		class_name,
		student_name,
		grade_value
		FROM grades`;

		// let inserts = [class_name];

		// let mysqlQuery = mysql.format(query, inserts);

		database.query(query, (err, data, fields) => {
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
