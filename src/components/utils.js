import {useEffect, useState} from 'react';

const fetchProducts = (baseURL) => {
	const [ products, setProducts] = useState([]);
	useEffect(() => {
		fetch(`${baseURL}/products`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		})
		.then(res => res.json())
		.then((res) => {
			const response = res;
			setProducts(response);
		})
		.catch(err => console.log(err))
	}, []);
	return products;
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

export {
	fetchProducts,
	fetchCategories
};