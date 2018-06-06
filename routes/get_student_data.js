module.exports = (webserver, mysql, database) => {
	webserver.get("/api/get_student_data", (req, res) => {
		const output = {
			success: false,
			data: [],
			errors: []
		};

		let query = `SELECT 
            id, 
            first_name, 
            last_name
        FROM users`;

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
