import {React, useState, useEffect} from 'react';
import {fetchCategoriesByProductID, fetchCategoryById} from '../categories/categoryUtils'

async function fetchProducts(baseURL) {
	try {
		const result = await fetch(`${baseURL}/products`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		})
		const data = await result.json();

		// data.map(async (p) => {
		// 	const cats = await fetchCategoriesByProductID(baseURL, p.id);
		// 	p.categories = cats;
		// 	cats.map(async (categoryId) => {
		// 		const result = await fetch(`${baseURL}/categories/${categoryId}`, {
		// 			method: 'GET',
		// 			headers: {'Content-Type': 'application/json'}
		// 		})
		// 		.then((result) => {
		// 			console.log('result', result);
		// 		})
		// 		.catch(console.error)
		// 	})
		
		// })

		return data;
	} catch (error) {
		throw error
	}
}

const fetchProductById = (baseURL, productId) => {
	const [product, setProduct] = useState([]);
	useEffect(() => {
		fetch(`${baseURL}/products/${productId}`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		})
		.then(res => res.json())
		.then(async (result) => {
			const response = result;
			const category = await fetchCategoriesByProductID(baseURL, response.id);
			response.categories = category;
			setProduct(response);
		})
		.catch(console.error)
	}, []);
	return product
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
		if(result.status == 204){
			alert("Product was deleted.");
			location.reload();
		} else {
			alert("This product does not exist.");
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
				console.log('result: ', result);
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
	newProduct,
	editProduct,
	deleteProduct,
	addProduct,
	removeProduct
}
