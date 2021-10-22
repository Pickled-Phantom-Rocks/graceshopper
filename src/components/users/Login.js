import {React, useState} from 'react';

const Login = (props) => {
	const {baseURL, setUsername, setUserToken, setIsLoggedIn, setUserId, setIsAdmin} = props;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function loginUser() {
		event.preventDefault();

		const response = await fetch(`${baseURL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(response => response.json())
		.then(result => {
			const {status, name, token, id, isAdmin} = result;
			if(status === 204) {
				alert("You have successfully logged in.")
				setIsLoggedIn(true);
				setUsername(name);
				setUserToken(token);
				setUserId(id);
				setIsAdmin(isAdmin);

				localStorage.setItem('isLoggedIn', true);
				localStorage.setItem('isAdmin', isAdmin);
				localStorage.setItem('username', name);
				localStorage.setItem('token', token);
				localStorage.setItem('userId', id);

			} else {
				alert("Invalid email/password combination.")
			}
		})

	}
	
	return <div className="form">
		<h1>Login</h1>
		<form onSubmit={loginUser}>
			<label>Email:</label><br/>
			<input
				className="newInputLine"
				type="email"
				value={email}
				onChange={(event) => {
					setEmail(event.target.value);
				}}
			></input>
			<br/><br/>
			<label>Password</label><br/>
			<input
				className="newInputLine"
				type="password"
				value={password}
				onChange={(event) => {
					setPassword(event.target.value);
				}}
			></input>
			<br/><br/>
			<button type="submit">Submit</button>
		</form>
	</div>
}

export default Login;