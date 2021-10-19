import {React, useState} from 'react';


const EditUser = (props) => {
	const {baseURL, userToken} = props;
	const userId = 3;
	//this userId is for the James account
	//get userId from userToken....somehow
	//profile params? idk

	const [newName, setNewName] = useState('');
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');

	async function sendEditUser() {
		event.preventDefault();

		const response = await fetch(`${baseURL}/users/${userId}/info`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${userToken}`
			},
			body: JSON.stringify({
				name: newName,
				address: address,
				city: city,
				state: state
			})
		}).then(res => res.json())
		.then((result) => { 
			const status = result.status;
			if(status == 204){
				alert("You have successfully updated your info.")
				return location.reload();
			} else {
				alert("Something went wrong. Please try again.")
			}
		})
			.catch(err => console.error(err));
	}


	return <div className="form">
		<form onSubmit={sendEditUser}>
			<label>Name: </label><br/>
			<input
				className="newInputLine"
				type="newName"
				value={newName}
				onChange={(event) => {
					setNewName(event.target.value);
				}}
			></input><br/>
			<label>Address: </label><br/>
			<input 
				className="newInputLine"
				type="address"
				value={address}
				onChange={(event) => {
					setAddress(event.target.value);
				}}
			></input><br/>
			<label>City: </label><br/>
			<input
				className="newInputLine"
				type="city"
				value={city}
				onChange={(event) => {
					setCity(event.target.value);
				}}
			></input><br/>
			<label>State: </label><br/>
			<input
				className="newInputLine"
				type="state"
				value={state}
				onChange={(event) => {
					setState(event.target.value);
				}}
			></input><br/>
			<button>Submit</button>
		</form>
	</div>
}

export default EditUser;