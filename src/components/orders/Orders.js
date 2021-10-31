import React, { useState, useEffect } from 'react';
import {
    useHistory
} from "react-router-dom";
import { fetchOrderList } from './ordersUtils';

const Orders = ({userId, username, baseURL}) => {
	let history = useHistory();
	const [orders, setOrders] = useState([]);

	async function getOrders () {
		try {
            const orderList = await fetchOrderList(userId, baseURL);
			console.log(orderList);
            setOrders(orderList);
        } catch (error) {
            console.error(error);
        }
	}
	useEffect(getOrders, []);

	if (orders === []) {
		setOrders(null);
	}
	
	return <div id="orders">
				<h1>Orders</h1>
				{orders ? 
					orders.map((order) => (
						<div key={order.id}>
							<h2>Order Number: {order.id}</h2>
							<p>Order Date: {order.orderDate.slice(0, 10)}</p>
							<p>Delivery Date: {order.deliveryDate.slice(0, 10)}</p>
							<p>Total Price: {`$`+ order.totalPrice}</p>
							<br/>
							{order.orderProducts.map((orderProduct) => (
								<div key={orderProduct.productId} style={{ display: "flex", border: "1px solid black", margin: "10px"}}>
									<img src={process.env.PUBLIC_URL + "images/Products/" + orderProduct.photoName + ".jpg"} width="150px" height="100px"/>
									<p>Name of Item: {orderProduct.name}</p>
									<p>Description: {orderProduct.description}</p>
									<p>Price of Item: {`$`+ orderProduct.priceWhenOrdered}</p>
									<p>quantity ordered: {orderProduct.quantityOrdered}</p>
									<br/>
								</div>
							))}
						</div>
					)) : <div>
							<h2>No orders found.</h2>
						</div>

			}
			</div>
}

export default Orders;