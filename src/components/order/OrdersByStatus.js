import {React, useState, useEffect} from 'react';
import { fetchOrdersByStatus, changeStatus } from '.';

const OrdersByStatus = (props) => {
	const {baseURL, orderListStatus, userToken } = props;
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

	async function ChangeStatus(orderId, newStatus){
		try {
		event.preventDefault();
		await changeStatus(baseURL, userToken, orderId, newStatus);
		} catch (error) {
			console.error(error);
		}
	}

	return <div className="orderList">
		<h3>{orderListStatus} Orders</h3>
		{
			orders.map((order) => {
				const {id: orderId } = order;
				return <div className="orderListItem" key={orderId}>
					<div>
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
					<div className="right">		
						<label>Change Status:</label><br/>
						<button onClick={()=>{
							ChangeStatus(orderId, 'Created');
						}}>Created</button><br/>
						<button onClick={()=>{
							ChangeStatus(orderId, 'Processing');
						}}>Processing</button><br/>
						<button onClick={()=>{
							ChangeStatus(orderId, 'Cancelled');
						}}>Cancelled</button><br/>
						<button onClick={()=>{
							ChangeStatus(orderId, 'Completed');
						}}>Completed</button><br/>
					</div>
				</div>
			})
		}
	</div>
}

export default OrdersByStatus