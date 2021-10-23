import React, { useState, useEffect } from 'react';
import {NewProduct, EditProduct, UserList} from '.';

const Admin = (props) => {
	const {baseURL, userToken} = props;
	const [showNewProduct, setShowNewProduct] = useState(false);
	const [showEditProduct, setShowEditProduct] = useState(true);
	const [showUsers, setShowUsers] = useState(false);
	
	return <div className="adminPanel">
		<h1>Admin Panel</h1>
		<h2>Products</h2>
		<section className="userOptions">
			{!showNewProduct ? <button onClick={()=> {
				setShowNewProduct(true);
				setShowEditProduct(false);
			}} >Add New Product</button> : <button onClick={()=> setShowNewProduct(false)} >Hide New Product</button>}
			{!showEditProduct ? <button onClick={()=> {
				setShowEditProduct(true);
				setShowNewProduct(false);
			}}>Edit Product</button>  : <button onClick={()=> setShowEditProduct(false)}>Hide Edit Product</button> }
			<button>Delete Product</button>
		</section>
		{showEditProduct ? <EditProduct baseURL={baseURL} userToken={userToken} /> : null}
		{showNewProduct ? <NewProduct baseURL={baseURL} /> : null}

		<h2>Categories</h2>
		<section className="userOptions">
			<button>Add new Category</button>
			<button>Edit Category</button>
			<button>Delete Category</button>
		</section>
		<h2>Users</h2>
		{
			showUsers? <button onClick={()=> setShowUsers(false)}>Hide</button> : <button onClick={()=> setShowUsers(true)}>Show User List</button>
		}
		{
			!showUsers ? null : 
			<section>
				<UserList baseURL={baseURL}/>
			</section>
		}
	</div>
}

export default Admin;