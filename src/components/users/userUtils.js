import {useEffect, useState} from 'react';

async function fetchUsers(baseURL) {
	const fetched = await fetch(`${baseURL}/users`, {
			method:'GET',
			headers: {'Content-Type': 'application/json'}
		})
		.then(res => res.json())
		.then((res) => {
			const response = res;
			return response;
		})

	console.log('fetched: ', fetched);
	return fetched;
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

export {
	fetchUsers,
	newPassword,
	newInfo,
	newBilling
};