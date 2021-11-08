import {useEffect, useState} from 'react';

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
		.catch(err => console.error(err))
	}, []);
	return categories;
}

async function fetchOrderList (userId, baseURL) {
	try {
		const result = await fetch(`${baseURL}/orders/${userId}/pastorders`, {
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
	fetchCategories
};