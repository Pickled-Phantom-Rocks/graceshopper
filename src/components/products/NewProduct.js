import {React, useState} from 'react';
import {newProduct} from '.'

const NewProduct = (props) => {
	const {baseURL, isAdmin} = props;
	const [name, setName] = useState('');
	const [desc, setDesc] = useState('');
	const [quantity, setQuantity] = useState('');
	const [price, setPrice] = useState('');
	const [photo, setPhoto] = useState('');
	const [photoName, setPhotoName] = useState('none')

	async function sendNewProduct() {
		event.preventDefault();

		//figure out the file upload for photo image
		const result = await newProduct(baseURL, name, desc, quantity,price,photoName);

	}

	return <div className="form">
		<h3>Add New Product</h3>
		<br />
		<form onSubmit={sendNewProduct}>
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
			<input
				className="newInputLine"
				type="file"
				id="photoUpload"
				accept="image/*"
			></input>
			<br/><br/>
			<button className="submit">Submit</button>
		</form>
	</div>
};

export default NewProduct;