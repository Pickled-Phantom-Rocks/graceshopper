import React, { useState, useEffect } from 'react';
import {fetchProducts, fetchUsers, NewProduct, EditProduct} from './'

const Admin = (props) => {
	const {baseURL} = props;
	const [products, setProducts] = useState([])
	//const [users, setUsers] = useState([]);

	async function fetchTheProducts() {

		try {

			const result = await fetchProducts(baseURL)
			setProducts(result)

		} catch (error) {
			console.log("Error fetching products: ", error)
		}

	}

	async function fetchTheUsers() {
		try {

			const result = await fetchUsers(baseURL)
			setUsers(result)

		} catch (error) {
			console.log("Error fetching users: ", error)
		}
	}

	async function deleteProduct(productId) {
		console.log('Delete product ID: ', productId);
	}

	async function editProduct(productId) {
		console.log('Edit product ID: ', productId);
	}

	useEffect(() => {
		fetchTheProducts()
		//fetchTheUsers()
	}, [])

	function renderProducts(product) {
		const {id, name} = product

		return <option value={id} key={id}>{name}</option>
	}

	console.log(products)
	
	return <div className="adminPanel">
		<h1>Admin Panel</h1>
		<h2>Products</h2>
		<section>
			<button>Add New Product</button>
			<br/><br/>

			<form>
				<label for="productLabel">Selected Product </label>
				<select id="productSelect" >
					<option value={'select a product'} key={0}>Select a product</option>
					{ products.map((product) => {
						return renderProducts(product)
					}) }
				</select><br/>
				<button>Edit Product</button> 
				<button>Delete Product</button>
			</form>
			
		</section>
		<h2>Categories</h2>
		<section>
		<button>Add new Category</button>
		<button>Edit Category</button>
		<button>Delete Category</button>
		</section>
		<h2>Users</h2>
		<section>
			Make Admin/Remove Admin, Delete
		</section>
	</div>
}

export default Admin;