function loginUser(username, password) {
	const loginDetails = {
		username,
		password,
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
}

function registerUser(firstname, lastname, username, email, password) {
	let newUserDetails = {
		firstname,
		lastname,
		username,
		email,
		password,
	};

	fetch('/createUser', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newUserDetails),
	}).then((response) => {
		if (response.ok) {
			console.log('ok')
			loginUser(username, password);
		} else {
			response.json().then((body) => {
				console.log(body);
			});
		}
	});
}

function checkAuthentication() {
	if (window.location.pathname == '/login.html' || window.location.pathname == '/register.html') {
		if (getCookie('token')) {
			window.location.replace('/');
		}
	} else {
		if (getCookie('token').length === 0) {
			window.location.replace('./login.html');
		}
	}
}
