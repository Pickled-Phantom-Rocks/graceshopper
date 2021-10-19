import { React, useState, useEffect } from 'react';
import {fetchProducts} from '../'

const Products = (props) => {
	const {baseURL} = props;
	const [selectedProduct, setSelectedProduct] = useState((''))
	const [products, setProducts] = useState([]);

	async function fetchTheProducts() {
		try {
			const results = await fetchProducts(baseURL)

			setProducts(results)
		} catch (error) {
			throw error
		}
	}

	async function handleAddToCart(product) {
		try {

			console.log(product)

		} catch (error) {
			throw error
		}
	}

	async function handleRemoveFromCart(product) {
		try {

			console.log(product)

		} catch (error) {
			throw error
		}
	}

	useEffect(() => {
		fetchTheProducts()
	}, [])

	return <div id="products">
		<h1>Products</h1>
		<p>List of all available products</p>
		{
			products.map((product) => {
				const {id, name, description, quantityAvailable, price, photoName} = product;
				
				const photoURL = "images/Products/" + photoName + ".jpg";

				return <div className="productList" key={id}>
					<img src={process.env.PUBLIC_URL + photoURL} />
					<div className="productInfo">
						Name: {name}<br/>
						Description: {description}<br/>
						Quantity: {quantityAvailable}<br/>
						Price: {"$" + price}<br/>
					<button onClick={e => handleAddToCart(product)}>Add to Cart</button>
					<button  style={{marginLeft: "1em", marginTop: "1em"}}onClick={e => handleRemoveFromCart(product)}>Remove from Cart</button>

					</div>
				</div>
			})
		}
	</div>
}

export default Products;