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

async function fetchAdminOrders (baseURL) {
	try {
		console.log("fetch Admin ORders");
		const result = await fetch(`${baseURL}/orders/`, {
			method: "GET",
			headers: {
			  'Content-Type': 'application/json',
			}
		  });
		const data = await result.json();
		console.log("ORDERS UTILS ADMIN LIST", data);
		return data;
	} catch (error) {
		console.error(error);
	}
}


export {
	fetchOrderList,
    fetchAdminOrders
};