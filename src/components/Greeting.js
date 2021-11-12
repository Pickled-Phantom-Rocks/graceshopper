import React, { useState, useEffect } from 'react';
import { fetchCurrentUserInfo } from './users/userUtils'

const Greeting = (props) => {

	const [userData, setUserData] = useState([])

	async function getTheUserInfo() {
		const userInfo = await fetchCurrentUserInfo()
		setUserData(userInfo)
		console.log("UserInfo: ", userInfo)
	}

	const {username} = props;
	return <div className="greeting">
		<h2>Hello, {username}!</h2><br/>
		Welcome to
		<div className="greetingInner">
			<img src="images/pickleL.jpg" />
			<h1>Pickled Phantom Rocks</h1>
			<img src="images/pickleR.jpg" />
		</div>
		Your one stop shop for Pet Rocks with Personality
	</div>
}

export default Greeting;