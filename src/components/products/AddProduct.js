import {React, useState, useEffect} from 'react';
import {fetchProducts, addProduct} from '.';
import {fetchCategories} from '..';

const AddProduct = (props) => {
	const {baseURL} = props;
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);

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
			const result = await fetchCategories(baseURL)
			setCategories(result)
		} catch (error) {
			console.error(error);
		}
	}
	useEffect(() => {
		fetchTheProducts();
		fetchTheCategories();
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
			<select id="productSelect" size="10">
				{
					products.map((product) => {
						const { id, name } = product;
						return <option value={id} key={id}>{name}</option>
					})
				}
			</select>
			<select id="categorySelect" size="10">
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