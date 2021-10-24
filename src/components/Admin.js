import React, { useState, useEffect } from 'react';
import {NewProduct, EditProduct, DeleteProduct, NewCategory, EditCategory, DeleteCategory, UserList} from '.';

const Admin = (props) => {
	const {baseURL, userToken} = props;
	const [showNewProduct, setShowNewProduct] = useState(false);
	const [showEditProduct, setShowEditProduct] = useState(false);
	const [showDeleteProduct, setShowDeleteProduct] = useState(false);
	const [showNewCategory, setShowNewCategory] = useState(false);
	const [showEditCategory, setShowEditCategory] = useState(false);
	const [showDeleteCategory, setShowDeleteCategory] = useState(true);
	const [showUsers, setShowUsers] = useState(false);
	
	return <div className="adminPanel">
		<h1>Admin Panel</h1>
		<h2>Products</h2>
		<section className="userOptions">
			{!showNewProduct ? <button onClick={()=> {
				setShowNewProduct(true);
				setShowEditProduct(false);
				setShowDeleteProduct(false);
			}} >Add New Product</button> : <button onClick={()=> setShowNewProduct(false)} >Hide New Product</button>}
			{!showEditProduct ? <button onClick={()=> {
				setShowEditProduct(true);
				setShowNewProduct(false);
				setShowDeleteProduct(false);
			}}>Edit Product</button>  : <button onClick={()=> setShowEditProduct(false)}>Hide Edit Product</button> }
			{
			!showDeleteProduct ? <button onClick={()=> {
				setShowEditProduct(false);
				setShowNewProduct(false);
				setShowDeleteProduct(true);
			}}>Delete Product</button>: <button onClick={()=> setShowDeleteProduct(false)}>Hide Delete Product</button>
			}
		</section>
		{showEditProduct ? <EditProduct baseURL={baseURL} userToken={userToken} /> : null}
		{showNewProduct ? <NewProduct baseURL={baseURL} /> : null}
		{showDeleteProduct ? <DeleteProduct baseURL={baseURL} /> : null}

		<h2>Categories</h2>
		<section className="userOptions">
			{!showNewCategory ? <button onClick={()=> {
				setShowNewCategory(true);
				setShowEditCategory(false);
				setShowDeleteCategory(false);
			}} >Add New Category</button> : <button onClick={()=> setShowNewCategory(false)} >Hide New Category</button>}
			{!showEditCategory ? <button onClick={()=> {
				setShowNewCategory(false);
				setShowEditCategory(true);
				setShowDeleteCategory(false);
			}} >Edit Category</button> : <button onClick={()=> setShowEditCategory(false)} >Hide Edit Category</button>}
			{!showDeleteCategory ? <button onClick={()=> {
				setShowNewCategory(false);
				setShowEditCategory(false);
				setShowDeleteCategory(true);
			}} >Delete Category</button> : <button onClick={()=> setShowDeleteCategory(false)} >Hide Delete Category</button>}
		</section>
		{showNewCategory ? <NewCategory baseURL={baseURL}/> : null}
		{showEditCategory ? <EditCategory baseURL={baseURL} userToken={userToken} /> : null}
		{showDeleteCategory ? <DeleteCategory baseURL={baseURL}/> : null}
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