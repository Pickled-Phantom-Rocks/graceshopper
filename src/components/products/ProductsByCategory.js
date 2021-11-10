import {React, useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import {fetchCategoryById} from '../categories/categoryUtils';
import {fetchProductsByCategory} from '.';
import {updateUsersCart} from '../cart/cartUtils';

const ProductsByCategory = (props) => {
	const {baseURL, userId, userToken} = props;
	const {categoryId} = useParams();
	const category = fetchCategoryById(baseURL, categoryId);
	const [categoryProducts, setCategoryProducts] = useState([])

	async function getCategoryProducts() {
		try {

			const results = await fetchProductsByCategory(baseURL, categoryId)
			setCategoryProducts(results)

		} catch (error) {
			throw error
		}
	}

	useEffect(() => {
		getCategoryProducts()
	}, [category])

	categoryProducts.sort((a, b) => {
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



	return <div>
		<h1>{category.name} Rocks</h1>
		<Link to="/products"><button>Back to All Products</button></Link>
		<div className="productPageList">
			{
			categoryProducts.map((product) => {
				const {id: productId, name, description, quantityAvailable, price, photoName} = product;

				if(quantityAvailable > 1) {
					return <div className="productList" key={productId}>
						<h3><Link to={ `/product/${productId}`} >{name}</Link></h3>
						<div className="productListInner">
							<Link to={ `/product/${productId}`} ><img src={`/images/products/${photoName}.jpg`} /></Link>
							<div className="productListInfo">
								<label>Description:</label> {description}<br/>
								<label>Quantity:</label> {quantityAvailable}<br/>
								<label>Price:</label> {"$" + price}
							</div>
						</div>
						<section className="userOptions">
							<button onClick={async e => {
								await updateUsersCart(baseURL, userId, userToken, product)
								await getCategoryProducts()
								}} style={{marginTop: "0.8em"}}>Add to Cart</button>
						</section>
						</div>
				} else {
					return <div className="productList" key={productId}>
						<h3><Link to={ `/product/${productId}`} >{name}</Link></h3>
						<div className="productListInner">
							<Link to={ `/product/${productId}`} ><img src={`/images/products/${photoName}.jpg`} /></Link>
							<div className="productListInfo">
								<label>Description:</label> {description}<br/>
								<label>Quantity:</label> Sold Out!<br/>
								<label>Price:</label> {"$" + price}
							</div>
						</div>
						<section className="userOptions">
							<button disabled={true} style={{marginTop: "0.8em"}}>Add to Cart</button>
						</section>
						</div>
				}


			})
			}
		</div>
	</div>
}

export default ProductsByCategory;