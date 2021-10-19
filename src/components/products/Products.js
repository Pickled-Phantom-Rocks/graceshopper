import {React, useState} from 'react';
import {fetchProducts} from '../'

const Products = (props) => {
	const {baseURL} = props;
	const [selectedProduct, setSelectedProduct] = useState((''))
	const products = fetchProducts(baseURL);

	return <div id="products">
		<h1>Products</h1>
		<p>List of all available products</p>
		{
			products.map((product) => {
				const {id, name, description, quantityAvailable, price, photoName} = product;
				
				const photoURL = "images/Products/" + photoName + ".jpg";

				return <div className="productList" key={id}>
					<img src={process.env.PUBLIC_URL + photoURL} />
					<div className="productInfo">
						Name: {name}<br/>
						Description: {description}<br/>
						Quantity: {quantityAvailable}<br/>
						Price: {"$" + price}<br/>
					</div>
					<button>Add to Cart</button> <button>Remove from Cart</button>
				</div>
			})
		}
	</div>
}

export default Products;