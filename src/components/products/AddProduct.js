import {React, useState, useEffect, useRef} from 'react';
import {fetchProducts, addProduct} from '.';
import {fetchCategories} from '..';
import { fetchCategoriesByProductID } from '../categories';

const AddProduct = (props) => {
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

			const cats = await fetchCategories(baseURL);
			const catProd = await fetchCategoriesByProductID(baseURL, selectedProductRef.current);
			catProd.map((catId) => {
				for(let cat of cats) {
					if(cat.id === catId){
						const dex = cats.indexOf(cat);
						cats.splice(dex, 1);
					}
				}
			});
			setCategories(cats);
		} catch (error) {
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

	async function createCategoryProduct(){
		event.preventDefault();

		const categoryId = selectedCategoryRef.current;
		const productId = selectedProductRef.current;
		const result= await addProduct(baseURL, categoryId, productId);
	}
	return <div className="form">
		<h3>Add a Product to a Category</h3>
		<br/>
		<form onSubmit={createCategoryProduct}>
			<label>Products: </label><br />
			<select id="productSelect" size="5" onChange={(event) => {
				selectedProductRef.current = event.target.value;
				fetchTheCategories();
			}}>
				{
					products.map((product) => {
						const { id, name } = product;
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
					categories.map((category) => {
						const { id, name } = category;
						return <option value={id} key={id}>{name}</option>
					})
				}
			</select>
			<br/><br/>
			<button>Submit</button>
		</form>
	</div>
}

export default AddProduct;