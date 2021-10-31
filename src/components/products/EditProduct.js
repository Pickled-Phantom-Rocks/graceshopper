import {React, useState, useEffect} from 'react';
import { fetchProducts, editProduct } from '.';

const EditProduct = (props) => {
	const {baseURL, userToken} = props;
	const [products, setProducts] = useState([]);
	const [newName, setNewName] = useState('');
	const [newDesc, setNewDesc] = useState('');
	const [newQuantity, setNewQuantity] = useState('');
	const [newPrice, setNewPrice] = useState('');
	const [newPhoto, setNewPhoto] = useState('');

	async function fetchTheProducts() {
		try {
			const result = await fetchProducts(baseURL)
			setProducts(result)

		} catch (error) {
			console.error(error);
		}
	}
	async function sendEditProduct() {
		event.preventDefault();

		const selector = document.getElementById("productSelect");
		const productId = selector.options[selector.selectedIndex].value;

		//figure out file upload
		editProduct(baseURL, userToken, productId, newName, newDesc, newQuantity, newPrice, newPhoto);
	}

	useEffect(() => {
		fetchTheProducts()
	}, [])

	return <div className="form">
		<h3>Edit Product</h3>
		<br/>
		<form onSubmit={sendEditProduct}>
			<select id="productSelect" size="5">
				{
					products.map((product) => {
						const { id, name } = product;
						return <option value={id} key={id}>{name}</option>
					})
				}
			</select>
			<br/><br/>
			<label>Name: </label><br/>
			<input
				className="newInputLine"
				type="text"
				value={newName}
				onChange={(event) => {
					setNewName(event.target.value);
				}}
			></input><br/>
			<label>Description: </label><br/>
			<input
				className="newInputLine"
				type="text"
				value={newDesc}
				onChange={(event) => {
					setNewDesc(event.target.value);
				}}
			></input><br/>
			<label>Quantity: </label><br/>
			<input
				className="newInputLine"
				type="number"
				value={newQuantity}
				min="1" 
				onChange={(event) => {
					setNewQuantity(event.target.value);
				}}
			></input><br/>
			<label>Price: </label><br/>
			<input
				className="newInputLine"
				type="number"
				value={newPrice} 
				min="1"
				onChange={(event) => {
					setNewPrice(event.target.value);
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

export default EditProduct;