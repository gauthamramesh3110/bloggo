checkAuthentication();

let loginBtn = document.getElementById('login-btn');
loginBtn.onclick = function (e) {
	let usernameInput = document.getElementById('username-input');
	let passwordInput = document.getElementById('password-input');
	loginUser(usernameInput.value, passwordInput.value);
};
