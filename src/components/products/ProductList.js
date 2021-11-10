import { React, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {fetchProducts} from '.'
import {updateUsersCart} from '../cart/cartUtils';

const ProductList = (props) => {
	const {baseURL, userId, userToken} = props;
	const [products, setProducts] = useState([]);

	async function fetchTheProducts() {
		try {
			const results = await fetchProducts(baseURL);
			console.log("results: ", results)
			setProducts(results);

		} catch (error) {
			throw error
		}
	} 

	useEffect(() => {
		fetchTheProducts();
	}, [])

	products.sort((a, b) => {
		const nameA = a.name.toLowerCase()
		const nameB = b.name.toLowerCase()
		if(nameA < nameB) {
			return -1
		}
		if(nameA > nameB) {
			return 1
		}
		return 0
	})

	return <div className="productPageList">
		{
			products.map((product) => {
				const {id: productId, name, description, quantityAvailable, price, photoName} = product;
				const photoURL = "images/Products/" + photoName + ".jpg";

				if (quantityAvailable > 1) {
					return <div className="productList" key={productId}>
						<h3><Link to={ `/product/${productId}`} >{name}</Link></h3>
						<div className="productListInner">
							<Link to={ `/product/${productId}`} ><img src={photoURL} /></Link>
							<div className="productListInfo">
								<label>Description:</label> {description}<br/>
								<label>Quantity:</label> {quantityAvailable}<br/>
								<label>Price:</label> {"$" + price}
							</div>
						</div>
						<section className="userOptions">
						<button onClick={async e => {

							await updateUsersCart(baseURL, userId, userToken, product)
							await fetchTheProducts()
							alert(`${name} has been added to your cart`)
							}} style={{marginTop: "0.8em"}}>Add to Cart</button>
						</section>
						</div>
				} else {
					return <div className="productList" key={productId}>
					<h3><Link to={ `/product/${productId}`} >{name}</Link></h3>
					<div className="productListInner">
						<Link to={ `/product/${productId}`} ><img src={photoURL} /></Link>
						<div className="productListInfo">
							<label>Description:</label> {description}<br/>
							<label>Quantity:</label> Sold Out!<br/>
							<label>Price:</label> {"$" + price}
						</div>
					</div>
					<section className="userOptions">
					<button disabled={true}>Add to Cart</button>
					</section>
					</div>
				}
				
			})
		}
	</div>
}

export default ProductList;