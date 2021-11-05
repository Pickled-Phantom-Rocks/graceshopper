import React from 'react';

async function fetchAllOrders(baseURL) {
	try {
		const response = await fetch(`${baseURL}/orders`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		})
		.then(res =>  res.json())
		.then((result) => {
			return result;
		})
		.catch( err => console.error(err));
		return response;
	} catch(error) {
		throw error
	}
}

async function fetchOrdersByStatus(baseURL, orderStatus) {
	try {
		const response = await fetch(`${baseURL}/orders/${orderStatus}/status`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		})
		.then(res => res.json())
		.then((result) => {
			return result;
		})
		.catch( err => console.error(err));
		return response;
	} catch(error) {
		throw error
	}
}

async function changeStatus(baseURL, userToken, orderId, newStatus){
	try {
		const orderStatus = newStatus;
		const response = await fetch(`${baseURL}/orders/${orderId}/status`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${userToken}`
			},
			body: JSON.stringify({
				orderStatus
			})
		})
		.then(res => res.json())
		.then((result) => {
			if(result.status){
				alert("Order's status has successfully changed.");
				location.reload();
			}
		})
		.catch(err => console.error(err));
	} catch(error) {
		throw error
	}
}

async function fetchOrdersWithUsers(baseURL) {
	try {
		const response = await fetch(`${baseURL}/orders/users`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		})
		.then(res => res.json())
		.then((result) => {
			return result;
		})
		return response;
	} catch (error) {
		throw error
	}
}

export {
	fetchAllOrders,
	fetchOrdersByStatus,
	changeStatus,
	fetchOrdersWithUsers
};