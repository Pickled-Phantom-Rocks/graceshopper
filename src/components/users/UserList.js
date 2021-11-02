import {React, useState, useEffect} from 'react';
import {fetchUsers, deleteUser, changeAdmin} from '.';

const UserList = (props) => {
	const {baseURL, userToken} = props;
	const [userList, setUserList] = useState([]);

	async function fetchTheUsers() {
		try {
			const results = await fetchUsers(baseURL);
			setUserList(results);
		} catch (error) {
			throw error
		}
	}
	useEffect(() => {
		fetchTheUsers();
	}, []);

	async function deleteTheUser(id) {
		const deleted = await deleteUser(baseURL, id);
		location.reload();
	}

	async function makeAdmin(id) {
		const admin = true;
		const results = await changeAdmin(baseURL, userToken, id, admin);
	}

	async function removeAdmin(id) {
		const admin = false;
		const results = await changeAdmin(baseURL, userToken, id, admin);
	}
	return 	<div className="userList">
		{
			userList.map((user) => {
				const {id, name, isAdmin} = user;
				return <div className="listItem" key={id}>
					<h3>{name}</h3>
					<div className="userListItem">
					<div><label>Admin:</label> {isAdmin ? "Yes" : "No"}</div>
					<div className="userOptions">
						{!isAdmin ? <button onClick={() => makeAdmin(id)}>Make Admin</button> : <button onClick={() => removeAdmin(id)}>Remove Admin</button>} <button onClick={() => deleteTheUser({id})}>Delete User</button>
					</div>
					</div>
				</div>
			})
		}
	</div>
}

export default UserList;