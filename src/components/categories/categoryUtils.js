import {useEffect, useState} from 'react';

async function fetchCategories(baseURL) {
	try {
		const result = await fetch(`${baseURL}/categories`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		})
		const data = await result.json()
		return data;
	} catch (error) {
		throw error
	}
}

async function newCategory(baseURL, name) {
	const result = await fetch(`${baseURL}/categories`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: name,
		})
		})
		.then(res => res.json())
		.then((result) => {
			if(result.status) {
				alert("New category has been created");
				location.reload();
			} else {
				alert("This category already exists.")
			}
		})
		.catch(console.error);
}

async function editCategory(baseURL, userToken, categoryId, newName){
	const result = await fetch(`${baseURL}/categories/${categoryId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${userToken}`
		},
		body: JSON.stringify({
			name: newName
		})
	})
	.then(res => res.json())
	.then(result => {
		if(result.status){
			alert("Category successfully updated.");
			location.reload();
		} else {
			alert("A category with this name already exists.")
		}
	})
	.catch(console.error);
}

async function deleteCategory(baseURL, categoryId){
	const result = await fetch(`${baseURL}/categories/${categoryId}`, {
		method: 'DELETE',
		headers: {'Content-Type': 'application/json'}
	})
	.then(res => res.json())
	.then(result => {
		console.log(result);
	})
	.catch(console.error);
}
export {
	fetchCategories,
	newCategory,
	editCategory,
	deleteCategory
};