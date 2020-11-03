function getCard(blog, buttonActionText) {
	let card = document.createElement('div');
	card.className = 'card';
	card.id = blog._id;

	let cardTitle = document.createElement('div');
	cardTitle.className = 'card-title';

	let titleText = document.createTextNode(blog.title);
	cardTitle.appendChild(titleText);

	let cardBody = document.createElement('div');
	cardBody.className = 'card-body';

	let bodyText = document.createTextNode(blog.body);
	cardBody.appendChild(bodyText);

	let bodyFade = document.createElement('div');
	bodyFade.className = 'body-fade';
	cardBody.appendChild(bodyFade);

	let cardActions = document.createElement('div');
	cardActions.className = 'card-actions';

	let saveButton = document.createElement('div');
	saveButton.className = 'btn secondary';

	let buttonText = document.createTextNode(buttonActionText);
	saveButton.appendChild(buttonText);
	cardActions.appendChild(saveButton);

	card.appendChild(cardTitle);
	card.appendChild(cardBody);
	card.appendChild(cardActions);

	cardTitle.onclick = function (e) {
		setCookie('blogId', blog._id);
		window.location.replace('/article.html');
	};

	return card;
}
