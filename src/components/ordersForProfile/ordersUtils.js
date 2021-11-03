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
	return <div key={order.id}>
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
}

export {
	fetchOrderList,
	mapOrders
};