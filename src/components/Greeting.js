import React from 'react';

const Greeting = (props) => {
	const {username} = props;
	return <div className="greeting">
		<h2>Hello, {username}!</h2><br/>
		Welcome to
		<h1>Pickled Phantom Rocks</h1>
		Your one stop shop for all things Pet Rocks
	</div>
}

export default Greeting;