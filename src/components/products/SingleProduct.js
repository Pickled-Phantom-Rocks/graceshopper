import {React, useState, useEffect} from 'react';
import {fetchProductById} from '.';

const SingleProduct = (props) => {
	const {baseURL, singleProductId, updateUsersCart} = props;
	const product = fetchProductById(baseURL, singleProductId);
	const {name, description, quantityAvailable, price, photoName} = product;
	const photoURL = process.env.PUBLIC_URL + "images/Products/" + photoName + ".jpg";

	return <div className="productList">
		<h3>{name}</h3>
		<div className="productListInner">
		<img src={photoURL} />
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
};

export default SingleProduct;