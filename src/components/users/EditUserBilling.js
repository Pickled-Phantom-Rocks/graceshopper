import {React, useState} from 'react';
	import {newBilling} from '.';

const EditUserBilling = (props) => {
	const {baseURL, userToken, userId} = props;

	const [card, setCard] = useState('');
	const [cvv, setCVV] = useState('');

	async function sendEditBilling() {
		event.preventDefault();
		newBilling(baseURL, userToken, userId, card, cvv);
	}

	return <div className="form">
		<h3>Update Billing Info</h3>
		<form onSubmit={sendEditBilling}>
			<label>Card Number: (Please include dashes - )</label><br />
			<input
				className="newInputLine"
				type="card"
				value={card}
				onChange={(event) => {
					setCard(event.target.value);
				}}
			></input><br/>
			<label>CVV: </label><br />
			<input
				className="newInputLine"
				type="cvv"
				value={cvv}
				onChange={(event) => {
					setCVV(event.target.value);
				}}
				maxLength="3"
			></input><br/>
			<button className="submit">Submit</button>
		</form>
	</div>
}

export default EditUserBilling;