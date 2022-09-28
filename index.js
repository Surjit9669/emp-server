const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//<<<<< localhost://3000
//Connections with mysql
const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "",
	database: "ems_system",
});

// save data and insert data in database <<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>.
app.post("/users", (req, res) => {
	const {
		firstName,
		lastName,
		dateOfJoin,
		department,
		designation,
		gender,
		phoneNumber,
		email,
		country,
		currentAddress,
		permanentAddress,
		fatherName,
		dateOfBirth,
		marritialStatus,
		jobStatus,
	} = req.body;
	let sql =
		"insert into ems_client (firstName,lastName,dateOfJoin,department,designation,gender,phoneNumber,email,country,currentAddress,permanentAddress,fatherName,dateOfBirth,marritialStatus,jobStatus) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
	let arr = [
		firstName,
		lastName,
		dateOfJoin,
		department,
		designation,
		gender,
		phoneNumber,
		email,
		country,
		currentAddress,
		permanentAddress,
		fatherName,
		dateOfBirth,
		marritialStatus,
		jobStatus,
	];
	db.query(sql, arr, (err, result) => {
		if (err) {
			res.json({ err });
		} else {
			res.json({ success: true });
		}
	});
});

// get user data by id *******************>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<
app.get("/users/:id", (req, res) => {
	let sql3 = `SELECT * FROM ems_client WHERE id=${req.params.id}`;

	db.query(sql3, (err, data) => {
		if (err) {
			res.status(500).json({ message: "server errror" });
		} else {
			res.json({ user: data[0] || {} });
		}
	});
});

// get user by user name start with >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.get("/search", (req, res) => {
	let sql5 = `SELECT * FROM ems_client WHERE firstName LIKE 's%'`;

	db.query(sql5, (err, data) => {
		if (err) {
			res.status(500).json({ message: "server errror" });
		} else {
			res.json({ user: data || {} });
		}
	});
});

//get data is status is start equal to active
app.get("/search/status", (req, res) => {
	let sql5 = `SELECT * FROM ems_client WHERE jobStatus='active' OR jobStatus='a' `;

	db.query(sql5, (err, data) => {
		if (err) {
			res.status(500).json({ message: "server errror" });
		} else {
			res.json({ user: data || {} });
		}
	});
});

//get data by gender is male   >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.get("/search/status/gender", (req, res) => {
	let sql5 = `SELECT * FROM ems_client WHERE gender='male' `;

	db.query(sql5, (err, data) => {
		if (err) {
			res.status(500).json({ message: "server errror" });
		} else {
			res.json({ user: data || {} });
		}
	});
});

// get data age is less then 20 years >>>>>>>>>>>>>>>>>
let date = new Date();
date.setYear(new Date().getFullYear() - 20);

app.get(
	"/search/status/gender/between/nameWithS/ageLessThen",
	(req, res, text) => {
		let sql2 = `select * from ems_client where dateOfBirth <="${date.toISOString()}"`;
		db.query(sql2, (err, data) => {
			if (err) {
				res.status(500).json({ message: "server errror" });
			} else {
				res.json({ users: data });
			}
		});
	}
);

//>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<get data wherw date between and name start with 's'>>>>>>>>>>>
app.get("/search/status/gender/between/nameWithS", (req, res) => {
	let sql5 = `SELECT * FROM ems_client WHERE  firstName LIKE 's%'  AND dateOfBirth BETWEEN '2000-01-01' and '2020-12-31'`;

	db.query(sql5, (err, data) => {
		if (err) {
			res.status(500).json({ message: "server errror" });
		} else {
			res.json({ user: data || {} });
		}
	});
});

// get data between two value >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.get("/search/status/gender/between", (req, res, text) => {
	let sql5 = `SELECT * FROM ems_client WHERE dateOfBirth BETWEEN '2000-01-01' AND '2020-12-31'`;

	db.query(sql5, (err, data) => {
		if (err) {
			res.status(500).json({ message: "server errror" });
		} else {
			res.json({ user: data || {} });
		}
	});
});

//get all user data <<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.get("/users", (req, res, text) => {
	let sql2 = "SELECT * FROM ems_client";
	db.query(sql2, (err, data) => {
		if (err) {
			res.status(500).json({ message: "server errror" });
		} else {
			res.json({ users: data });
		}
	});
});

app.listen(3001, () => console.log("your server is resdy"));
