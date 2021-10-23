import React, { useState, useEffect } from 'react';
import {
    useHistory
} from "react-router-dom";
import { fetchOrderList } from './utils';

const Orders = ({userId, username, baseURL}) => {
	let history = useHistory();
	const [orders, setOrders] = useState([]);

	async function getOrders () {
		try {
            const orderList = await fetchOrderList(username, baseURL);
			console.log(orderList);
            setOrders(orderList);
        } catch (error) {
            console.error(error);
        }
	}
	useEffect(getOrders, []);

	return <div id="orders">
				<h1>Orders</h1>
				{orders ? 
					orders.map((order) => (
						<div key={order.id}>
							<h2>Order Number: {order.id}</h2>
							<h2>Order Date: {order.orderDate}</h2>
							<h2>Delivery Date: {order.deliveryDate}</h2>
							<h2>Total Price: {order.totalPrice}</h2>
						</div>
					)) : <div>
							<h2>No orders found.</h2>
						</div>

			}
			</div>
}

export default Orders;