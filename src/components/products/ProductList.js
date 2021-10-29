import { React, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {fetchProducts} from '.'

const ProductList = (props) => {
	const {baseURL, updateUsersCart, setSingleProductId, setShowSingleProduct, setShowAllProducts, setShowProductsByCategory} = props;
	const [products, setProducts] = useState([]);
	
	async function fetchTheProducts() {
		try {
			const results = await fetchProducts(baseURL);
			setProducts(results);
		} catch (error) {
			throw error
		}
	}

	useEffect(() => {
		fetchTheProducts();
	}, [])

	return <div className="productPageList">
		{
			products.map((product) => {
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
}

export default ProductList;