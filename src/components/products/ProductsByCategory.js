import {React, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { fetchCategoryById } from '../categories/categoryUtils';
import { fetchProductById } from '.';

const ProductsByCategory = (props) => {
	const {baseURL, selectedCategory, updateUsersCart} = props;
	const [category, setCategory] = useState('');
	const [categoryProducts, setCategoryProducts] = useState([]);
	const [productList, setProductList] = useState([]);

	async function fetchTheCategory() {
		const response = await fetchCategoryById(baseURL, selectedCategory);
		setCategory(response.name);
	};

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
	};

	async function fetchTheProducts() {
		const products = [];
		categoryProducts.map(async (catProd) => {
			const product = await fetchProductById(baseURL, catProd.productId);
			products.push(product);
		})
		setProductList(products);
	}

	useEffect(() => {
		fetchTheCategory();
		fetchTheCategoryProducts();
		fetchTheProducts();
	}, []);

	return <div>
		<h2>Products in {category}</h2>
		<div className="productPageList">
			{productList.length > 0 ? null : "There are no products in this category."}
			{
			productList.map((product) => {
				const {id: productId, name, description, quantityAvailable, price, photoName} = product;
				const photoURL = "images/Products/" + photoName + ".jpg";
				return <div className="productList" key={productId}>
					<Link to="/products" onClick={()=>{
						setShowSingleProduct(true);
						setSingleProductId(productId);
						setShowAllProducts(false);
						setShowProductsByCategory(false);
					}}><h3>{name}</h3></Link>
					<div className="productListInner">
						<Link to="/products" onClick={()=>{
						setShowSingleProduct(true);
						setSingleProductId(productId);
						setShowAllProducts(false);
						setShowProductsByCategory(false);
						}}><img src={process.env.PUBLIC_URL + photoURL} /></Link>
						<div className="productListInfo">
							<label>Description:</label> {description}<br/>
							<label>Quantity:</label> {quantityAvailable}<br/>
							<label>Price:</label> {"$" + price}
						</div>
					</div>
					<section className="userOptions">
						<button onClick={async e => await updateUsersCart(product)}>Add to Cart</button>
						<button  style={{marginLeft: "1em", marginTop: "1em"}} onClick={e => console.log(product)}>Remove from Cart</button>
					</section>
				</div>
			})
			}
		</div>
	</div>
}

export default ProductsByCategory;