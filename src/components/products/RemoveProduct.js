import {React, useState, useEffect, useRef} from 'react';
import {fetchProducts, removeProduct} from '.';
import {fetchCategories} from '..';
import {fetchCategoriesByProductID} from '../categories';


const RemoveProduct = (props) => {
	const {baseURL} = props;
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const selectedProductRef = useRef('');
	const selectedCategoryRef = useRef('');

	async function fetchTheProducts() {
		try {
			const results = await fetchProducts(baseURL);
			setProducts(results);
		} catch (error) {
			throw error
		}
	}
	async function fetchTheCategories() {
		try {
			const result = await fetchCategories(baseURL);
			const catProd = await fetchCategoriesByProductID(baseURL, selectedProductRef.current);
			const catList = [];
			catProd.map((catId) => {
				for(let cat of result) {
					if(cat.id === catId){
						catList.push(cat);
					}
				}
			});
			setCategories(catList);
		} catch(error) {
			console.error(error);
		}
	}
	useEffect(() => {
		fetchTheProducts();
	}, []);

	categories.sort((a, b) => {
		const nameA = a.name.toLowerCase()
		const nameB = b.name.toLowerCase()
		if(nameA < nameB) {
			return -1
		}
		if(nameA > nameB) {
			return 1
		}
		return 0
	})

	products.sort((a, b) => {
		const nameA = a.name.toLowerCase()
		const nameB = b.name.toLowerCase()
		if(nameA < nameB) {
			return -1
		}
		if(nameA > nameB) {
			return 1
		}
		return 0
	})

	async function removeTheProduct(){
		event.preventDefault();

		const cselector = document.getElementById("categorySelect");
		const categoryId = cselector.options[cselector.selectedIndex].value;

		const pselector = document.getElementById("productSelect");
		const productId = pselector.options[pselector.selectedIndex].value;

		const result= await removeProduct(baseURL, categoryId, productId);
	}

	return <div className="form">
		<h3>Remove a Product from a Category</h3>
		<br/>
		<form onSubmit={removeTheProduct}>
			<label>Products: </label>
			<select id="productSelect" size="5" onChange={(event) => {
				selectedProductRef.current = event.target.value;
				fetchTheCategories();
			}}>
				{
					products.map((category) => {
						const { id, name } = category;
						return <option value={id} key={id}>{name}</option>
					})
				}
			</select>
			<br/><br/>
			<label>Categories: </label>
			<select id="categorySelect" size="5" onChange={(event) => {
				selectedCategoryRef.current = event.target.value;
			}}>
				{
					categories.map((product) => {
						const { id, name } = product;
						return <option value={id} key={id}>{name}</option>
					})
				}
			</select>
			<br/><br/>
			<button>Remove</button>
		</form>
	</div>
}

export default RemoveProduct;