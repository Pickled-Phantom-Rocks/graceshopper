import {React, useState, useEffect} from 'react';
import {fetchUsers, deleteUser} from '.';

const UserList = (props) => {
	const {baseURL} = props;
	const [userList, setUserList] = useState([]);

	async function fetchTheUsers() {
		try {
			const results = await fetchUsers(baseURL)

			setUserList(results)
		} catch (error) {
			throw error
		}
	}
	useEffect(() => {
		fetchTheUsers();
	}, []);

	async function deleteTheUser(id) {
		event.preventDefault();

		const deleted = await deleteUser(baseURL, id);
		location.reload();
	}

	

	return 	<div className="userList">
		{
			userList.map((user) => {
				const {id, name, isAdmin} = user;
				return <div className="userListItem" key={id}>
					Name: {name}<br/>
					Admin: {
						isAdmin ? "Yes" : "No"
					}
					<br/>
					{
						!isAdmin ? <button>Make Admin</button> : <button>Remove Admin</button>
					}
					
					<button onClick={() => deleteTheUser({id})}>Delete User</button>
				</div>
			})
		}
	</div>
}

export default UserList;