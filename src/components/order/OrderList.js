import {React, useState, useEffect} from 'react';
import {changeStatus, fetchOrdersWithUsers} from '.';
import { fetchUser } from './ordersUtils';

const OrderList = (props) => {
	const {baseURL, userToken} = props;
	const [orders, setOrders] = useState([]);

	async function fetchTheOrders () {
		try {
			const orderList = await fetchOrdersWithUsers(baseURL);
			console.log(orderList);
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
		{
			orders.map((order) => {
				const {id: orderId } = order;
				return <div className="orderListItem" key={orderId}>
					<h3>Order Number: {order.id}</h3>
					<div className="orderListItemInner">
						<div className="orderListItemInfo">
                            <p><label>Order Status:</label> {order.orderStatus}</p>
							<p><label>Order Date:</label> {order.orderDate ? order.orderDate.slice(0, 10) : null}</p>
							<p><label>Delivery Date:</label> {order.deliveryDate ? order.deliveryDate.slice(0, 10) : null}</p>
							<p><label>Total Price:</label> {`$`+ order.totalPrice}</p>
							<p><label>Name:</label> {order.owner.name}</p>
							<p><label>Address:</label> {order.owner.address}</p>
							<p><label>City:</label> {order.owner.city}</p>
							<p><label>State:</label> {order.owner.state}</p>
							<p><label>Email:</label> {order.owner.email}</p>
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
				<div className="orderListItemProducts">
					{order.orderProducts.map((orderProduct) => (
						<div key={orderProduct.productId} className="orderListItemProductSingle">
							<h4>{orderProduct.name}</h4>
							<p><label>Quantity:</label> {orderProduct.quantityOrdered}</p>
							<p><label>Price:</label> {`$`+ orderProduct.priceWhenOrdered}</p>
						</div>
					))}
				</div>
			</div>})
		}
	</div>
}


export default OrderList;