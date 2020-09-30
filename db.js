require('dotenv');
const mongoose = require('mongoose');
const { User } = require('./schema');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

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
				newUser.save();
			})
			.then(() => resolve('User created!'))
			.catch((err) => {
				reject(err);
			});
	});
};

exports.loginUser = (user) => {
	console.log(user);
	return new Promise((resolve, reject) => {
		getHash(user.username)
			.then((hash) => comparePassword(user.password, hash))
			.then(() => {
				jsonwebtoken.sign(user, 'B6UrjzkEgkfCVX', (err, token) => {
					if (err) {
						console.log(err);
						reject('Error creating token!');
					} else {
						resolve({
							message: 'Successfully Authenticated!',
							token: token,
						});
					}
				});
			})
			.catch((err) => reject(err));
	});
};

function checkEmailAvailable(email) {
	return new Promise((resolve, reject) => {
		User.findOne({ email: email })
			.exec()
			.then((user) => {
				if (user) {
					reject('Email already associated with a user!');
				} else {
					resolve('Email available!');
				}
			})
			.catch((err) => {
				reject(err);
			});
	});
}

function checkUsernameAvailable(username) {
	return new Promise((resolve, reject) => {
		User.findOne({ username: username })
			.exec()
			.then((user) => {
				if (user) {
					reject('Username already taken!');
				} else {
					resolve('Username available!');
				}
			})
			.catch((err) => {
				reject(err);
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
					reject('User not found!');
				}
			})
			.catch((err) => {
				reject(err);
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
				reject(err);
			});
	});
}

function comparePassword(password, hash) {
	return new Promise((resolve, reject) => {
		bcrypt
			.compare(password, hash)
			.then((result) => {
				if (result) {
					resolve('Password Correct!');
				} else {
					reject('Password Incorrect!');
				}
			})
			.catch((err) => {
				reject(err);
			});
	});
}
