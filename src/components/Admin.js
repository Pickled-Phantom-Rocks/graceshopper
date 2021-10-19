import {React, useState} from 'react';
import {NewProduct, EditProduct, UserList} from './'

const Admin = (props) => {
	const {baseURL} = props;
	const [showUsers, setShowUsers] = useState(false);

	return <div className="adminPanel">
		<h1>Admin Panel</h1>
		<h2>Products</h2>
		<section>
			<button>Add New Product</button>
			<button>Edit Product</button> 
			<button>Delete Product</button>
			{/* <EditProduct baseURL={baseURL}/> */}
			<br/><br/>
		</section>
		<h2>Categories</h2>
		<section>
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