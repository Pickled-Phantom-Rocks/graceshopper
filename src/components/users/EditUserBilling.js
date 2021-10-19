import {React, useState} from 'react';

const EditUserBilling = (props) => {
	const {baseURL, userToken} = props;
	const userId = 3;
	//this userId is for the James account
	//get userId from userToken....somehow
	//profile params? idk

	const [card, setCard] = useState('');
	const [cvv, setCVV] = useState('');

	async function sendEditBilling() {
		event.preventDefault();

		const response = await fetch(`${baseURL}/users/${userId}/billing`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${userToken}`
			},
			body: JSON.stringify({
				card: card,
				cvv: cvv
			})
		})
		.then(res => res.json())
		.then((result) => {
			const status = result.status;
			if(status == 204){
				alert("You have successfully updated your billing info.")
			} else {
				alert("Something went wrong. Please try again.")
			}
		})
		.catch(err => console.error(err));

	}

	return <div>
		<form onSubmit={sendEditBilling}>
			<label>Card Number: </label><br />
			<input
				className="newInputLine"
				type="card"
				value={card}
				onChange={(event) => {
					setCard(event.target.value);
				}}
			></input><br/>
			<label>CVV: </label>
			<input
				className="newInputLine"
				type="cvv"
				value={cvv}
				onChange={(event) => {
					setCVV(event.target.value);
				}}
			></input><br/>
			<button>Submit</button>
		</form>
	</div>
}

export default EditUserBilling;