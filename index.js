require('dotenv').config();
const { response } = require('express');
const express = require('express');
const app = express();
const db = require('./db');

app.use(express.static('./public'));
app.use(express.json());

app.post('/createUser', (req, res) => {
	db.createUser(req.body)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

app.post('/loginUser', (req, res) => {
	db.loginUser(req.body)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

app.listen(process.env.PORT, () => {
	console.log(`Listening on port: ${process.env.PORT}`);
});
