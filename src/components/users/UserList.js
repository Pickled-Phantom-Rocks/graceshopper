import {React, useState} from 'react';
import {fetchUsers} from '.';

const UserList = (props) => {
	const {baseURL} = props;
	const usersList = fetchUsers(baseURL);
	console.log('userList: ', usersList);
	// async function makeAdmin(id) {

	// }


	return 	<div className="userList">
		{/* {
			usersList.map(user => {
				const {id, name, isAdmin} = user;

				return <div className="user" key={id}>
					Name: {name} <br/>
					Admin: { isAdmin ? "Yes" : "No"}
				</div>
			})
		} */}
	</div>
}

export default UserList;