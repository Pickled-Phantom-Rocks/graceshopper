import React from 'react';

const Cart = () => {

	const username = localStorage.getItem('username')

	return <div id="cart">
		{username}'s Cart
	</div>
}

export default Cart;