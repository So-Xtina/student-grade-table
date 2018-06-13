module.exports = (webserver, mysql, database) => {
	webserver.delete("/api/delete_student", (req, res) => {
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
