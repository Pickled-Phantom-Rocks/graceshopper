import React from 'react';

async function fetchProducts(baseURL) {
	try {
		const result = await fetch(`${baseURL}/products`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		})
		const data = await result.json()
		return data
	} catch (error) {
		throw error
	}
}

export {
	fetchProducts
}
