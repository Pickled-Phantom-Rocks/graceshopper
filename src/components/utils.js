import {useEffect, useState} from 'react';

async function fetchUsers(baseURL) {
	// const [users, setUsers] = useState([]);
	// useEffect(() => {
	// 	fetch(`${baseURL}/users`, {
	// 		method:'GET',
	// 		headers: {'Content-Type': 'application/json'}
	// 	})
	// 	.then(res => res.json())
	// 	.then((res) => {
	// 		const response = res;
	// 		setUsers(response);
	// 	})
	// })

	try {
		const result = await fetch(`${baseURL}/users`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		})

		const data = await result.json()

		return data
	} catch (error) {
		throw error
	}
}
async function fetchProducts(baseURL) {
	// const [ products, setProducts] = useState([]);
	// useEffect(() => {
	// 	fetch(`${baseURL}/products`, {
	// 		method: 'GET',
	// 		headers: {'Content-Type': 'application/json'}
	// 	})
	// 	.then(res => res.json())
	// 	.then((res) => {
	// 		const response = res;
	// 		setProducts(response);
	// 	})
	// 	.catch(err => console.log(err))
	// }, []);
	// return products;

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

const fetchCategories = (baseURL) => {
	const [ categories, setCategories] = useState([]);
	useEffect(() => {
		fetch(`${baseURL}/categories`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		})
		.then(res => res.json())
		.then((res) => {
			const response = res;
			setcategories(response);
		})
		.catch(err => console.log(err))
	}, []);
	return categories;
}

async function fetchOrderList (username, baseURL) {
	try {
		const result = await fetch(`${baseURL}/${username}/pastorders`, {
			method: "GET",
			headers: {
			  'Content-Type': 'application/json',
			}
		  });
		const data = await result.json();
		return data;
	} catch (error) {
		console.error(error);
	}

}

export {
	fetchProducts,
	fetchCategories,
	fetchOrderList
};