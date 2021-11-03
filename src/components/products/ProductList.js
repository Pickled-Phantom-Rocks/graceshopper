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
						<button onClick={async e => await updateUsersCart(product)} style={{marginTop: "0.8em"}}>Add to Cart</button>
						{/* <button  style={{marginLeft: "1em", marginTop: "1em"}} onClick={e => console.log(product)}>Remove from Cart</button> */}
					</section>
				</div>
			})
		}
	</div>
}

export default ProductList;