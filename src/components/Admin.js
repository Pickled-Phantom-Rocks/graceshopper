import React, { useState, useEffect } from 'react';

import {NewProduct, 
	EditProduct, 
	DeleteProduct, 
	AddProduct, 
	RemoveProduct, 
	NewCategory, 
	EditCategory, 
	DeleteCategory, 
	UserList, 
	OrderList,
	OrdersByStatus
} from '.';

const Admin = (props) => {
	const {baseURL, userToken, userId } = props;
	const [showNewProduct, setShowNewProduct] = useState(false);
	const [showEditProduct, setShowEditProduct] = useState(false);
	const [showDeleteProduct, setShowDeleteProduct] = useState(false);
	const [showAddToCategory, setShowAddToCategory] = useState(false);
	const [showRemoveFromCategory, setshowRemoveFromCategory] = useState(false);
	const [showNewCategory, setShowNewCategory] = useState(false);
	const [showEditCategory, setShowEditCategory] = useState(false);
	const [showDeleteCategory, setShowDeleteCategory] = useState(false);
	const [showUsers, setShowUsers] = useState(false);
	const [showOrders, setShowOrders] = useState(false);
	const [showAllOrders, setShowAllOrders] = useState(false);
	const [showByStatus, setShowByStatus] = useState(false);
	const [orderListStatus, setOrderListStatus] = useState('');
	const [completed, setCompleted] = useState(true);
	const [cancelled, setCancelled] = useState(true);
	const [processing, setProcessing] = useState(true);
	const [created, setCreated] = useState(true);

	return <div className="adminPanel">
		<h1>Admin Panel</h1>
		<h2>Products</h2>
		<section className="userOptions">
			{!showNewProduct ? <button onClick={()=> {
				setShowNewProduct(true);
				setShowEditProduct(false);
				setShowDeleteProduct(false);
				setShowAddToCategory(false);
				setshowRemoveFromCategory(false);
			}} >Add New Product</button> : <button onClick={()=> setShowNewProduct(false)} >Hide New Product</button>}
			{!showEditProduct ? <button onClick={()=> {
				setShowEditProduct(true);
				setShowNewProduct(false);
				setShowDeleteProduct(false);
				setShowAddToCategory(false);
				setshowRemoveFromCategory(false);
			}}>Edit Product</button>  : <button onClick={()=> setShowEditProduct(false)}>Hide Edit Product</button> }
			{!showDeleteProduct ? <button onClick={()=> {
				setShowEditProduct(false);
				setShowNewProduct(false);
				setShowDeleteProduct(true);
				setShowAddToCategory(false);
				setshowRemoveFromCategory(false);
			}}>Delete Product</button>: <button onClick={()=> setShowDeleteProduct(false)}>Hide Delete Product</button>}
			<br/><br/>
			{!showAddToCategory ? <button onClick={()=> {
				setShowEditProduct(false);
				setShowNewProduct(false);
				setShowDeleteProduct(false);
				setShowAddToCategory(true);
				setshowRemoveFromCategory(false);
			}}>Add Product to Category</button>:  <button onClick={()=> setShowAddToCategory(false)}>Hide Add to Category</button>}
			{!showRemoveFromCategory ? <button onClick={()=> {
				setShowEditProduct(false);
				setShowNewProduct(false);
				setShowDeleteProduct(false);
				setShowAddToCategory(false);
				setshowRemoveFromCategory(true);
			}}>Remove Product From Category</button>:  <button onClick={()=> setshowRemoveFromCategory(false)}>Hide Remove From Category</button>}
		</section>
		{showEditProduct ? <EditProduct baseURL={baseURL} userToken={userToken} /> : null}
		{showNewProduct ? <NewProduct baseURL={baseURL} /> : null}
		{showDeleteProduct ? <DeleteProduct baseURL={baseURL} /> : null}
		{showAddToCategory ? <AddProduct baseURL={baseURL}/> : null}
		{showRemoveFromCategory ? <RemoveProduct baseURL={baseURL}/> : null}
		<br/>

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
		<section className="userOptions">
			{showUsers? <button onClick={()=> setShowUsers(false)}>Hide</button> : <button onClick={()=> setShowUsers(true)}>Show User List</button>}
		</section>
		{!showUsers ? null : <UserList baseURL={baseURL} userToken={userToken} />}
		<h2>Orders</h2>
		<section className="userOptions">
		{!showOrders ? <button onClick={()=> {
							setShowOrders(true); 
							setShowAllOrders(true); 
							setShowByStatus(false);
							setProcessing(true);
							setCreated(true);
							setCancelled(true);
							setCompleted(true);}} >Show Orders</button> 
					: <button onClick={()=> {
						setShowOrders(false); 
						setShowAllOrders(false); 
						setShowByStatus(false);
						setProcessing(false);
						setCreated(false);
						setCancelled(false);
						setCompleted(false);}}>Hide All Orders</button>}
		</section>
			{!showOrders ? null : <section className="userOptions">
				<br/>
				<button onClick={() => {
					setShowByStatus(false);
					setShowAllOrders(true);
					setCancelled(true);
					setCompleted(true);
					setProcessing(true);
					setCreated(true);
				}}>All</button>
				{created ? <button onClick={() => {
					setOrderListStatus('Created');
					setShowAllOrders(false);
					setShowByStatus(true);
					setCancelled(false);
					setCompleted(false);
					setProcessing(false);
				}}>Created</button> : null}
				{processing ? <button onClick={() => {
					setOrderListStatus('Processing');
					setShowAllOrders(false);
					setShowByStatus(true);
					setCancelled(false);
					setCompleted(false);
					setCreated(false);
				}}>Processing</button> : null}
				{cancelled ? <button onClick={() => {
					setOrderListStatus('Cancelled');
					setShowAllOrders(false);
					setShowByStatus(true);
					setCompleted(false);
					setProcessing(false);
					setCreated(false);
				}}>Cancelled</button> : null}
				{completed ? <button onClick={() => {
					setOrderListStatus('Completed');
					setShowAllOrders(false);
					setShowByStatus(true);
					setProcessing(false);
					setCreated(false);
					setCancelled(false);
				}}>Completed</button>  : null}
			</section> 
			}
		{showAllOrders ? <OrderList baseURL={baseURL} userToken={userToken} /> : null}
		{showByStatus ? <OrdersByStatus baseURL={baseURL} orderListStatus={orderListStatus} userToken={userToken} userId={userId}/> : null}
		<p>Add pagination so only ten items at a time are shown.</p>
	</div>
}

export default Admin;