import {React, useState, useEffect} from 'react';
import {fetchAllOrders, changeStatus} from '.';

const OrderList = (props) => {
	const {baseURL, userToken} = props;
	const [orders, setOrders] = useState('')

	async function fetchTheOrders() {
		try {
			const results = await fetchAllOrders(baseURL);
			setOrders(results);
		} catch (error) {
			throw error
		}
	}
	useEffect(() => {
		fetchTheOrders();
	}, []);

	return <div className="orderList">
		{/* {
			orders.map((order) => {
				const {id, userId, orderDate, deliveryDate, totalPrice} = order;
				return <div className="orderListItem" key={id}>
					{userId}
				</div>
			})
		} */}
		<div className="orderListItem" key="1">
			<div>
				<label>Order ID: </label>0<br/>
				<label>Username: </label> Gobta<br/>
				<label>Order Date: </label>1/1/1111<br/>
				<label>Delivery Date: </label>2/2/2222<br/>
				<label>Total: </label> $4<br />
				<label>Status: </label> Complete<br/>
			</div>
			<div className="right">		
				<label>Change Status:</label><br/>
				<button>Created</button><br/>
				<button>Processing</button><br/>
				<button>Cancelled</button><br/>
				<button>Completed</button><br/>
			</div>
		</div>
	</div>
}

export default OrderList;