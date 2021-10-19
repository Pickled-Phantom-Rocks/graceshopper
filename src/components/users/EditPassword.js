import {React, useState} from 'react';

const EditPassword = (props) => {
	const {baseURL, userToken} = props;
	const userId = 3;
	//this userId is for the James account
	//get userId from userToken....somehow
	//profile params? idk

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
			const response = await fetch(`${baseURL}/users/${userId}/password`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${userToken}`
				},
				body: JSON.stringify({
					password: current,
					newPassword: newPass
				})
			})
			.then(res => res.json())
			.then((result) => {
				console.log(result);
				const status = result.status;
				if(status == 204) {
					alert("You have successfully updated your password.");
				} else {
					alert("Incorrect current password.");
				}
			})
		}
	}

	return <div>
		<form onSubmit={sendNewPassword}>
			<label>Current Password: </label><br/>
			<input
				className="newInputLine"
				type="current"
				value={current}
				onChange={(event) => {
					setCurrent(event.target.value);
				}}
			></input><br/>
			<label>New Password: </label><br/>
			<input
				className="newInputLine"
				type="newPass"
				value={newPass}
				onChange={(event) => {
					setNewPass(event.target.value);
				}}
			></input><br/>
			<label>Confirm Password: </label><br/>
			<input
				className="newInputLine"
				type="confirm"
				value={confirm}
				onChange={(event) => {
					setConfirm(event.target.value);
				}}
			></input><br/>
			<button>Submit</button>
		</form>
	</div>
}

export default EditPassword;