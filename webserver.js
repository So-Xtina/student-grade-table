const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const webserver = express();
const { credentials } = require("./config/mysqlCredentials");
const database = mysql.createConnection(credentials);

webserver.use(bodyParser.urlencoded({ extended: false }));
webserver.use(bodyParser.json());

database.connect(error => {
	if (error) throw error;
	console.log("database connection successful");
});

webserver.use(express.static(__dirname + "/client" + "/public"));

webserver.listen(9000, () => {
	console.log("webserver listening on port 9000");
});
