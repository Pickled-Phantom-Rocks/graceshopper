import React, {useState} from 'react';

const Register = (props) => {
	const {baseURL, setUsername, setUserToken, setIsLoggedIn} = props;
	const [newName, setNewName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [billingInfo, setBillingInfo] = useState('');

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
				address: address,
				city: city,
				state: state,
				"billingInfo": billingInfo
			}),
		})
		.then(response => response.json())
		.then(result => {
			console.log(result);
			const token = result.token;
			if(token){
				alert('Thank you for registering!');
				setIsLoggedIn(true);
				setUsername(newName);
				setUserToken(token)

				localStorage.setItem('isLoggedIn', true);
				localStorage.setItem('username', newName);
				localStorage.setItem('token', token);
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
			<label>Address: </label><br />
			<input
				className="newInputLine"
				type="address"
				value={address}
				onChange={(event) => {
					setAddress(event.target.value);
				}}
			></input>
			<br /><br />
			<label>City: </label><br />
			<input
				className="newInputLine"
				type="city"
				value={city}
				onChange={(event) => {
					setCity(event.target.value);
				}}
			></input>
			<br /><br />
			{/* make this a dropdown */}
			<label>State: </label><br />
			<input
				className="newInputLine"
				type="state"
				value={state}
				onChange={(event) => {
					setState(event.target.value);
				}}
			></input>
			<br /><br />
			<label>Billing info: </label><br />
			<input
				className="newInputLine"
				type="billingInfo"
				value={billingInfo}
				onChange={(event) => {
					setBillingInfo(event.target.value);
				}}
			></input>
			<br /><br />
			<button type="submit">Submit</button>
		</form>
	</div>
}

export default Register;