checkAuthentication();

let file;

let uploadBtn = document.getElementById('upload-btn');
let imageInput = document.getElementById('image-input');
uploadBtn.onclick = function (e) {
	imageInput.click();
};

imageInput.onchange = function (e) {
	file = e.target.files[0];
	let image = document.getElementById('image');
	let imageUpload = document.getElementById('image-upload');

	image.src = URL.createObjectURL(file);
	uploadBtn.style.display = 'none';
	image.style.display = 'block';
	imageUpload.style.width = 'auto';
};

let saveBtn = document.getElementById('save-btn');
saveBtn.onclick = function (e) {
	console.log('lolol');
	let titleInput = document.getElementById('title-input');
	let imageDescriptionInput = document.getElementById('image-description-input');
	let articleBodyInput = document.getElementById('article-body-input');

	if (titleInput.value == '' || articleBodyInput.value == '') return;

	let formData = new FormData();
	formData.append('title', titleInput.value);
	formData.append('body', articleBodyInput.value);

	if (imageDescriptionInput) formData.append('imageDescription', imageDescriptionInput.value);
	if (file) formData.append('blogImage', file);

	fetch('/postBlog', {
		method: 'POST',
		headers: {
			token: getCookie('token'),
		},
		body: formData,
	}).then((response) => {
		if (response.ok) {
			window.location.replace('/');
		} else {
			response.json().then((body) => {
				console.log(body);
			});
		}
	});
};
