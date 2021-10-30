import { React, useState, useEffect } from 'react';
import {ProductList, ProductsByCategory, SingleProduct} from '.'
import { fetchCategories } from '..';
import { getCartByUserId, updateItemQuantityAvailable, addToUsersCart, getAllCartProductsByCartId, deleteProductFromCartByProductId } from '../cart/cartUtils';

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

			// const _cart = await getCartByUserId(userId, baseURL)
			// const cart = _cart[0]
			// console.log("CART", cart)


			// const cartProducts = await getAllCartProductsByCartId(cart.id, baseURL)
			// console.log("Cart Products", cartProducts)


			// const productIds = cartProducts.map(product => {
			// 	return product.productId
			// })

			// console.log(productIds)
			
			// if(productIds.includes(productBeingAdded.id)) {
			// 	//remove matching productId from cart
			// 	const _product = cartProducts.filter(prod => prod.productId === productBeingAdded.id)
			// 	console.log("PRODUCT HERE", _product)
			// 	const product = _product[0]
			// 	const quantity = product.quantityOfItem + 1
			// 	await deleteProductFromCartByProductId(product.productId, baseURL)
			// 	await addToUsersCart(cart.id, productBeingAdded.id, productBeingAdded.price, quantity, baseURL)
			// } else {
			// 	await addToUsersCart(cart.id, productBeingAdded.id, productBeingAdded.price, 1, baseURL)
			// }
			
			
			
			
			
			

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