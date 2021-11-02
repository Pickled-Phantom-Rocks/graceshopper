import React, { useState, useEffect } from 'react';
import {
    useHistory
} from "react-router-dom";
import { fetchAdminOrders } from './ordersUtils';

const AdminOrderList = (props) => {
    const {baseURL} = props;
    let history = useHistory();
	const [orders, setOrders] = useState(false);

	async function getAdminOrders () {
		try {
            const orderList = await fetchAdminOrders(baseURL);
			console.log(orderList);
            setOrders(orderList);
        } catch (error) {
            console.error(error);
        }
	}
	useEffect(getAdminOrders, []);
	
	return <div id="adminOrders">
				{orders ? 
					orders.map((order) => (
						<div key={order.id}>
							<h2>Order Number: {order.id}</h2>
                            <p>Order Status: {order.orderStatus}</p>
							<p>Order Date: {order.orderDate ? order.orderDate.slice(0, 10) : null}</p>
							<p>Delivery Date: {order.deliveryDate ? order.deliveryDate.slice(0, 10) : null}</p>
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

export default AdminOrderList;