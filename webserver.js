const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const webserver = express();
const { credentials } = require("./config/mysqlCredentials");
const crontask = require("./cron_job/cron_job");
const database = mysql.createConnection(credentials);

crontask(mysql, database);
webserver.use(bodyParser.urlencoded({ extended: false }));
webserver.use(bodyParser.json());

database.connect(error => {
	if (error) throw error;
	console.log("database connection successful");
});

webserver.use(express.static(__dirname + "/client" + "/public"));

//===============================================
//=============Endpoints start here=============
//=============================================

require("./routes")(webserver, mysql, database);

webserver.get("/test", (req, res) => {
	res.sendFile("/Users/Xtina/Desktop/LFZ/student-grade-table/test.html");
});

webserver.listen(9000, () => {
	console.log("webserver listening on port 9000");
});
