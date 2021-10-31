import {React, useState, useEffect} from 'react';
import { fetchOrdersByStatus, changeStatus } from '.';

const OrdersByStatus = (props) => {
	const {baseURL, userToken, orderListStatus} = props;
	const [orders, setOrders] = useState([]);

	async function fetchTheOrders () {
		try {
            const orderList = await fetchOrdersByStatus(baseURL, orderListStatus);
            setOrders(orderList);
        } catch (error) {
            console.error(error);
        }
	}
	useEffect(fetchTheOrders, []);

	return <div className="orderList">
		<h3>{orderListStatus} Orders</h3>
		{
			orders.map((order) => {
				const {id: orderId, userId, orderDate, deliveryDate, totalPrice, orderStatus} = order;
				return {orderId};
			})
		}
	</div>
}

export default OrdersByStatus