import {React, useState, useEffect} from 'react';
import {fetchProducts, fetchProductsByCategoryID, removeProduct} from '.';
import {fetchCategories} from '..';

const RemoveProduct = (props) => {
	const {baseURL} = props;
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');

	async function fetchTheCategories() {
		try {
			const result = await fetchCategories(baseURL)
			setCategories(result)
		} catch (error) {
			console.error(error);
		}
	}	
	async function fetchTheProducts() {
		try {
			const prods = [];
			const catProds = await fetchProductsByCategoryID(baseURL, selectedCategory);
			console.log(catProds)
			if(catProds.length > 0){
				catProds.map((prod) => {
					console.log(prod);
					prods.push(prod);
				})
			}
			setProducts(prods)
		} catch (error) {
			throw error
		}
	}
	useEffect(() => {
		fetchTheCategories();
	}, []);


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
			<label>Categories</label>
			<select id="categorySelect" size="5" onChange={(event) => {
				setSelectedCategory(event.target.value);
				fetchTheProducts();
			}}>
				{
					categories.map((category) => {
						const { id, name } = category;
						return <option value={id} key={id}>{name}</option>
					})
				}
			</select>
			<br/><br/>
			<label>Products: </label>
			<select id="productSelect" size="5" onChange={(event) => {
				setSelectedProduct(event.target.value);
			}}>
				{
					products.map((product) => {
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