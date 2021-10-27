import { React, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {fetchProducts} from '.'

const ProductList = (props) => {
	const {baseURL} = props;
	const [products, setProducts] = useState([]);

	async function fetchTheProducts() {
		try {
			const results = await fetchProducts(baseURL)
			setProducts(results)
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
				const {id: productId, name, description, quantityAvailable, price, photoName} = product;
				
				const photoURL = "images/Products/" + photoName + ".jpg";
				return <div className="productList" key={productId}>
					<Link to={`/product/${productId}`}><img src={process.env.PUBLIC_URL + photoURL} /></Link>
					<div className="productInfo">
						<Link to={`/product/${productId}`}><h3>{name}</h3></Link>
						<label>Description:</label> {description}<br/>
						<label>Quantity:</label> {quantityAvailable}<br/>
						<label>Price:</label> {"$" + price}<br/>
						<label>Category:</label> ???<br/>
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