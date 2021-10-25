import {React, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {fetchProductById} from '.';

const SingleProduct = (props) => {
	const {baseURL} = props;
	const {id: productId} = useParams();

	const product = fetchProductById(baseURL, productId);
	const {name, description, quantityAvailable, price, photoName} = product;
	const photoURL = "images/Products/" + photoName + ".jpg";

	return <div className="singleProduct">
		<h2>{name}</h2>
		<img src={process.env.PUBLIC_URL + photoURL} />
		<br/>
		<br/>
		<label>Description:</label> {description}<br/>
		<label>Quantity:</label> {quantityAvailable}<br/>
		<label>Price:</label> {"$" + price}<br/>
		<label>Category:</label> ???<br/>
		<section className="productOptions">
			<button>Add to Cart</button>
			<button>Remove from Cart</button>
		</section>
	</div>
};

export default SingleProduct;