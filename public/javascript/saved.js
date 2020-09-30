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
];

let savedGrid = document.getElementById('saved-grid');
blogs.forEach((blog) => {
	let card = getCard(blog, 'delete');
	savedGrid.appendChild(card);
});
