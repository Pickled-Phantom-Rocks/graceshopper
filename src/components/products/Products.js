import { React, useState, useEffect } from 'react';
import {fetchProducts} from '.'

const Products = (props) => {
	const {baseURL} = props;
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
		<section>
			Category select goes here. Dropdown?
		</section>
		{
			products.map((product) => {
				const {id, name, description, quantityAvailable, price, photoName} = product;
				
				const photoURL = "images/Products/" + photoName + ".jpg";

				return <div className="productList" key={id}>
					<img src={process.env.PUBLIC_URL + photoURL} />
					<div className="productInfo">
						<h3>{name}</h3>
						<label>Description:</label> {description}<br/>
						<label>Quantity:</label> {quantityAvailable}<br/>
						<label>Price:</label> {"$" + price}<br/>
						<label>Category:</label> ???<br/>
					<section className="productOptions">
						<button onClick={e => handleAddToCart(product)}>Add to Cart</button>
						<button  style={{marginLeft: "1em", marginTop: "1em"}}onClick={e => handleRemoveFromCart(product)}>Remove from Cart</button>
					</section>

					</div>
				</div>
			})
		}
	</div>
}

export default Products;