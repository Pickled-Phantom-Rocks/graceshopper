import {React, useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {fetchCategoryById} from '../categories/categoryUtils';
import {fetchProductsByCategory, fetchProductById} from '.';

const ProductsByCategory = (props) => {
	const {baseURL} = props;
	const {categoryId} = useParams();
	const category = fetchCategoryById(baseURL, categoryId);
	const categoryProducts = fetchProductsByCategory(baseURL, categoryId);
	console.log('from prodByCat', categoryProducts);

	return <div>
		<h1>{category.name} Rocks</h1>
		<Link to="/products"><button>Back to All Products</button></Link>
		<div className="productPageList">
			None...
			{
			categoryProducts.map((product) => {
				const {id: productId, name, description, quantityAvailable, price, photoName} = product;
				const photoURL = "images/Products/" + photoName + ".jpg";
				return <div className="productList" key={productId}>
					<h3><Link to={ `/product/${productId}`} >{name}</Link></h3>
					<div className="productListInner">
						<Link to={ `/product/${productId}`} ><img src={process.env.PUBLIC_URL + photoURL} /></Link>
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