const client = require('./client');
const { getUserById } = require('./users');

async function createOrder({
    userId,
    orderDate,
    deliveryDate,
    totalPrice
}) {
    try {
        const { rows: [order] } = await client.query(`
            INSERT INTO orders( "userId", "orderDate", "deliveryDate", "totalPrice") 
            VALUES($1, $2, $3, $4) 
            RETURNING id, "userId", "orderDate", "deliveryDate", "totalPrice";
      `, [userId, orderDate, deliveryDate, totalPrice]);
        console.log("CREATE ORDER:", order);
        return order;
    } catch (error) {
        throw error;
    }
}

async function getOrderById(orderId) {
    try {
        const { rows: [order] } = await client.query(`
            SELECT *
            FROM orders
            WHERE id = ${orderId};
      `);

        if (!order) {
            return null
        }
        console.log("GetOrderByID:", order);
        return order;
    } catch (error) {
        throw error;
    }
};

async function updateOrder({ id, ...fields }) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');

    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [order] } = await client.query(`
            UPDATE orders
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields));
        console.log("UPDATE Order:", order);
        return order;

    } catch (error) {
        throw error;
    }
}

async function deleteOrder (orderId) {
    try {
        await client.query(`
            DELETE FROM order_products
            WHERE "orderId"=$1
        `, [orderId]);

        const { rows: [orderToDelete]} = await client.query(`
            DELETE FROM orders
            WHERE id=$1
            RETURNING *;
        `, [orderId]);


        return orderToDelete;
    } catch (e) {
        throw e;
    }
}

async function getOrdersByUserId( userId ) {
    if(!userId){
        return;
    }
    try {
        const { rows: orders } = await client.query( `
            SELECT *
            FROM orders
            WHERE "userId" = ${userId};
        `);
        console.log("GetOrderByUserID:", orders);
        return orders;
    } catch (error) {
        throw error;
    }
}

async function getAllOrders() {
    try {
    const { rows: orders } = await client.query(`
        SELECT *
        FROM orders;
     `) 
    for (const order of orders) {
        const { rows: orderProducts } = await client.query(`
            SELECT *
            FROM order_products
            JOIN orders ON order_products."orderId" = orders.id
            WHERE orders.id = $1;
        `, [order.id]);
            order.orderProducts = orderProducts;
        }

        return orders;
    } catch (error) {
        throw error;
    }
}


async function getAllOrdersByUserId( userId ) {
    try {
    const { rows: orders } = await client.query(`
        SELECT orders.id, orders."orderDate", orders."deliveryDate", orders."totalPrice"
        FROM orders
        JOIN users
        ON orders."userId"=users.id
        WHERE "userId"=$1;
     `, [userId]); 

    for (const order of orders) {
        const { rows: orderProducts } = await client.query(`
            SELECT *
            FROM order_products
            JOIN orders ON order_products."orderId" = orders.id
            WHERE orders.id = $1;
        `, [order.id]);
            order.orderProducts = orderProducts;
        }
        return orders;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createOrder,
    getOrdersByUserId,
    getOrderById,
    updateOrder,
    deleteOrder,
    getAllOrders,
    getAllOrdersByUserId
}