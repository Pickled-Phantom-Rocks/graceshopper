import {React, useState} from 'react';
import {newPassword} from '.';

const EditPassword = (props) => {
	const {baseURL, userToken, userId} = props;

	const [current, setCurrent] = useState('');
	const [newPass, setNewPass] = useState('');
	const [confirm, setConfirm] = useState('');

	async function sendNewPassword() {
		event.preventDefault();

		if(!current){
			alert("Please enter your current password.")
		} else if(newPass != confirm){
			alert("New and confirmed passwords do not match.");
		} else {
			newPassword(baseURL, userToken, userId, current, newPass);
		}
	}

	return <div className="form">
		<h3>Change Password</h3>
		<form onSubmit={sendNewPassword}>
			<label>Current Password: </label><br/>
			<input
				className="newInputLine"
				type="password"
				value={current}
				onChange={(event) => {
					setCurrent(event.target.value);
				}}
			></input><br/>
			<label>New Password: </label><br/>
			<input
				className="newInputLine"
				type="password"
				value={newPass}
				onChange={(event) => {
					setNewPass(event.target.value);
				}}
			></input><br/>
			<label>Confirm Password: </label><br/>
			<input
				className="newInputLine"
				type="password"
				value={confirm}
				onChange={(event) => {
					setConfirm(event.target.value);
				}}
			></input><br/>
			<button className="submit">Submit</button>
		</form>
	</div>
}

export default EditPassword;