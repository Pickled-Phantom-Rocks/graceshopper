import {React, useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {fetchProductById} from '.';
import {updateUsersCart} from '../cart/cartUtils';

const SingleProduct = (props) => {
	const {baseURL, userId, userToken} = props;
	const {productId} = useParams();
	const [product, setProduct] = useState([])

	async function getTheProduct() {
		try {

			const result = await fetchProductById(baseURL, productId);
			setProduct(result)

		} catch (error) {
			throw error
		}
	}

	useEffect(() => {
		getTheProduct()
	}, [product])

	const {name, description, quantityAvailable, price, photoName} = product[0];
	const photoURL = "images/Products/" + photoName + ".jpg";

	return <div className="product">
		<h1>Products</h1>
		<Link to="/products"><button>Back to All Products</button></Link>
		<div className="productList" key={productId}>
				<h3>{name}</h3>
				<div className="productListInner">
					<img src={`/images/products/${photoName}.jpg`} />
					<div className="productListInfo">
						<label>Description:</label> {description}<br/>
						<label>Quantity:</label> {quantityAvailable}<br/>
						<label>Price:</label> {"$" + price}
					</div>
				</div>
			<section className="userOptions">
				<button onClick={async e => await updateUsersCart(baseURL, userId, userToken, product)} style={{marginTop: "0.8em"}}>Add to Cart</button>
			</section>
		</div>
	</div>
};

export default SingleProduct;