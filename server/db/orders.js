const client = require('./client');
const { getUserById } = require('./index');

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

        return order;
    } catch (error) {
        throw error;
    }
}

async function getOrderByUserId({ userId }) {
    if(!userId){
        return;
    }
    try {
        const order = await getUserById(userId);
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
            WHERE id = ${orderId}
      `);

        if (!order) {
            return null
        }

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
        return order;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    createOrder,
    getOrderByUserId,
    getOrderById,
    updateOrder
}