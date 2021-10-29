import {React, useState, useEffect} from 'react';
import {fetchProductById} from '.';

const SingleProduct = (props) => {
	const {baseURL, singleProductId, updateUsersCart} = props;
	const product = fetchProductById(baseURL, singleProductId);
	const {name, description, quantityAvailable, price, photoName} = product;
	const photoURL = process.env.PUBLIC_URL + "images/Products/" + photoName + ".jpg";

	return <div className="singleProduct">
		<h2>{name}</h2>
		<img src={photoURL} />
		<br/>
		<br/>
		<label>Description:</label> {description}<br/>
		<label>Quantity:</label> {quantityAvailable}<br/>
		<label>Price:</label> {"$" + price}<br/>
		<label>Category:</label> ???<br/>
		<section className="productOptions">
			<button onClick={async e => await updateUsersCart(product)}>Add to Cart</button>
			<button>Remove from Cart</button>
		</section>
	</div>
};

export default SingleProduct;