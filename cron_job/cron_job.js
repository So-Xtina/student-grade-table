const CronJob = require("cron").CronJob;

module.exports = function(mysql, database) {
	const job = new CronJob("*/30 * * * *", function() {
		let clear = `
        TRUNCATE TABLE 
        student_grade_table.grades`;

		let query = `
        INSERT INTO grades
        (id, class_name, student_name, grade_value)
        VALUES (?, ?, ?, ?)
        `;

		let inserts = [
			{
				id: 1,
				class_name: "Chemistry 101",
				student_name: "Hilary Compton",
				grade_value: 75
			},
			{
				id: 2,
				class_name: "Business Calculus",
				student_name: "Arnold Palmer",
				grade_value: 100
			},
			{
				id: 3,
				class_name: "Art History",
				student_name: "Tricia Ward",
				grade_value: 85
			},
			{
				id: 4,
				class_name: "Literature 201",
				student_name: "Bob Doe",
				grade_value: 91.5
			},
			{
				id: 5,
				class_name: "Survey of Jazz",
				student_name: "Liliana Mendez",
				grade_value: 80.5
			}
		];

		function insertStudents(inserts) {
			console.log("this is my arr: ", inserts);
			for (let i = 0; i < inserts.length; i++) {
				let newInsert = [];
				let student = inserts[i];
				for (let key in student) {
					newInsert.push(student[key]);
				}
				let mysqlQuery = mysql.format(query, newInsert);

				database.query(mysqlQuery, function(err, data, fields) {
					if (err) {
						console.log("We have an error", err);
					} else {
						console.log("Query Successful, default data set in database");
					}
				});
			}
		}

		database.query(clear, function() {
			console.log("Your data has been cleared from the database");
		});

		insertStudents(inserts);
	});
	job.start();
};
