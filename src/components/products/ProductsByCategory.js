import {React, useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {fetchCategoryById} from '../categories/categoryUtils';
import {fetchProductsByCategory, fetchProductById} from '.';

const ProductsByCategory = (props) => {
	const { baseURL, userToken, userId } = props;
	const {categoryId} = useParams();
	const category = fetchCategoryById(baseURL, categoryId);
	const categoryProducts = fetchProductsByCategory(baseURL, categoryId);

	async function updateUsersCart(productBeingAdded) {

		try {

		   console.log("PRoduct being added: ", productBeingAdded)

		   const _cart = await getCartByUserId(userId, baseURL)
		   const cart = _cart[0]
		   console.log("CART", cart)


		   const cartProducts = await getAllCartProductsByCartId(cart.id, baseURL)
		   console.log("Cart Products", cartProducts)


		   const productIds = cartProducts.map(product => {
			   return product.productId
		   })

		   console.log(productIds)
		   

		   if(productIds.includes(productBeingAdded.id)) {
			   //remove matching productId from cart
			   const _product = cartProducts.filter(prod => prod.productId === productBeingAdded.id)
			   console.log("PRODUCT HERE", _product)
			   
			   const product = _product[0]
			   const quantityInCart = product.quantityOfItem + 1
			   const quantityTakenFromWarehouse = productBeingAdded.quantityAvailable - 1
			   await updateItemQuantityAvailable(userToken, productBeingAdded.id, quantityTakenFromWarehouse, baseURL)
			   await deleteProductFromCartByProductId(product.productId, baseURL)
			   await addToUsersCart(cart.id, productBeingAdded.id, productBeingAdded.price, quantityInCart, baseURL)
			   location.reload()
		   } else {
			   const quantityTakenFromWarehouse = productBeingAdded.quantityAvailable - 1
			   await updateItemQuantityAvailable(userToken, productBeingAdded.id, quantityTakenFromWarehouse, baseURL)
			   await addToUsersCart(cart.id, productBeingAdded.id, productBeingAdded.price, 1, baseURL)
			   location.reload()
		   }
	   } catch (error) {
		   throw error
	   }
   }

	return <div>
		<h1>Products in {category.name}</h1>
		<Link to="/products"><button>Back to All Products</button></Link>
		<div className="productPageList">
			None...
			{
			categoryProducts.map((product) => {
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
						<button onClick={async e => await updateUsersCart(product)}>Add to Cart</button>
						<button  style={{marginLeft: "1em", marginTop: "1em"}} onClick={e => console.log(product)}>Remove from Cart</button>
					</section>
				</div>
			})
			}
		</div>
	</div>
}

export default ProductsByCategory;