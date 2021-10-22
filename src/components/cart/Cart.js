import React, { useEffect, useState } from 'react';
import { getCartByUserId } from './cartUtils';

const Cart = () => {
	const [usersCart, setUsersCart] = useState([])
	const username = localStorage.getItem('username')
	const userId = localStorage.getItem("UsersId")

	async function fetchUsersCart() {
		try {
			//console.log("USERID", userId)
			const result = await getCartByUserId(userId)
			//console.log("RESULT", result)
			setUsersCart(result[0])

		} catch (error) {
			console.log("Error fetching user's cart!")
			throw error
		}
	}

	useEffect(() => {
		fetchUsersCart()
	}, [])

	
	console.log("user's cart: ", usersCart)

	return <div id="cart">
		{username}'s Cart
		{}
	</div>
}

export default Cart;