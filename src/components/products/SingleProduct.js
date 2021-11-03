import {React, useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import {fetchProductById} from '.';

const SingleProduct = (props) => {
	const {baseURL} = props;
	const {productId} = useParams();
	const product = fetchProductById(baseURL, productId);

	const {name, description, quantityAvailable, price, photoName} = product;

	return <div className="product">
		<h1>Products</h1>
		<Link to="/products"><button>Back to All Products</button></Link>
		<div className="productList">
			<h3>{name}</h3>
			<section className="productListInner">
				<img src={`/images/products/${photoName}.jpg`} />
				<div className="productListInfo">
					<label>Description:</label> {description}<br/>
					<label>Quantity:</label> {quantityAvailable}<br/>
					<label>Price:</label> {"$" + price}
				</div>
			</section>
			<section className="userOptions">
				<button onClick={async e => await updateUsersCart(product)}>Add to Cart</button>
				<button  style={{marginLeft: "1em", marginTop: "1em"}} onClick={e => console.log(product)}>Remove from Cart</button>
			</section>
		</div>
	</div>
};

export default SingleProduct;