require('dotenv').config();
const mongoose = require('mongoose');
const { User, Blog } = require('./schema');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const errorCode = require('./errorCode').errorCode;

mongoose
	.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Connected to database.');
	})
	.catch(() => {
		console.log('Error connecting to database.');
	});

exports.createUser = (user) => {
	return new Promise((resolve, reject) => {
		checkUsernameAvailable(user.username)
			.then(() => checkEmailAvailable(user.email))
			.then(() => hashPassword(user.password))
			.then((hash) => {
				user.password = hash;
				const newUser = new User(user);
				return newUser.save();
			})
			.then(() =>
				resolve({
					message: 'User created!',
				}),
			)
			.catch((err) => {
				console.log(err);
				reject({
					message: 'Internal Error',
					errorCode: errorCode.error,
				});
			});
	});
};

exports.loginUser = (user) => {
	return new Promise((resolve, reject) => {
		getHash(user.username)
			.then((response) => {
				user.firstname = response.firstname;
				user.lastname = response.lastname;
				return comparePassword(user.password, response.hash);
			})
			.then(() => {
				jsonwebtoken.sign(user, process.env.JWT_PRIVATE_KEY, (err, token) => {
					if (err) {
						console.log(err);
						reject({
							message: 'Internal Error!',
							errorCode: errorCode.error,
						});
					} else {
						resolve({
							message: 'Successfully Authenticated!',
							token: token,
						});
					}
				});
			})
			.catch((err) => {
				reject(err);
			});
	});
};

exports.saveBlog = (blogDetails) => {
	return new Promise((resolve, reject) => {
		const newBlog = new Blog(blogDetails);
		newBlog
			.save()
			.then(() => {
				resolve({
					message: 'Blog saved successfully!',
				});
			})
			.catch((err) =>
				reject({
					message: 'Internal Error!',
					errorCode: errorCode.error,
				}),
			);
	});
};

exports.getAllBlogs = () => {
	return new Promise((resolve, reject) => {
		Blog.find()
			.limit(15)
			.sort('-date')
			.select('title body')
			.exec()
			.then((blogs) => {
				resolve({
					message: 'Successfully retrived all blogs.',
					blogs: blogs,
				});
			})
			.catch((err) => {
				console.log(err);
				reject({
					message: 'Internal Error!',
					errorCode: errorCode.error,
				});
			});
	});
};

exports.getBlog = (blogId) => {
	return new Promise((resolve, reject) => {
		Blog.findById(blogId)
			.exec()
			.then((blog) => {
				resolve({
					message: 'Successfully retrived all blogs.',
					blog: blog,
				});
			})
			.catch((err) => {
				console.log(err);
				reject({
					message: 'Internal Error!',
					errorCode: errorCode.error,
				});
			});
	});
};

function checkEmailAvailable(email) {
	return new Promise((resolve, reject) => {
		User.findOne({ email: email })
			.exec()
			.then((user) => {
				if (user) {
					reject({
						message: 'Email already associated with a user!',
						errorCode: errorCode.emailNotAvailable,
					});
				} else {
					resolve();
				}
			})
			.catch((err) => {
				console.log(err);
				reject({
					message: 'Internal Error',
					errorCode: errorCode.error,
				});
			});
	});
}

function checkUsernameAvailable(username) {
	return new Promise((resolve, reject) => {
		User.findOne({ username: username })
			.exec()
			.then((user) => {
				if (user) {
					reject({
						message: 'Username already taken!',
						errorCode: errorCode.usernameNotAvailable,
					});
				} else {
					resolve();
				}
			})
			.catch((err) => {
				console.log(err);
				reject({
					message: 'Internal Error',
					errorCode: errorCode.error,
				});
			});
	});
}

function getHash(username) {
	return new Promise((resolve, reject) => {
		User.findOne({ username }, 'password firstname lastname')
			.exec()
			.then((user) => {
				if (user) {
					resolve({ hash: user.password, firstname: user.firstname, lastname: user.lastname });
				} else {
					reject({
						message: 'User not found!',
						errorCode: errorCode.userNotFound,
					});
				}
			})
			.catch((err) => {
				console.log(err);
				reject({
					message: 'Internal Error',
					errorCode: errorCode.error,
				});
			});
	});
}

function hashPassword(password) {
	return new Promise((resolve, reject) => {
		bcrypt
			.hash(password, 10)
			.then((hash) => {
				resolve(hash);
			})
			.catch((err) => {
				console.log(err);
				reject({
					message: 'Internal Error',
					errorCode: errorCode.error,
				});
			});
	});
}

function comparePassword(password, hash) {
	return new Promise((resolve, reject) => {
		bcrypt
			.compare(password, hash)
			.then((result) => {
				if (result) {
					resolve();
				} else {
					reject({
						message: 'Password Incorrect!',
						errorCode: errorCode.incorrectPassword,
					});
				}
			})
			.catch((err) => {
				console.log(err);
				reject({
					message: 'Internal Error',
					errorCode: err,
				});
			});
	});
}
