import {React, useState} from 'react';
import {EditUser, EditUserBilling, EditPassword} from './';
import { ProfileOrders } from '../ordersForProfile';

const Profile = (props) => {
	const {baseURL, username, userToken, userId } = props;
	const [showEditUser, setShowEditUser] = useState(false)
	const [showEditBilling, setShowEditBilling] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);


	return <div id="profile">
		<h1>Hello, {username}!</h1>
		<section className="userOptions">
			{showEditUser ? <button onClick={()=> setShowEditUser(false)}>Hide Edit Info</button> : <button onClick={()=> {
				setShowEditUser(true);
				setShowNewPassword(false);
				setShowEditBilling(false);
			}}>Edit Info</button>}
			{showEditBilling ? <button onClick={()=> setShowEditBilling(false)}>Hide Edit Billing Info</button> : <button onClick={()=> {
				setShowEditBilling(true);
				setShowEditUser(false);
				setShowNewPassword(false);
			}}>Edit Billing Info</button>}
			{showNewPassword ? <button onClick={()=> setShowNewPassword(false)}>Hide Set Password</button> : <button onClick={()=> {
				setShowNewPassword(true);
				setShowEditBilling(false);
				setShowEditUser(false);
			}}>Set New Password</button>}
		</section>
		{!showEditUser ? null : <EditUser baseURL={baseURL} userToken={userToken} userId={userId}/>	}
		{!showEditBilling ? null: <EditUserBilling baseURL={baseURL} userToken={userToken} userId={userId} userId={userId}/>}
		{!showNewPassword ? null : <EditPassword baseURL={baseURL} userToken={userToken} userId={userId}/>}
		<section>
			<ProfileOrders baseURL={baseURL} userId={userId}/>
		</section>
	</div>
}

export default Profile;