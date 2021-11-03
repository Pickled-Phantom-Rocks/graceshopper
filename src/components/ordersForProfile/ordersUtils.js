import {React, useEffect, useState} from 'react';


async function fetchOrderList (userId, baseURL) {
	try {
		console.log("fetch Order List is running", userId);
		const result = await fetch(`${baseURL}/orders/${userId}/pastorders`, {
			method: "GET",
			headers: {
			  'Content-Type': 'application/json',
			}
		  });
		const data = await result.json();
		console.log("FROM UTILS:", data);
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
	fetchOrderList,
	mapOrders
};