import { React, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {ProductList, ProductsByCategory, SingleProduct} from '.'
import { fetchCategories } from '..';
import { getCartByUserId, updateItemQuantityAvailable, addToUsersCart, getAllCartProductsByCartId, deleteProductFromCartByProductId } from '../cart/cartUtils';

const Products = (props) => {
	const {baseURL, userId, userToken, showProductsByCategory, setShowProductsByCategory, showAllProducts, setShowAllProducts, showSingleProductFromCart, setShowSingleProductFromCart} = props;
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('1');
	
	async function fetchTheCategories() {
		try {
			const result = await fetchCategories(baseURL)
			setCategories(result)
		} catch (error) {
			console.error(error);
		}
	}
	useEffect(() => {
		fetchTheCategories();
	}, [])

	async function updateUsersCart(productBeingAdded) {

	 	try {

			console.log("PRoduct being added: ", productBeingAdded)

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
			console.log(productIds)
			
			if(productIds.includes(productBeingAdded.id)) {
				//remove matching productId from cart
				const _product = cartProducts.filter(prod => prod.productId === productBeingAdded.id)
				console.log("PRODUCT HERE", _product)
				const product = _product[0]
				const quantityInCart = product.quantityOfItem + 1
				const quantityTakenFromWarehouse = productBeingAdded.quantityAvailable - 1
				await updateItemQuantityAvailable(userToken, productBeingAdded.id, quantityTakenFromWarehouse, baseURL)
				await deleteProductFromCartByProductId(product.productId, baseURL)
				await addToUsersCart(cart.id, productBeingAdded.id, productBeingAdded.price, quantityInCart, baseURL)
				location.reload()
			} else {
				const quantityTakenFromWarehouse = productBeingAdded.quantityAvailable - 1
				await updateItemQuantityAvailable(userToken, productBeingAdded.id, quantityTakenFromWarehouse, baseURL)
				await addToUsersCart(cart.id, productBeingAdded.id, productBeingAdded.price, 1, baseURL)
				location.reload()
			}
		} catch (error) {
			throw error
		}
	}

	return <div id="products">
		<h1>Products</h1>
		<section>
			<form >
				<label>Categories: </label>
				<select id="categorySelect"
					onChange={(event) => {
						setSelectedCategory(event.target.value);
					}}>
					{
						categories.map((category) => {
						const { id: categoryId, name } = category;
						return <option value={categoryId} name={name} key={categoryId}>{name}</option>
						})
					}
				</select> 
					<button><Link to={`/category/${selectedCategory}`}>Search</Link></button>
			</form>
			{showAllProducts && !showSingleProductFromCart ? null: <button onClick={()=>{
				setShowAllProducts(true);			
			}}>Show All Products</button>}
			{showSingleProductFromCart ? <Link to="/cart"> <button onClick={() => {
				setShowAllProducts(true)
			}}>Return to cart!</button></Link> : null}
		</section>
		{showAllProducts ? <ProductList baseURL={baseURL} updateUsersCart={updateUsersCart} setShowAllProducts={setShowAllProducts} setShowProductsByCategory={setShowProductsByCategory} /> : null}
		{showProductsByCategory ? <ProductsByCategory baseURL={baseURL} updateUsersCart={updateUsersCart} selectedCategory={selectedCategory}/> : null}

	</div>
}

export default Products;