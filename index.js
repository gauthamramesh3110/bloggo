require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');
const verifyToken = require('./middlewares').verifyToken;
const uuid = require('uuid').v4;

const multer = require('multer');
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads');
	},

	filename: (req, file, cb) => {
		let imageFilename = uuid() + '.' + file.mimetype.split('/')[1];
		req.params.imageFilename = imageFilename;
		cb(null, imageFilename);
	},
});

const upload = multer({
	storage: storage,
});

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

app.post('/postBlog', verifyToken, upload.single('blogImage'), (req, res) => {
	let blogDetails = {
		title: req.body.title,
		imageFilename: req.params.imageFilename,
		imageDescription: req.body.imageDescription,
		body: req.body.body,
		author: req.params.userdetails.firstname + ' ' + req.params.userdetails.lastname,
		username: req.params.userdetails.username,
	};

	db.saveBlog(blogDetails)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

app.get('/getAllBlogs', verifyToken, (req, res) => {
	db.getAllBlogs()
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
