import {useState, useEffect} from 'react';

async function fetchProducts(baseURL) {
	try {
		const result = await fetch(`${baseURL}/products`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		})
		const data = await result.json();
		return data;
	} catch (error) {
		throw error
	}
}

async function fetchProductById(baseURL, productId) {

	try {

		const result = await fetch(`${baseURL}/products/${productId}`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		})

		const product = await result.json()

		return product
		
	} catch (error) {
		throw error
	}
}

async function fetchProductsByCategory(baseURL, categoryId) {

	try {

		const result = await fetch(`${baseURL}/category_products/category/${categoryId}`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		})

		const products = await result.json()

		return products

	} catch (error) {
		throw error
	}
}

async function fetchProductsByCategoryID(baseURL, categoryId) {
	const prods = [];
	const result = await fetch(`${baseURL}/category_products/category/${categoryId}`, {
		method: 'GET',
		headers: {'Content-Type': 'application/json'}
	})
	.then(res => res.json())
	.then((response) => {
		if(response.length > 0) {
			response.map((prod) => {
				prods.push(prod.productId);
			})
		}
	})
	return prods;
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
	await fetch(`${baseURL}/cart-products/${productId}`, {
		method: 'DELETE',
		headers: {'Content-Type': 'application/json'}
	})
	.then(res => res.json())
	.then(res => console.log('cart', res))
	.catch(err => console.error(err));


	await fetch(`${baseURL}/category_products/${productId}`, {
		method: 'GET',
		headers: {'Content-Type': 'application/json'}
	})
	.then(res => res.json())
	.then((res) => {
		const response = res;
		console.log('fetch:', response)
		if(response.length > 0){
			response.map(async (catProd) => {	
				await fetch(`${baseURL}/category_products/${catProd.id}`, {
					method: 'DELETE',
					headers: {'Content-Type': 'application/json'}
				})
				.then(res => res.json())
				.then(res => console.log(res))
				.catch(err => console.error(err))
		 	})
		}
	})

	await fetch(`${baseURL}/products/${productId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',	
		}
	})
	.then(res => res.json())
	.then((result) => {
		if(result.status == 204){
			alert("Product was deleted.");
			location.reload();
		} else {
			alert("There was a problem, please try again");
		}
	})
	.catch(err => console.error(err));
}

async function addProduct(baseURL, categoryId, productId){
	await fetch(`${baseURL}/category_products/${categoryId}/products`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			productId,
		})
	})
	.then(res => res.json())
	.then((result) => {
		if(result.status){
			alert("Product successfully added to category.");
			location.reload();
		} else {
			alert("This product is already in the category.")
		}
	})
	.catch(console.error);
}

async function removeProduct(baseURL, categoryId, productId){

	await fetch(`${baseURL}/category_products/${categoryId}/${productId}`, {
		method: 'GET',
		headers: {'Content-Type': 'application/json'}
	})
	.then(res => res.json())
	.then((result) => {
		if(result.id){
			const categoryProductId = result.id;
			fetch(`${baseURL}/category_products/${categoryProductId}`,{
				method: 'DELETE',
				headers: {'Content-Type': 'application/json'}
			})
			.then(res => res.json())
			.then((result) => {
				if(result.status == 204){
					alert("Product was removed from the category.");
					location.reload();
				} else {
					alert("short nope.");
				}
			})
			.catch(err => console.error(err));
		} else {
			alert("This product does not exist in this category.")
		}
	})
}


export {
	fetchProducts,
	fetchProductById,
	fetchProductsByCategory,
	fetchProductsByCategoryID,
	newProduct,
	editProduct,
	deleteProduct,
	addProduct,
	removeProduct
}
