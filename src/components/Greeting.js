import React from 'react';

const Greeting = (props) => {
	const {username} = props;
	return <div className="greeting">
		<h2>Hello, {username}!</h2><br/>
		Welcome to
		<div className="greetingInner">
			<img src="images/pickleL.jpg" />
			<h1>Pickled Phantom Rocks</h1>
			<img src="images/pickleR.jpg" />
		</div>
		Your one stop shop for all things Pet Rocks
	</div>
}

export default Greeting;