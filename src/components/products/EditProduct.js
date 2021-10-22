import {React, useState, useEffect} from 'react';
import { fetchProducts } from '.';

const EditProduct = (props) => {
	const {baseURL} = props;
	const [products, setProducts] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState('');
	const [newName, setNewName] = useState('');
	const [newDesc, setNewDes] = useState('');
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
	async function editProduct(productId) {
		console.log('Edit product ID: ', productId);
	}
	
	async function deleteProduct(productId) {
		console.log('Delete product ID: ', productId);
	}

	useEffect(() => {
		fetchTheProducts()
	}, [])

	return <div className="form">
		<h3>Edit Product</h3>
		<br/>
		<form>
			<select id="productSelect" size="10">
				{
					products.map((product) => {
						const { id, name } = product;
						return <option value={id} key={id}>{name}</option>
					})
				}
			</select>
			<br/><br/>
			<label>Name: </label><br/>
			<input></input><br/><br/>
			<label>Description: </label><br/>
			<input></input><br/><br/>
			<label>Quantity: </label><br/>
			<input></input><br/><br/>
			<label>Price: </label><br/>
			<input></input><br/><br/>
			<label>Photo: </label><br/>
			Insert a photo upload lol
		</form>
	</div>
};

export default EditProduct;