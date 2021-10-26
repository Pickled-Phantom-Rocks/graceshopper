import { React, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {fetchProducts, fetchProductsByCategory, fetchProductById} from '.'
import { fetchCategories } from '..';
import { getCartByUserId, updateItemQuantityAvailable, addToUsersCart, getAllCartProductsByCartId } from '../cart/cartUtils';

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

	async function updateUsersCart(productBeingAdded) {

		try {

			const _cart = await getCartByUserId(userId, baseURL)
			const cart = _cart[0]
			console.log("Cart: ", cart)

			const cartProducts = await getAllCartProductsByCartId(cart.id, baseURL)
			console.log("CART PRODUCTS: ", cartProducts)
			let productQuantity = 1

			cartProducts.map(product => {
				if (product.productId === productBeingAdded.id) {
					productQuantity += 1
				}
			})

			console.log("Product: ", productBeingAdded)
			//remove matching productId from cart
			const addedProducts = await addToUsersCart(cart.id, productBeingAdded.id, productBeingAdded.price, productQuantity, baseURL)
			console.log("Added Products: ", addedProducts)

		} catch (error) {
			throw error
		}

	}

	
	// let productAmount = 0
	// async function handleAddToCart(product) {
	// 	try {

	// 		const cart = await getCartByUserId(userId, baseURL)
	// 		console.log("Cart: ", cart[0])
	// 		const cartId = cart[0].id

	// 		const cartProduct = await getCartProductByCartId(cartId, baseURL)

	// 		console.log("Cart Product: ", cartProduct)

	// 		console.log("Product: ", product)
	// 		const productId = product.id
	// 		const productPrice = product.price
	// 		//const quantityLeftOver = product.quantityAvailable - 1

	// 		//const quantity = 1
	// 		productAmount++

	// 		console.log(productAmount)
	// 		await addToUsersCart(cartId, productId, productPrice, productAmount, baseURL)

	// 		//await updateItemQuantityAvailable(productId, quantityLeftOver, baseURL)


	// 	} catch (error) {
	// 		throw error
	// 	}
	// }

	useEffect(() => {
		fetchTheProducts()
		//updateUsersCart()
	}, [])

	async function fetchTheCategoryProducts(){
		event.preventDefault();
		const selector = document.getElementById("categorySelect");
		const categoryId = selector.options[selector.selectedIndex].value;
		const result = await fetchProductsByCategory(baseURL, categoryId);	
		console.log('category productIDs:', result);

		//figure out how to then fetch the product info by id from the result array

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
					<Link to={`/product/${id}`}><img src={process.env.PUBLIC_URL + photoURL} /></Link>
					<div className="productInfo">
						<Link to={`/product/${id}`}><h3>{name}</h3></Link>
						<label>Description:</label> {description}<br/>
						<label>Quantity:</label> {quantityAvailable}<br/>
						<label>Price:</label> {"$" + price}<br/>
						<label>Category:</label> ???<br/>
					<section className="productOptions">
						<button onClick={e => updateUsersCart(product)}>Add to Cart</button>
						<button  style={{marginLeft: "1em", marginTop: "1em"}} onClick={e => console.log(product)}>Remove from Cart</button>
					</section>

					</div>
				</div>
			})
		}
	</div>
}

export default Products;