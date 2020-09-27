blogs = [
	{
		title: 'This is a test header 1',
		body:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum massa faucibus laoreet metus sit vitae ligula ultrices vestibulum. Diam nec volutpat facilisis euismod aenean molestie consequat est...',
	},

	{
		title: 'This is a test header 2',
		body:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum massa faucibus laoreet metus sit vitae ligula ultrices vestibulum. Diam nec volutpat facilisis euismod aenean molestie consequat est...',
	},

	{
		title: 'This is a test header 3',
		body:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum massa faucibus laoreet metus sit vitae ligula ultrices vestibulum. Diam nec volutpat facilisis euismod aenean molestie consequat est...',
	},

	{
		title: 'This is a test header 3',
		body:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum massa faucibus laoreet metus sit vitae ligula ultrices vestibulum. Diam nec volutpat facilisis euismod aenean molestie consequat est...',
	},

	{
		title: 'This is a test header 3',
		body:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum massa faucibus laoreet metus sit vitae ligula ultrices vestibulum. Diam nec volutpat facilisis euismod aenean molestie consequat est...',
	},

	{
		title: 'This is a test header 3',
		body:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum massa faucibus laoreet metus sit vitae ligula ultrices vestibulum. Diam nec volutpat facilisis euismod aenean molestie consequat est...',
	},

	{
		title: 'This is a test header 3',
		body:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum massa faucibus laoreet metus sit vitae ligula ultrices vestibulum. Diam nec volutpat facilisis euismod aenean molestie consequat est...',
	},

	{
		title: 'This is a test header 3',
		body:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum massa faucibus laoreet metus sit vitae ligula ultrices vestibulum. Diam nec volutpat facilisis euismod aenean molestie consequat est...',
	},

	{
		title: 'This is a test header 3',
		body:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum massa faucibus laoreet metus sit vitae ligula ultrices vestibulum. Diam nec volutpat facilisis euismod aenean molestie consequat est...',
	},

	{
		title: 'This is a test header 3',
		body:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum massa faucibus laoreet metus sit vitae ligula ultrices vestibulum. Diam nec volutpat facilisis euismod aenean molestie consequat est...',
	},

	{
		title: 'This is a test header 3',
		body:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum massa faucibus laoreet metus sit vitae ligula ultrices vestibulum. Diam nec volutpat facilisis euismod aenean molestie consequat est...',
	},

	{
		title: 'This is a test header 3',
		body:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum massa faucibus laoreet metus sit vitae ligula ultrices vestibulum. Diam nec volutpat facilisis euismod aenean molestie consequat est...',
	},
];

let homeGrid = document.getElementById('home-grid');
blogs.forEach((blog) => {
	console.log(blog);
	let card = getCard(blog);
	homeGrid.appendChild(card);
});

//HELPER FUNCTIONS
function getCard(blog) {
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

	let cardActions = document.createElement('div');
	cardActions.className = 'card-actions';

	let saveButton = document.createElement('div');
	saveButton.className = 'btn secondary';

	let buttonText = document.createTextNode('save');
	saveButton.appendChild(buttonText);
	cardActions.appendChild(saveButton);

	card.appendChild(cardTitle);
	card.appendChild(cardBody);
	card.appendChild(cardActions);

	return card;
}
