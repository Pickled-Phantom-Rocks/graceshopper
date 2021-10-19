import {React, useState} from 'react';
import {EditUser, EditUserBilling, EditPassword} from './'

const Profile = (props) => {
	const {baseURL, username, userToken} = props;
	const [showEditUser, setShowEditUser] = useState(false)
	const [showEditBilling, setShowEditBilling] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);

	return <div id="profile">
		<h1>Hello, {username}!</h1>
		{ 
			showEditUser ? <button onClick={()=> setShowEditUser(false)}>Hide</button> : <button onClick={()=> setShowEditUser(true)}>Edit User Info</button>
		}
		{
			!showEditUser ? null : 
				<section>
					<EditUser baseURL={baseURL} userToken={userToken}/>		
				</section>
		}
		{ 
			showEditBilling ? <button onClick={()=> setShowEditBilling(false)}>Hide</button> : <button onClick={()=> setShowEditBilling(true)}>Edit Billing Info</button>
		}
		{
			!showEditBilling ? null:
			<section>
				<EditUserBilling baseURL={baseURL} userToken={userToken}/>
			</section>
		}
		{
			showNewPassword ? <button onClick={()=> setShowNewPassword(false)}>Hide</button> : <button onClick={()=> setShowNewPassword(true)}>Set New Password</button>
		}
		{
			!showNewPassword ? null : 
			<section>
				<EditPassword baseURL={baseURL} userToken={userToken}/>
			</section>
		}
		<section>
			<h2>My Past Orders</h2>
			stuff...
		</section>
	</div>
}

export default Profile;