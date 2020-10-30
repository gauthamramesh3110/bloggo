const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: [true, 'Firstname is required!'],
	},
	lastname: {
		type: String,
		required: [true, 'Lastname is required!'],
	},
	username: {
		type: String,
		required: [true, 'Username is required!'],
		minlength: [6, 'Username too short!'],
	},
	email: {
		type: String,
		required: [true, 'Email is required!'],
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
	},
	password: {
		type: String,
		required: [true, 'Password is required!'],
	},
});

const User = mongoose.model('User', userSchema);
exports.User = User;

const BlogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Title is required!'],
	},
	imageFilename: String,
	imageDescription: String,
	body: {
		type: String,
		required: [true, 'Body of the article is required!'],
	},
	username: {
		type: String,
		required: [true, 'Username is required!'],
	},
	author: {
		type: String,
		required: [true, 'Author name is required!'],
	},
	date: { type: Date, default: Date.now },
});

const Blog = mongoose.model('Blog', BlogSchema);
exports.Blog = Blog;
