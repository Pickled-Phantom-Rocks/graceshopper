import {React, useState} from 'react';
import {newInfo, fetchCurrentUserInfo} from '.';

const EditUser = (props) => {
	const {baseURL, userToken, userId} = props;

	const [newName, setNewName] = useState('');
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const userInfo = fetchCurrentUserInfo(baseURL, userId);

	async function sendEditUser() {
		event.preventDefault();
		newInfo(baseURL, userToken, userId, newName, address, city, state);
	}

	return <div className="form">
		<h3>Update Info</h3>
		<div className="formInfo">
			<label>Current Info:</label><br/>
			{userInfo.name}<br/>
			{userInfo.address}<br/>
			{userInfo.city}, {userInfo.state}
		</div>
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
			<button className="submit">Submit</button>
		</form>
	</div>
}

export default EditUser;