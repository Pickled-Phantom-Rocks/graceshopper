import {React, useState, useEffect} from 'react';
import {fetchAllOrders, changeStatus} from '.';

const OrderList = (props) => {
	const {baseURL, userToken} = props;
	const [orders, setOrders] = useState([]);
	const [newStatus, setNewStatus] = useState('');

	async function fetchTheOrders () {
		try {
            const orderList = await fetchAllOrders(baseURL);
            setOrders(orderList);
        } catch (error) {
            console.error(error);
        }
	}
	useEffect(fetchTheOrders, []);

	return <div className="orderList">
		{
			orders.map((order) => {
				const {id, userId, orderDate, deliveryDate, totalPrice, orderStatus} = order;
				return <div className="orderListItem" key={id}>
					<div>
						<label>Order ID: </label>{id}<br/>
						<label>UserId: </label> {userId}<br/>
						<label>Order Date: </label>{orderDate.slice(0, 10)}<br/>
						<label>Delivery Date: </label>{!deliveryDate ? "" : deliveryDate.slice(0, 10)}<br/>
						<label>Total: </label> {'$' + totalPrice}<br />
						<label>Status: </label> {orderStatus}<br/>
					</div>
					<div className="right">		
						<label>Change Status:</label><br/>
						<button>Created</button><br/>
						<button>Processing</button><br/>
						<button>Cancelled</button><br/>
						<button>Completed</button><br/>
					</div>
				</div>
			})
		}
	</div>
}

export default OrderList;