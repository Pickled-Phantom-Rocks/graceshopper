import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { getCartByUserId, deleteProductFromCartByProductId, addToUsersCart, updateItemQuantityAvailable } from './cartUtils';

const Cart = (props) => {
	
	const {username, userId, userToken, baseURL, setShowSingleProduct, setSingleProductId, showSingleProduct, setShowAllProducts, setShowProductsByCategory, showSingleProductFromCart, setShowSingleProductFromCart } = props
	const [usersCart, setUsersCart] = useState([])
	const [productList, setProductList] = useState([])
	//const [quantityCounter, setQuantityCounter] = useState(0)
	

	async function fetchUsersCart() {
		try {
			//console.log("USERID", userId)
			const result = await getCartByUserId(userId, baseURL)
			//console.log("RESULT", result)
			setUsersCart(result[0])
			//console.log("RESULT SOMETHING: ", result[0].products)
			setProductList(result[0].products)

		} catch (error) {
			console.log("Error fetching user's cart!")
			throw error
		}
	}

	useEffect(() => {
		fetchUsersCart()
	}, [])

	
	//console.log("user's cart: ", usersCart)
	//console.log("Product List: ", productList)

	// async function incrementer() {
	// 	const oneMore = quantityCounter + 1
	// 	setQuantityCounter(oneMore)
	// }

	// async function decrementer() {
	// 	if(quantityCounter === 0) {
	// 		return
	// 	}
	// 	const oneLess = quantityCounter - 1
	// 	setQuantityCounter(oneLess)
	// }

	function renderCartProducts(prodList) {
		console.log("ProdList: ", prodList)
		let {id, name, photoName, price, quantityOfItem, quantityAvailable} = prodList
		const photoURL = "images/Products/" + photoName + ".jpg"
		let quantityCounter = quantityOfItem

		async function incrementer() {
			quantityCounter++
			const quantityTakenFromWarehouse = quantityAvailable - 1
			await updateItemQuantityAvailable(userToken, id, quantityTakenFromWarehouse, baseURL)
			await deleteProductFromCartByProductId(id, baseURL)
			await addToUsersCart(usersCart.id, id, price, quantityCounter, baseURL)
			location.reload()
		}
	
		async function decrementer() {
			quantityCounter--

			if (quantityCounter !== 0) {
				const quantityAddedToWarehourse = quantityAvailable + 1
				await updateItemQuantityAvailable(userToken, id, quantityAddedToWarehourse, baseURL)
				await deleteProductFromCartByProductId(id, baseURL)
				await addToUsersCart(usersCart.id, id, price, quantityCounter, baseURL)

				location.reload()
			} else if (quantityCounter === 0) {
				const quantityAddedToWarehourse = quantityAvailable + 1
				await updateItemQuantityAvailable(userToken, id, quantityAddedToWarehourse, baseURL)
				await deleteProductFromCartByProductId(id, baseURL)

				location.reload()
			}
		}

		return (<div key={id} style={{ display: "flex", border: "1px solid black", margin: "10px"}}> 

				<Link to="/products" onClick={() => {
					setShowSingleProduct(true)
					setSingleProductId(id)
					setShowAllProducts(false)
					setShowProductsByCategory(false)
					setShowSingleProductFromCart(true)
				}}> 
				<img src={process.env.PUBLIC_URL + photoURL} width="150px" height="100px"/>
				</Link>
				

				<div>
					<h3>{name} x {quantityOfItem}</h3>

					<div> 
						<br/>
						Price per item: {`$${price}`}
					</div>
					<button onClick={async e => {
						console.log("Product: ", prodList)
						const _removedProduct = await deleteProductFromCartByProductId(id, baseURL)
						console.log("first", _removedProduct)
						const removedProduct = await _removedProduct[0]
						
						const quantityRemoved = removedProduct.quantityOfItem
						const quantityAvailable = prodList.quantityAvailable
						const quantityToReturn = quantityAvailable + quantityRemoved

						await updateItemQuantityAvailable(userToken, id, quantityToReturn, baseURL)
						location.reload()
					}}>Remove all {`${name}'s`}</button>
					
					<div className="PlusMinus">
						<input type="button" onClick={decrementer} value="-" style={{paddingLeft: "0.4em", paddingRight: "0.4em", marginRight: "1em", marginBottom: "1em"}} />

						<input type="text" name="quantity" value={quantityCounter} readOnly={true} size="1" id="number" />

						<input type="button" onClick={incrementer} value="+" style={{paddingLeft: "0.4em", paddingRight: "0.4em", marginLeft: "1em", marginBottom: "1em"}} />

						{/* <button>Update Product quantity</button> */}

					</div>
				</div>	

			</div>)
		

	}

	function quantityTimesPrice(quantity, price) {
		return quantity * price
	}

	const reducer = (accumulator, curr) => accumulator + curr

	function totalPriceCalculator(itemPrices) {

		let totalPrice

		if(!itemPrices[0]) {
			totalPrice = 0.00
			return totalPrice
		}

		totalPrice = itemPrices.reduce(reducer)
		return totalPrice
	}

	const totalItemPrices = productList.map(product => quantityTimesPrice(product.quantityOfItem, product.price))

	const totalPrice = totalPriceCalculator(totalItemPrices)

	productList.sort((a, b) => {
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

	return <div id="cart">
		<h1>{username}'s Cart</h1>
		<div style={{border: "2px solid darkGreen"}}>
			{productList.map(product => renderCartProducts(product))}
			<div>
				<h2>Total Price: {`$${totalPrice}`}</h2>
			</div>
		</div>
		
	</div>
}

export default Cart;