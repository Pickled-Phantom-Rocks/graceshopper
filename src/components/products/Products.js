import { React, useState, useEffect } from 'react';
import {fetchProducts, fetchProductsByCategory, fetchProductById} from '.'
import {getCartByUserId, updateItemQuantityAvailable, addToUsersCart } from '../cart/cartUtils';
import { fetchCategories } from '..';

const Products = (props) => {
	const {baseURL, userId} = props;
	const [categories, setCategories] = useState([]);
	const [products, setProducts] = useState([]);

	async function fetchTheCategories() {
		try {
			const result = await fetchCategories(baseURL)
			setCategories(result)

		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		fetchTheCategories()
	}, []);

	async function fetchTheProducts() {
		try {
			const results = await fetchProducts(baseURL)
			setProducts(results)
		} catch (error) {
			throw error
		}
	}
	let productAmount = 0
	async function handleAddToCart(product) {
		try {

			const cart = await getCartByUserId(userId, baseURL)
			const cartId = cart[0].id
			const productId = product.id
			const productPrice = product.price
			//const quantityLeftOver = product.quantityAvailable - 1

			productAmount++

			console.log(productAmount)
			await addToUsersCart(cartId, productId, productPrice, productAmount, baseURL)

			//await updateItemQuantityAvailable(productId, quantityLeftOver, baseURL)

			console.log(product, cartId)

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

	async function fetchTheCategoryProducts(){
		event.preventDefault();
		const selector = document.getElementById("categorySelect");
		const categoryId = selector.options[selector.selectedIndex].value;
		const result = await fetchProductsByCategory(baseURL, categoryId);
		result.map(product => {
			const fetchedProduct = fetchProductById(baseURL, product.productId);
			console.log('fetchedProduct', fetchedProduct)
		})

	}

	return <div id="products">
		<h1>Products</h1>
		<section>
			<form onSubmit={fetchTheCategoryProducts}>
				<label>Categories: </label>
				<select id="categorySelect">
					{
						categories.map((category) => {
						const { id, name } = category;
						return <option value={id} key={id}>{name}</option>
						})
					}
				</select> <button>Search</button>
			</form>
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