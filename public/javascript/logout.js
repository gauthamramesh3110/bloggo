const logoutBtn = document.getElementById('logout');
logoutBtn.onclick = function (e) {
	console.log('logout');
	setCookie('token', '');
	window.location.replace('/login.html');
};
