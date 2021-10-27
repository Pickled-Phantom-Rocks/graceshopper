import {React, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { fetchProductsByCategory } from '.';

const ProductsByCategory = (props) => {
	const {baseURL} = props;
	const {id: categoryId} = useParams();

	async function fetchTheCategoryProducts(){
		event.preventDefault();
		const selector = document.getElementById("categorySelect");
		const categoryId = selector.options[selector.selectedIndex].value;



		const result = await fetchProductsByCategory(baseURL, categoryId);
		console.log(result);
		//setProducts(result);
	}

	return <h1>{categoryId}</h1>
}

export default ProductsByCategory;