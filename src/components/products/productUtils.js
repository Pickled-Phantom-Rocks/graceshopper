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

async function fetchProductsByCategory(baseURL, categoryId){
	try {
		const result = await fetch(`${baseURL}/category_products/${categoryId}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		})
		const data = await result.json()
		return data;
	} catch(error) {
		throw error
	}
}

async function fetchProductById(baseURL, productId) {
	try {
		const result = await fetch(`${baseURL}/products/${productId}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		})
		const data = await result.json()
		return data;
	} catch(error){
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
			if(result.status) {
				alert("New product has been created");
				location.reload();
			} else {
				alert("This product already exists.")
			}
		})
		.catch(console.error);
}

async function editProduct(baseURL, userToken, productId, name, desc, quantity, price, photo) {
	const fields = {}
	if(name){
		fields.name = name;
	}
	if(desc){
		fields.description = desc;
	}
	if(quantity){
		fields.quantityAvailable = quantity;
	}
	if(price){
		fields.price = price;
	}
	if(photo){
		fields.photoName = photo;
	}
	const result = await fetch(`${baseURL}/products/${productId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${userToken}`
		},
		body: JSON.stringify({
			fields
		})
	})
	.then(res => res.json())
	.then(result => {
		console.log('result: ',result);
		if(result.status == 204) {
			alert("Product was updated.");
			location.reload();
		} else {
			alert("A product with this name already exists")
		}
	})
	.catch(console.error);
}

async function deleteProduct(baseURL, productId) {
	await fetch(`${baseURL}/products/${productId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',	
		}
	})
	.then(res => res.json())
	.then((result) => {
		console.log(result);
		if(result.status == 204){
			alert("Product was deleted.");
			location.reload();
		} else {
			alert("This product does not exist.");
		}
	})
	.catch(err => console.error(err));
}

export {
	fetchProducts,
	fetchProductsByCategory,
	fetchProductById,
	newProduct,
	editProduct,
	deleteProduct
}
