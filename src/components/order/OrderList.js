import {React, useState, useEffect} from 'react';
import {fetchAllOrders, changeStatus} from '.';

const OrderList = (props) => {
	const {baseURL, userToken} = props;
	const [orders, setOrders] = useState([]);

	async function fetchTheOrders () {
		try {
            const orderList = await fetchAllOrders(baseURL);
            setOrders(orderList);
        } catch (error) {
            console.error(error);
        }
	}
	useEffect(fetchTheOrders, []);

	async function ChangeStatus(orderId, newStatus){
		event.preventDefault();
		changeStatus(baseURL, userToken, orderId, newStatus);
	}

	return <div className="orderList">
		{
			orders.map((order) => {
				const {id: orderId, userId, orderDate, deliveryDate, totalPrice, orderStatus} = order;
				return <div className="orderListItem" key={orderId}>
					<div>
						<label>Order ID: </label>{orderId}<br/>
						<label>UserId: </label> {userId}<br/>
						<label>Order Date: </label>{orderDate.slice(0, 10)}<br/>
						<label>Delivery Date: </label>{!deliveryDate ? "" : deliveryDate.slice(0, 10)}<br/>
						<label>Total: </label> {'$' + totalPrice}<br />
						<label>Status: </label> {orderStatus}<br/>
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

export default OrderList;