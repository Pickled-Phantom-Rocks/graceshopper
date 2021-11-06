import {React, useState, useEffect} from 'react';
import {fetchProducts, addProduct} from '.';
import {fetchCategories} from '..';
import { fetchCategoriesByProductID } from '../categories';

const AddProduct = (props) => {
	const {baseURL} = props;
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');

	async function fetchTheProducts() {
		try {
			const results = await fetchProducts(baseURL)
			setProducts(results)
		} catch (error) {
			throw error
		}
	}
	async function fetchTheCategories() {
		try {
			const cats = await fetchCategories(baseURL);
			const catProd = await fetchCategoriesByProductID(baseURL, selectedProduct);
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

	async function createCategoryProduct(){
		event.preventDefault();

		const pselector = document.getElementById("productSelect");
		const productId = pselector.options[pselector.selectedIndex].value;

		const cselector = document.getElementById("categorySelect");
		const categoryId = cselector.options[cselector.selectedIndex].value;

		const result= await addProduct(baseURL, categoryId, productId);
	}
	return <div className="form">
		<h3>Add a Product to a Category</h3>
		<br/>
		<form onSubmit={createCategoryProduct}>
			<label>Products: </label><br />
			<select id="productSelect" size="5" onChange={(event) => {
				setSelectedProduct(event.target.value);
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
				setSelectedCategory(event.target.value);
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