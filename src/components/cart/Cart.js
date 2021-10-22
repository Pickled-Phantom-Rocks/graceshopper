import React, { useEffect, useState } from 'react';
import { getCartByUserId } from './cartUtils';

const Cart = (props) => {
	const [usersCart, setUsersCart] = useState([])
	const [productList, setProductList] = useState([])
	const {username, userId} = props
	

	async function fetchUsersCart() {
		try {
			//console.log("USERID", userId)
			const result = await getCartByUserId(userId)
			//console.log("RESULT", result)
			setUsersCart(result[0])
			setProductList(result[0].products)

		} catch (error) {
			console.log("Error fetching user's cart!")
			throw error
		}
	}

	useEffect(() => {
		fetchUsersCart()
	}, [])

	
	console.log("user's cart: ", usersCart)
	console.log("Product List: ", productList)

	function renderCartProducts(prodList) {
		const {id, name, description, photoName, price, quantityOfItem} = prodList

		const photoURL = "images/Products/" + photoName + ".jpg"
		return (<div key={id} style={{ display: "flex", border: "1px solid black", margin: "10px"}}> 

				<img src={process.env.PUBLIC_URL + photoURL} width="150px" height="100px"/>

				<div>
					<h3>{name}</h3>

					<div> 
						<br/>
						Description: {description}
						<br/>
						Quantity in cart: {quantityOfItem}
						<br/>
						Price per item: {`$${price}`}
					</div>
				</div>	

			</div>)
		

	}

	function quantityTimesPrice(quantity, price) {
		return quantity * price
	}

	function totalPriceCalculator(itemPrices) {

		let totalPriceOfCart
		
		for(let i = 0; i < itemPrices.length; i++) {
			console.log("HERE", itemPrices[i])
			totalPriceOfCart += itemPrices[i]
			console.log("INSIDE FUNC", totalPriceOfCart)
		}
	}

	const totalItemPrice = productList.map(product => quantityTimesPrice(product.quantityOfItem, product.price))
	console.log("total price per item: ", totalItemPrice)

	//let totalPrice
	totalPriceCalculator(totalItemPrice)
	//console.log("TOTAL CART PRICE: ", totalPrice)

	return <div id="cart">
		<h1>{username}'s Cart</h1>
		<div style={{border: "2px solid darkGreen"}}>
			{productList.map(product => renderCartProducts(product))}
			<div>
				<h2>Total Price: </h2>
			</div>
		</div>
		
	</div>
}

export default Cart;