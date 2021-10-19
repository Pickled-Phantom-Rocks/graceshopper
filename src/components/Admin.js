import React from 'react';
import {fetchProducts, fetchUsers, NewProduct, EditProduct} from './'

const Admin = (props) => {
	const {baseURL} = props;
	const products = fetchProducts(baseURL);
	const users = fetchUsers(baseURL);

	async function deleteProduct(productId) {
		console.log('Delete product ID: ', productId);
	}

	async function editProduct(productId) {
		console.log('Edit product ID: ', productId);
	}

	return <div className="adminPanel">
		<h1>Admin Panel</h1>
		<h2>Products</h2>
		<section>
			<button>Add New Product</button>
			<br/><br/>
			<form>
				<select id="productSelect" size="10">
					{
						products.map((product) => {
							const { id, name } = product;
							return <option value={id} key={id}>{name}</option>
						})
					}
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