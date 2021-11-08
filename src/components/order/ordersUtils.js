import React from 'react';

async function fetchAllOrders(baseURL) {
	try {
		const response = await fetch(`${baseURL}/orders`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		})
		.then(res =>  res.json())
		.then((result) => {
			return result;
		})
		.catch( err => console.error(err));
		return response;
	} catch(error) {
		throw error
	}
}

async function fetchOrdersByStatus(baseURL, orderStatus) {
	try {
		const response = await fetch(`${baseURL}/orders/${orderStatus}/status`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		})
		.then(res => res.json())
		.then((result) => {
			return result;
		})
		.catch( err => console.error(err));
		return response;
	} catch(error) {
		throw error
	}
}

async function changeStatus(baseURL, userToken, orderId, newStatus){
	try {
		const orderStatus = newStatus;
		const response = await fetch(`${baseURL}/orders/${orderId}/status`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${userToken}`
			},
			body: JSON.stringify({
				orderStatus
			})
		})
		.then(res => res.json())
		.then((result) => {
			if(result.status){
				alert("Order's status has successfully changed.");
				location.reload();
			}
		})
		.catch(err => console.error(err));
	} catch(error) {
		throw error
	}
}

async function fetchOrdersWithUsers(baseURL) {
	try {
		const response = await fetch(`${baseURL}/orders/users`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		})
		.then(res => res.json())
		.then((result) => {
			return result;
		})
		return response;
	} catch (error) {
		throw error
	}
}

async function fetchOrderList (userId, baseURL) {
	try {
		const result = await fetch(`${baseURL}/orders/${userId}/pastorders`, {
			method: "GET",
			headers: {
			  'Content-Type': 'application/json',
			}
		  });
		const data = await result.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

function mapOrders (order) {
	return <div className="orderListItem" key={order.id}>
	<h3>Order Number: {order.id}</h3>
		<div className="orderListItemInner">
			<div className="orderListItemInfo">
				<p><label>Order Status:</label> {order.orderStatus}</p>
				<p><label>Order Date:</label> {order.orderDate ? order.orderDate.slice(0, 10) : null}</p>
				<p><label>Delivery Date:</label> {order.deliveryDate ? order.deliveryDate.slice(0, 10) : null}</p>
				<p><label>Total Price:</label> {`$`+ order.totalPrice}</p>
			</div>
		</div>
		<div className="orderListProducts">
					{order.orderProducts.map((orderProduct) => (
						<div key={orderProduct.productId} className="orderListItemProductSingle">
							<h4>{orderProduct.name}</h4>
							<div className="orderListProductSingleInner">
								<img src={process.env.PUBLIC_URL + "images/Products/" + orderProduct.photoName + ".jpg"} width="150px" height="100px"/>
								<div className="orderListItemProductInfo">
									<p><label>Description:</label> {orderProduct.description}</p>
									<p><label>Quantity:</label> {orderProduct.quantityOrdered}</p>
									<p><label>Price at Purchase:</label> {`$`+ orderProduct.priceWhenOrdered}</p>
								</div>
							</div>
						</div>
					))}
				</div>
	</div>
}

export {
	fetchAllOrders,
	fetchOrdersByStatus,
	changeStatus,
	fetchOrdersWithUsers,
	fetchOrderList,
	mapOrders
};