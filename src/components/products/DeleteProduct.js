import {React, useState, useEffect} from 'react';
import { fetchProducts, deleteProduct } from '.';

const DeleteProduct = (props) => {
	const {baseURL} = props;
	const [products, setProducts] = useState([]);

	async function fetchTheProducts() {
		try {
			const result = await fetchProducts(baseURL)
			setProducts(result)

		} catch (error) {
			console.error(error);
		}
	}
	useEffect(() => {
		fetchTheProducts()
	}, [])

	products.sort((a, b) => {
		const nameA = a.name.toLowerCase()
		const nameB = b.name.toLowerCase()
		if(nameA < nameB) {
			return -1
		}
		if(nameA > nameB) {
			return 1
		}
		return 0
	})

	async function deleteTheProduct() {
		event.preventDefault();

		//will need to add some kind of check to see if the item is in a cart
		//display error message if so

		const selector = document.getElementById("productSelect");
		const productId = selector.options[selector.selectedIndex].value;
		await deleteProduct(baseURL, productId);

	}


	return <div className="form">
		<h3>Delete Product</h3>
		<br />
		<form onSubmit={deleteTheProduct}>
			<select id="productSelect" size="5">
				{
					products.map((product) => {
						const { id, name } = product;
						return <option value={id} key={id}>{name}</option>
					})
				}
			</select>
			<br/><br/>
			<button>Delete</button>
		</form>
		</div>
}

export default DeleteProduct