checkAuthentication();
let usernameInputGroup = document.getElementById('username-input');
let usernameInput = usernameInputGroup.children[1];
let usernameError = usernameInputGroup.children[2];

let passwordInputGroup = document.getElementById('password-input');
let passwordInput = passwordInputGroup.children[1];
let passwordError = passwordInputGroup.children[2];

let loginBtn = document.getElementById('login-btn');

usernameInput.onkeyup = function (e) {
	if (e.keyCode == 13) {
		loginBtn.click();
	}
};

passwordInput.onkeyup = function (e) {
	if (e.keyCode == 13) {
		loginBtn.click();
	}
};

loginBtn.onclick = function (e) {
	if (usernameInput.value.length > 0 && passwordInput.value.length > 0) {
		loginUser(usernameInput.value, passwordInput.value)
			.then((body) => {
				setCookie('token', body.token);
				window.location.replace('/');
			})
			.catch((body) => {
				let errorMsg;
				if (body.errorCode == errorCode.userNotFound) {
					errorMsg = usernameError;
					passwordError.style.visibility = 'hidden';
					passwordInputGroup.classList.remove('error');
					usernameInputGroup.classList.add('error');
				} else if (body.errorCode == errorCode.incorrectPassword) {
					errorMsg = passwordError;
					usernameError.style.visibility = 'hidden';
					usernameInputGroup.classList.remove('error');
					passwordInputGroup.classList.add('error');
				} else {
					console.log(body.message);
				}
				errorMsg.textContent = body.message;
				errorMsg.style.visibility = 'visible';
			});
	} else {
		usernameError.style.visibility = 'hidden';
		usernameInputGroup.classList.remove('error');

		passwordError.style.visibility = 'hidden';
		passwordInputGroup.classList.remove('error');

		if (usernameInput.value.length == 0) {
			usernameInputGroup.classList.add('error');
			usernameError.textContent = 'Username Required!';
			usernameError.style.visibility = 'visible';
		}

		if (passwordInput.value.length == 0) {
			passwordInputGroup.classList.add('error');
			passwordError.textContent = 'Password Required!';
			passwordError.style.visibility = 'visible';
		}
	}
};
