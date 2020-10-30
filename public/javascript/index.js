checkAuthentication();

fetch('/getAllBlogs', {
	method: 'GET',
	headers: {
		'Token': getCookie('token'),
	},
}).then((response) => {
	if (response.ok) {
		response.json().then((body) => {
			let blogs = body.blogs;
			let homeGrid = document.getElementById('home-grid');
			blogs.forEach((blog) => {
				let card = getCard(blog, 'save');
				homeGrid.appendChild(card);
			});
		});
	} else {
	}
});
