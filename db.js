require('dotenv');
const mongoose = require('mongoose');
const { User } = require('./schema');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

let errorCode = {
	error: 0,
	usernameNotAvailable: 1,
	emailNotAvailable: 2,
	userNotFound: 3,
	incorrectPassword: 4,
};

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
			.then((hash) => comparePassword(user.password, hash))
			.then(() => {
				jsonwebtoken.sign(user, 'B6UrjzkEgkfCVX', (err, token) => {
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
		User.findOne({ username }, 'password')
			.exec()
			.then((user) => {
				if (user) {
					resolve(user.password);
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
