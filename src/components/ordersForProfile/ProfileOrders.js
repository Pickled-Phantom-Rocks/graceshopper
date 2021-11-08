import React, { useState, useEffect } from 'react';
import { fetchOrderList, mapOrders } from './ordersUtils';

const ProfileOrders = ({userId, baseURL}) => {

	const [ordersCompleted, setOrdersCompleted] = useState([]);
	const [ordersProcessing, setOrdersProcessing] = useState([]);
	const [ordersCancelled, setOrdersCancelled] = useState([]);
	const [ordersCreated, setOrdersCreated] = useState([]);
	const [showCurrentOrders, setShowCurrentOrders] = useState(false);
	const [showPastOrders, setShowPastOrders] = useState(false);

	async function getOrders () {
		try {
            const orderList = await fetchOrderList(userId, baseURL);
			console.log("testing testing", orderList);
			setOrdersCompleted(orderList.filter((order) => order.orderStatus === 'Completed'));
			setOrdersProcessing(orderList.filter((order) => order.orderStatus === 'Processing'));
			setOrdersCancelled(orderList.filter((order) => order.orderStatus === 'Cancelled'));
			setOrdersCreated(orderList.filter((order) => order.orderStatus === 'Created'));
        } catch (error) {
            console.error(error);
        }
	}
	useEffect(getOrders, []);

	return <div id="orders">
		<div className="userOptions">
			{showCurrentOrders ? <button onClick={() => setShowCurrentOrders(false)}>Hide Current Orders</button> : <button onClick={()=> {setShowCurrentOrders(true); setShowPastOrders(false);}}>Show Current Orders</button>}
			{showPastOrders ? <button onClick={() => setShowPastOrders(false)}>Hide Past Orders</button> : <button onClick={() => {setShowPastOrders(true); setShowCurrentOrders(false)}}>Show Post Orders</button>}
		</div>
			{!showCurrentOrders ? null : <div>
				<h2>Orders: Created</h2>
				{ordersCreated ? 
					ordersCreated.map(mapOrders) 
					: <div>
						<h2>No orders found.</h2>
					</div>}
				<h2>Orders: Processing</h2>
				{ordersProcessing ? 
					ordersProcessing.map(mapOrders) 
					: <div>
						<h2>No orders found.</h2>
					</div>}
			</div>}
				{!showPastOrders ? null : <div>
					<h2>Orders: Completed</h2>
				{ordersCompleted ? 
					ordersCompleted.map(mapOrders) 
					: <div>
						<h2>No orders found.</h2>
					</div>}
				<h2>Orders: Cancelled</h2>
				{ordersCancelled ? 
					ordersCancelled.map(mapOrders) 
					: <div>
						<h2>No orders found.</h2>
					</div>}
			</div>}
		</div>
}

export default ProfileOrders;