import React, { useState, useEffect } from 'react';
import { fetchOrderList, mapOrders } from './ordersUtils';

const ProfileOrders = ({userId, baseURL}) => {

	const [ordersCompleted, setOrdersCompleted] = useState([]);
	const [ordersProcessing, setOrdersProcessing] = useState([]);
	const [ordersCancelled, setOrdersCancelled] = useState([]);
	const [ordersCreated, setOrdersCreated] = useState([]);
	const [showCompleted, setShowCompleted] = useState(false);
	const [showCancelled, setShowCancelled] = useState(false);
	const [showProcessing, setShowProcessing] = useState(false);
	const [showCreated, setShowCreated] = useState(false);

	async function getOrders () {
		try {
            const orderList = await fetchOrderList(userId, baseURL);
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
		<h2>Orders</h2>
		<div className="userOptions">
			{showCreated ? <button onClick={() => {
				setShowCompleted(false);
				setShowCancelled(false);
				setShowProcessing(false);
				setShowCreated(false);
			}}>Hide Created</button> : <button onClick={() => {
				setShowCompleted(false);
				setShowCancelled(false);
				setShowProcessing(false);
				setShowCreated(true);
			}}>Created</button>}
			{showProcessing ? <button onClick={() => {
				setShowCompleted(false);
				setShowCancelled(false);
				setShowProcessing(false);
				setShowCreated(false);
			}}>Hide Processing</button> : <button onClick={() => {
				setShowCompleted(false);
				setShowCancelled(false);
				setShowProcessing(true);
				setShowCreated(false);
			}}>Processing</button>}
			{showCancelled ? <button onClick={() => {
				setShowCompleted(false);
				setShowCancelled(false);
				setShowProcessing(false);
				setShowCreated(false);
			}}>Hide Cancelled</button> : <button onClick={() => {
				setShowCompleted(false);
				setShowCancelled(true);
				setShowProcessing(false);
				setShowCreated(false);
			}}>Cancelled</button>}
			{showCompleted ? <button onClick={() => {
				setShowCompleted(false);
				setShowCancelled(false);
				setShowProcessing(false);
				setShowCreated(false);
			}}>Hide Completed</button> : <button onClick={() => {
				setShowCompleted(true);
				setShowCancelled(false);
				setShowProcessing(false);
				setShowCreated(false);
			}}>Completed</button>}
		</div>
		{!showCreated ? null : 
			<div>
				<h2>Created</h2>
				{ordersCreated.map(mapOrders)}
			</div>
		}
		{!showProcessing ? null : 
			<div>
				<h2>Processing</h2>
				{ordersProcessing.map(mapOrders)}
			</div>
		}
		{!showCompleted ? null : 
			<div>
				<h2>Completed</h2>
				{ordersCompleted.map(mapOrders)}
			</div>
		}
		{!showCancelled ? null : 
			<div>
				<h2>Cancelled</h2>
				{ordersCancelled.map(mapOrders)}
			</div>
		}
	</div>
}

export default ProfileOrders;