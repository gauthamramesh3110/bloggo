checkAuthentication();

let registerBtn = document.getElementById('register-btn');
registerBtn.onclick = function (e) {
	let firstname = document.getElementById('first-name').value;
	let lastname = document.getElementById('last-name').value;
	let username = document.getElementById('username').value;
	let email = document.getElementById('email').value;
	let password = document.getElementById('password').value;
	let retypePassword = document.getElementById('retype-password').value;

	if (password == retypePassword) {
		registerUser(firstname, lastname, username, email, password);
	}
};
