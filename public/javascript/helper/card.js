function getCard(blog, buttonActionText) {
	let card = document.createElement('div');
	card.className = 'card';

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

	return card;
}
