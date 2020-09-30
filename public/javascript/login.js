if (getCookie('token')) {
	window.location.replace('/');
}

let usernameInput = document.getElementById('username-input');
let passwordInput = document.getElementById('password-input');
let loginBtn = document.getElementById('login-btn');
loginBtn.onclick = function (e) {
	const loginDetails = {
		username: usernameInput.value,
		password: passwordInput.value,
	};

	fetch('/loginUser', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(loginDetails),
	}).then((response) => {
		if (response.ok) {
			response.json().then((body) => {
				setCookie('token', body.token);
				window.location.replace('/');
			});
		} else {
			response.json().then((body) => {
				console.log(body.message);
			});
		}
	});
};
