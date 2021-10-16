import React, {useState} from 'react';

const Register = (props) => {
	const { setUsername, setUserToken, setIsLoggedIn } = props;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function registerUser() {
		event.preventDefault();

		if(!email.includes('@') || !email.includes('.')) {
			alert("Please enter a valid email address")
		} else if(password.length < 8) {
			alert("Password must be at least 8 characters.")
		} else {

		console.log('email: ', email);
		console.log('password: ', password);	
		const response = await fetch(`../server/api/users/register`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'email': email,
				'password': password
			}),
		})
		.then(response => response.json())
		.then(result => {
			console.log(result);




		})
		.catch(console.error)
		}
	}


	return <div className="form">
		<h1>Register</h1>
		<form onSubmit={registerUser}>
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