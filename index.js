require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');

app.use(express.static('./public'));
app.use(express.json());

app.post('/createUser', (req, res) => {
	db.createUser(req.body)
		.then((message) => {
			console.log(message);
			res.status(200).json({
				message,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json({
				message: err,
			});
		});
});

app.post('/loginUser', (req, res) => {
	db.loginUser(req.body)
		.then((response) => {
			console.log(response);
			res.status(200).json(response);
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json({
				message: err,
			});
		});
});

app.listen(process.env.PORT, () => {
	console.log(`Listening on port: ${process.env.PORT}`);
});
