import {React, useState, useEffect} from 'react';

const OrdersByStatus = (props) => {
	const {baseURL, userToken, orderListStatus} = props;

	//map through orders and use same look as OrderList

	return <div className="orderList">
		<h3>{orderListStatus} Orders</h3>
		
	</div>
}

export default OrdersByStatus