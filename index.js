const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "",
	database: "employe_system",
});

app.post("/create", (req, res) => {
	const name = req.body.name;
	const number = req.body.number;
	const age = req.body.age;
	const country = req.body.country;
	const position = req.body.position;

	let sql =
		"insert into emplist (name,number,age,country,position) values(?,?,?,?,?)";
	let arr = [name, number, age, country, position];
	db.query(sql, arr, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log("yuhh inseert");
		}
	});
});

app.listen(3001, (req, res) => console.log("your server is resdy"));
