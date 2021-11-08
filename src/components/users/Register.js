import React, {useState} from 'react';
import { createCartForUser } from '../cart/cartUtils';

const Register = (props) => {
	const {baseURL, setUsername, setUserToken, setUserId, setIsLoggedIn} = props;
	const [newName, setNewName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function registerUser() {
		event.preventDefault();

		if(!email.includes('@') || !email.includes('.')) {
			alert("Please enter a valid email address")
		} else if(password.length < 8) {
			alert("Password must be at least 8 characters.")
		} else {
	
		const response = await fetch(`${baseURL}/users/register`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password,
				name: newName,
			}),
		})
		.then(response => response.json())
		.then(result => {
			const token = result.token;
			const id = result.userId
			if(token){
				alert('Thank you for registering!');
				setIsLoggedIn(true);
				setUsername(newName);
				setUserToken(token);
				setUserId(id);
				createCartForUser(id, baseURL)

				localStorage.setItem('isLoggedIn', true);
				localStorage.setItem('username', newName);
				localStorage.setItem('token', token);
				localStorage.setItem('userId', id);
				return result
			} else {
				alert("Invalid email/password combination. Please try again.")
			}
		})
		.catch(console.error)
		}
	}


	return <div className="form">
		<h1>Register</h1>
		<form onSubmit={registerUser}>
		<label>Name: </label><br />
			<input
				className="newInputLine"
				type="newName"
				value={newName}
				onChange={(event) => {
					setNewName(event.target.value);
				}}
			></input>
			<br /><br />
			<label>Email: </label><br />
			<input
				className="newInputLine"
				type="email"
				value={email}
				onChange={(event) => {
					setEmail(event.target.value);
				}}
			></input>
			<br /><br />
			<label>Password: </label><br />
			<input
				className="newInputLine"
				type="password"
				value={password}
				onChange={(event) => {
					setPassword(event.target.value);
				}}
			></input>

			<br /><br />
			<button type="submit">Submit</button>
		</form>
	</div>
}

export default Register;