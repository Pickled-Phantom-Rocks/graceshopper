import React from 'react';

async function fetchUsers(baseURL) {
	try {
		const response = await fetch(`${baseURL}/users`, {
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


async function newPassword(baseURL, userToken, userId, current, newPass) {
	const response = await fetch(`${baseURL}/users/${userId}/password`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${userToken}`
			},
			body: JSON.stringify({
				password: current,
				newPassword: newPass
			})
		})
		.then(res => res.json())
		.then((result) => {
			console.log(result);
			const status = result.status;
			if(status == 204) {
				alert("You have successfully updated your password.");
			} else {
				alert("Incorrect current password.");
			}
		})
}

async function newInfo(baseURL, userToken, userId, newName, address, city, state) {
	const response = await fetch(`${baseURL}/users/${userId}/info`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${userToken}`
		},
		body: JSON.stringify({
			name: newName,
			address: address,
			city: city,
			state: state
		})
	}).then(res => res.json())
	.then((result) => { 
		const status = result.status;
		if(status == 204){
			alert("You have successfully updated your info.")
			return location.reload();
		} else {
			alert("Something went wrong. Please try again.")
		}
	})
		.catch(err => console.error(err));

}

async function newBilling(baseURL, userToken, userId, card, cvv) {
	const response = await fetch(`${baseURL}/users/${userId}/billing`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${userToken}`
		},
		body: JSON.stringify({
			card: card,
			cvv: cvv
		})
	})
	.then(res => res.json())
	.then((result) => {
		const status = result.status;
		if(status == 204){
			alert("You have successfully updated your billing info.")
		} else {
			alert("Something went wrong. Please try again.")
		}
	})
	.catch(err => console.error(err));
}

async function changeAdmin(baseURL, userId, admin) {
	const response = await fetch(`${baseURL}/users/${userId}/admin`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			isAdmin: admin
		})
	})
	.then(res => res.json())
	.then((result) => {
		console.log(result);
	})
	.catch(err => console.error(err));
}

async function deleteUser(baseURL, userId) {
	const {id} = userId;

	await fetch(`${baseURL}/carts/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',	
		}
	})
	.then(res => res.json())
	.then((result) => {
		console.log('delete cart: ', result)
	})
	.catch(err => console.error(err));

	// const ordersResponse = await fetch(`${baseURL}/orders/${id}`, {
	// 	//delete orders once the router for it has been set up
	// })

	const response = await fetch(`${baseURL}/users/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',	
		}
	})
	.then(res => res.json())
	.then((result) => {
		alert("User has been deleted.")
	})
	.catch(err => console.error(err));
}

export {
	fetchUsers,
	newPassword,
	newInfo,
	newBilling,
	changeAdmin,
	deleteUser
};