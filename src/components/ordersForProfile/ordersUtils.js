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

export {
	fetchOrderList
};