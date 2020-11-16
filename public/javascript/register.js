checkAuthentication();
let firstnameInputGroup = document.getElementById('first-name');
let lastnameInputGroup = document.getElementById('last-name');
let usernameInputGroup = document.getElementById('username');
let emailInputGroup = document.getElementById('email');
let passwordInputGroup = document.getElementById('password');
let retypePasswordInputGroup = document.getElementById('retype-password');

let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

let registerBtn = document.getElementById('register-btn');
registerBtn.onclick = function (e) {
	firstnameInputGroup.classList.remove('error');
	lastnameInputGroup.classList.remove('error');
	usernameInputGroup.classList.remove('error');
	emailInputGroup.classList.remove('error');
	passwordInputGroup.classList.remove('error');
	retypePasswordInputGroup.classList.remove('error');

	let hasValidationError = false;

	if (firstnameInputGroup.children[1].value.length < 1) {
		hasValidationError = true;
		firstnameInputGroup.classList.add('error');
		firstnameInputGroup.children[2].textContent = 'Firstname is required!';
	}

	if (lastnameInputGroup.children[1].value.length < 1) {
		hasValidationError = true;
		lastnameInputGroup.classList.add('error');
		lastnameInputGroup.children[2].textContent = 'Lastname is required!';
	}

	if (usernameInputGroup.children[1].value.length < 6) {
		hasValidationError = true;
		usernameInputGroup.classList.add('error');
		usernameInputGroup.children[2].textContent = 'Minimum 6 characters required!';
	}

	if (!emailRegex.test(emailInputGroup.children[1].value)) {
		hasValidationError = true;
		emailInputGroup.classList.add('error');
		emailInputGroup.children[2].textContent = 'Enter a valid email!';
	}

	if (passwordInputGroup.children[1].value.length < 6) {
		hasValidationError = true;
		passwordInputGroup.classList.add('error');
		passwordInputGroup.children[2].textContent = 'Minimum 6 character required!';
	}

	if (passwordInputGroup.children[1].value != retypePasswordInputGroup.children[1].value) {
		hasValidationError = true;
		retypePasswordInputGroup.classList.add('error');
		retypePasswordInputGroup.children[2].textContent = 'Passwords do not match!';
	}

	if (!hasValidationError) {
		firstname = firstnameInputGroup.children[1].value;
		lastname = firstnameInputGroup.children[1].value;
		username = usernameInputGroup.children[1].value;
		email = emailInputGroup.children[1].value;
		password = passwordInputGroup.children[1].value;
		registerUser(firstname, lastname, username, email, password)
			.then((user) => {
				return loginUser(user.username, user.password);
			})
			.then((body) => {
				setCookie('token', body.token);
				window.location.replace('/');
			})
			.catch((body) => {
				console.log(body.message);
			});
	}
};
