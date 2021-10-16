const client = require('./client');

async function createOrder_Product({ orderId, productId, cartProductsId, quantityOrdered, priceWhenOrdered }) {
    try {
		const { rows: [order_product]} = await client.query(`
			INSERT INTO order_products("orderId", "productId", "cartProductsId", "quantityOrdered", "priceWhenOrdered")
			VALUES($1, $2, $3, $4, $5)
			RETURNING *;
		`, [orderId, productId, cartProductsId, quantityOrdered, priceWhenOrdered]);

		return order_product;
    } catch (error) {
        throw error;
    }
}

async function getOrder_ProductById(id) {
	try {
		const { rows: [order_product]} = await client.query(`
			SELECT *
			FROM order_products
			WHERE id=$1;
		`, [id]);

		return order_product;
	} catch(error) {
		throw error;
	}
}

async function getOrder_ProductsByOrderId(orderId) {
    try {
		const { rows: [order_product]} = await client.query(`
			SELECT *
			FROM order_products
			WHERE "orderId"=$1;
		`, [orderId]);

		return order_product;
	} catch(error) {
		throw error;
	}
}

async function updateOrder_Product ({ id, ...fields}) {
        const setString = Object.keys(fields).map(
          (key, index) => `"${ key }"=$${ index + 1 }`
        ).join(', ');
      
        if (setString.length === 0) {
          return;
        }
      
    try {
        const { rows: [ order_product ]} = await client.query(`
            UPDATE order_products
            SET ${ setString }
            WHERE id=${id}
            RETURNING *;
            `, Object.values(fields));
        return order_product;
      
    } catch (error) {
        throw error;
    }
    };

async function deleteOrder_Product (id) {
    try {
		const { rows: [order_product]} = await client.query(`
			DELETE FROM order_products
			WHERE id=$1
			RETURNING *;
		`, [id]);

		return order_product;
	} catch(error) {
		throw error;
	}
}

module.exports = {
    createOrder_Product,
    getOrder_ProductById,
    getOrder_ProductsByOrderId,
    updateOrder_Product,
    deleteOrder_Product
};