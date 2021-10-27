import { React, useState, useEffect } from 'react';
import {fetchProducts} from './index'
import { getCartByUserId, updateItemQuantityAvailable, addToUsersCart, getAllCartProductsByCartId, deleteProductFromCartByProductId } from '../cart/cartUtils';

const Products = (props) => {
	const {baseURL, userId} = props;
	const [products, setProducts] = useState([]);

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
			console.log("CART", cart)


			const cartProducts = await getAllCartProductsByCartId(cart.id, baseURL)
			console.log("Cart Products", cartProducts)


			const productIds = cartProducts.map(product => {
				return product.productId
			})

			console.log(productIds)
			
			if(productIds.includes(productBeingAdded.id)) {
				//remove matching productId from cart
				const _product = cartProducts.filter(prod => prod.productId === productBeingAdded.id)
				console.log("PRODUCT HERE", _product)
				const product = _product[0]
				const quantity = product.quantityOfItem + 1
				await deleteProductFromCartByProductId(product.productId, baseURL)
				await addToUsersCart(cart.id, productBeingAdded.id, productBeingAdded.price, quantity, baseURL)
			} else {
				await addToUsersCart(cart.id, productBeingAdded.id, productBeingAdded.price, 1, baseURL)
			}
			
			
			
			
			
			

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