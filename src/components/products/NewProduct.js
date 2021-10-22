import {React, useState} from 'react';

const NewProduct = (props) => {
	const {baseURL} = props;
	const [name, setName] = useState('');
	const [desc, setDesc] = useState('');
	const [quantity, setQuantity] = useState('');
	const [price, setPrice] = useState('');
	const [photo, setPhoto] = useState('');

	

	return <div className="form">
		<h3>Add New Product</h3>
		<br />
		<form>
			<label>Name: </label><br/>
			<input
				className="newInputLine"
				type="text"
				value={name}
				onChange={(event) => {
					setName(event.target.value);
				}}
			></input><br/>
			<label>Description: </label><br/>
			<input
				className="newInputLine"
				type="text"
				value={desc}
				onChange={(event) => {
					setDesc(event.target.value);
				}}
			></input><br/>
			<label>Quantity: </label><br/>
			<input
				className="newInputLine"
				type="number"
				value={quantity}
				min="1" 
				onChange={(event) => {
					setQuantity(event.target.value);
				}}
			></input><br/>
			<label>Price: </label><br/>
			<input
				className="newInputLine"
				type="number"
				value={price} 
				min="1"
				onChange={(event) => {
					setPrice(event.target.value);
				}}
			></input><br/>
			<label>Photo: </label><br/>
			Insert here photo upload
			<br/><br/>
			<button>Submit</button>
		</form>
	</div>
};

export default NewProduct;