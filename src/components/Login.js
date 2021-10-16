import {React, useState} from 'react';

const Login = (props) => {
	const {baseURL, setUsername, setUserToken, setIsLoggedIn, setIsAdmin} = props;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function loginUser() {
		event.preventDefault();

		const response = await fetch(`${baseURL}/users/login`)

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