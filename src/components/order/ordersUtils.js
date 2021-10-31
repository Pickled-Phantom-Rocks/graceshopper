import React from 'react';

async function fetchAllOrders(baseURL) {
	try {
		const response = await fetch(`${baseURL}/orders`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		})
		.then(res => res.json())
		.then((result) => {
			return result;
		})
		return response;
	} catch(error) {
		throw error
	}
}

async function changeStatus(baseURL, userToken, orderId, newStatus){
	try {
		const response = await fetch(`${baseURL}/orders/${orderId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${userToken}`
			},
			body: JSON.stringify({
				newStatus
			})
		})
		.then(res => res.json())
		.then((result) => {
			console.log(result)


			//alert("Order's status has successfully changed.");
			//location.reload();
		})
		.catch(err => console.error(err));
	} catch(error) {
		throw error
	}
}
export {
	fetchAllOrders,
	changeStatus
};