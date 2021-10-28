import { React, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {ProductList, ProductsByCategory, SingleProduct} from '.'
import {fetchCategories} from '..';
import {getCartByUserId, updateItemQuantityAvailable, addToUsersCart, getAllCartProductsByCartId } from '../cart/cartUtils';

const Products = (props) => {
	const {baseURL, userId} = props;
	const [categories, setCategories] = useState([]);
	const [showAllProducts, setShowAllProducts] = useState(true);
	const [showSingleProduct, setShowSingleProduct] = useState(false);
	const [showProductsByCategory, setShowProductsByCategory] = useState(false);
	const [singleProductId, setSingleProductId] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	
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

	async function CategorySelect() {
		event.preventDefault();

		const cselector = document.getElementById("categorySelect");
		const categoryId = cselector.options[cselector.selectedIndex].value;
		setSelectedCategory(categoryId);
		setShowProductsByCategory(true);
		setShowAllProducts(false);
		setShowSingleProduct(false);
	}

	// async function updateUsersCart(productBeingAdded) {

	// 	try {

	// 		const _cart = await getCartByUserId(userId, baseURL)
	// 		const cart = _cart[0]
	// 		console.log("Cart: ", cart)

	// 		const cartProducts = await getAllCartProductsByCartId(cart.id, baseURL)
	// 		console.log("CART PRODUCTS: ", cartProducts)
	// 		let productQuantity = 1

	// 		cartProducts.map(product => {
	// 			if (product.productId === productBeingAdded.id) {
	// 				productQuantity += 1
	// 			}
	// 		})

	// 		console.log("Product: ", productBeingAdded)
	// 		//remove matching productId from cart
	// 		const addedProducts = await addToUsersCart(cart.id, productBeingAdded.id, productBeingAdded.price, productQuantity, baseURL)
	// 		console.log("Added Products: ", addedProducts)

	// 	} catch (error) {
	// 		throw error
	// 	}

	// }

	
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




	return <div id="products">
		<h1>Products</h1>
		<section>
			<form onSubmit={CategorySelect}>
				<label>Categories: </label>
				<select id="categorySelect">
					{
						categories.map((category) => {
						const { id: categoryId, name } = category;
						return <option value={categoryId} key={categoryId}>{name}</option>
						})
					}
				</select> <button>Search</button>
			</form>
			{showAllProducts ? null: <button onClick={()=>{
				setShowSingleProduct(false);
				setSingleProductId('');
				setShowAllProducts(true);
				setShowProductsByCategory(false);				
			}}>Show All Products</button>}
		</section>
		{showAllProducts ? <ProductList baseURL={baseURL} setSingleProductId={setSingleProductId} setShowSingleProduct={setShowSingleProduct} setShowAllProducts={setShowAllProducts} setShowProductsByCategory={setShowProductsByCategory} /> : null}
		{showSingleProduct ? <SingleProduct baseURL={baseURL} singleProductId={singleProductId}/> : null}
		{showProductsByCategory ? <ProductsByCategory baseURL={baseURL} selectedCategory={selectedCategory}/> : null}

	</div>
}

export default Products;