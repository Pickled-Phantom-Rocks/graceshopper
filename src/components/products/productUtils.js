import React from 'react';

async function fetchProducts(baseURL) {
	try {
		const result = await fetch(`${baseURL}/products`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		})
		const data = await result.json()
		return data;
	} catch (error) {
		throw error
	}
}

async function newProduct(baseURL, name, desc, quantity, price, photoName) {

	const result = await fetch(`${baseURL}/products`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: name,
			description: desc,
			quantityAvailable: quantity,
			price: price,
			photoName: photoName
		})
		})
		.then(res => res.json())
		.then((result) => {
			if(result) {
				alert("New product has been created")
			} else {
				alert("failure")
			}
		})
		.catch(console.error)
}

export {
	fetchProducts,
	newProduct
}
