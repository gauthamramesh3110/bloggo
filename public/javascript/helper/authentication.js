function loginUser(username, password) {
	const loginDetails = {
		username,
		password,
	};

	return new Promise((resolve, reject) => {
		fetch('/loginUser', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(loginDetails),
		}).then((response) => {
			if (response.ok) {
				response.json().then((body) => {
					resolve(body);
				});
			} else {
				response.json().then((body) => {
					reject(body);
				});
			}
		});
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

	return new Promise((resolve, reject) => {
		fetch('/createUser', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newUserDetails),
		}).then((response) => {
			if (response.ok) {
				resolve({ username, password });
			} else {
				response.json().then((body) => {
					reject(body);
				});
			}
		});
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
