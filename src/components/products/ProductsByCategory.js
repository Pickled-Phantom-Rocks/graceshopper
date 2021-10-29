import {React, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { fetchCategoryById } from '../categories/categoryUtils';
import { fetchProductById } from '.';

const ProductsByCategory = (props) => {
	const {baseURL, selectedCategory, updateUsersCart} = props;
	const [categoryProducts, setCategoryProducts] = useState([]);
	const products = [];
	const category = fetchCategoryById(baseURL, selectedCategory);

	async function fetchTheCategoryProducts() {
		try {
			const categoryId = selectedCategory;
			fetch(`${baseURL}/category_products/category/${categoryId}`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			})
			.then(res => res.json())
			.then((result) => {
				setCategoryProducts(result);
			});
		} catch (error) {
			throw error
		}
	}

	
	async function fetchTheProducts() {
		try{
			if(categoryProducts){
				categoryProducts.map((cp)=>{
					fetch(`${baseURL}/products/${cp.productId}`, {
						method: 'GET',
						headers: {'Content-Type': 'application/json'}
					})
					.then(res => res.json())
					.then((result) => {
						const response = result;
						products.push(response);
					})
					.catch(console.error)
				})
			}
		}catch(error) {
			console.error(error);
		}
	}

	useEffect(() => {
		fetchTheCategoryProducts();
		fetchTheProducts();
	}, [])

	return <div>
		<h2>Products in {category.name}</h2>
		<div className="productPageList">
		{!categoryProducts ? "None" :

			products.map((product) => {
				console.log(product);
				const {id: productId, name, description, quantityAvailable, price, photoName, categories} = product;
				const photoURL = "images/Products/" + photoName + ".jpg";
				return <div className="productList" key={productId}>
					<Link to="/products" onClick={()=>{
						setShowSingleProduct(true);
						setSingleProductId(productId);
						setShowAllProducts(false);
						setShowProductsByCategory(false);
					}}><img src={process.env.PUBLIC_URL + photoURL} /></Link>
					<div className="productInfo">
						<Link to="/products" onClick={()=>{
						setShowSingleProduct(true);
						setSingleProductId(productId);
						setShowAllProducts(false);
						setShowProductsByCategory(false);
						}}><h3>{name}</h3></Link>
						<label>Description:</label> {description}<br/>
						<label>Quantity:</label> {quantityAvailable}<br/>
						<label>Price:</label> {"$" + price}<br/>
						<label>Category:</label> {categories}
						<br/>
						<section className="productOptions">
							<button onClick={async e => await updateUsersCart(product)}>Add to Cart</button>
							<button  style={{marginLeft: "1em", marginTop: "1em"}} onClick={e => console.log(product)}>Remove from Cart</button>
						</section>
					</div>
				</div>
			})
		}
		</div>
	</div>
}

export default ProductsByCategory;