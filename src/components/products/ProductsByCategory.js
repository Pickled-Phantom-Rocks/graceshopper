import {React, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { fetchCategoryById } from '../categories/categoryUtils';
import { fetchProductById } from '.';

const ProductsByCategory = (props) => {
	const {baseURL, selectedCategory} = props;
	const [categoryProducts, setCategoryProducts] = useState([]);
	const [products, setProducts] = useState([]);
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
				console.log(result);

				const response = result;
				setCategoryProducts(response);
			})
		} catch (error) {
			throw error
		}
	}


	async function fetchTheProducts() {
		// try {
		// 	categoryProducts.map((cp) => {
		// 		const p = fetchProductById(cp.productId);
		// 		console.log(p);
		// 	})
		// } catch (error) {
		// 	throw error
		// }
	}

	useEffect(() => {
		fetchTheCategoryProducts();
		fetchTheProducts();
	}, [])

	return <div>
		<h2>Products in {category.name}</h2>
		<div className="productPageList">
		{!categoryProducts ? "None" :

			categoryProducts.map((product) => {
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
							<button onClick={e => updateUsersCart(product)}>Add to Cart</button>
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