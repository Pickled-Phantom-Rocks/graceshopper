import {React, useState, useEffect} from 'react';
import {fetchUsers} from '.';

const UserList = (props) => {
	const {baseURL} = props;
	const [userList, setUserList] = useState();

	async function fetchTheUsers() {
		try {
			const result = await fetchUsers(baseURL)
			setUserList(result)
		} catch (error) {
			console.log("Error fetching users: ", error)
		}
	}
	useEffect(() => {
		fetchTheUsers();
	}, []);

	return 	<div className="userList">
		{
			userList.map(user => {
				const {id, name, isAdmin} = user;

				return <div className="user" key={id}>
					Name: {name} <br/>
					Admin: { isAdmin ? "Yes" : "No"}
				</div>
			})
		}
	</div>
}

export default UserList;