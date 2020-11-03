let blogId = getCookie('blogId');
fetch(`/getBlog/${blogId}`, {
	method: 'GET',
	headers: {
		Token: getCookie('token'),
	},
}).then((response) => {
	if (response.ok) {
		response.json().then((body) => {
			let blog = body.blog;
			let title = document.getElementById('article-title');
			title.innerText = blog.title;
			let author = document.getElementById('author-name');
			author.innerText = blog.author;
			let articleBody = document.getElementById('article-body');
			articleBody.innerText = blog.body;

			fetch(`/getImage/${blog.imageFilename}`, {
				method: 'GET',
				headers: {
					Token: getCookie('token'),
				},
			})
				.then((response) => {
					if (response.ok) return response.blob();
				})
				.then((blob) => {
					let articleImageGroup = document.getElementById('article-image-group');
					let articleImage = document.getElementById('article-image');
					let articleImageDescription = document.getElementById('article-image-description');
					articleImage.src = URL.createObjectURL(blob);
					articleImageDescription.innerText = blog.imageDescription;
					console.log(body);
					articleImageGroup.style.display = 'flex';
				});
		});
	} else {
	}
});
