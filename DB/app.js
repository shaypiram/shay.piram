//import

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const sql = require("./db.js");

//init the app
const app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));


// home route
app.get("/", (req, res) => {
	res.json({ message: "welcome" });
});

//customers route
app.get("/customers", function (req, res) {
	sql.query("SELECT * FROM customers", (err, mysqlres) => {
		if (err) {
			console.log("error: ", err);
			res.status(400).send({ message: "error in getting all customers: " + err });
			return;
		}
		console.log("got all customers...");
		res.send(mysqlres);
		return;
	});
});

// set server to listen on port
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});

// use static files located in 'public' dir
app.use(express.static('public'));
