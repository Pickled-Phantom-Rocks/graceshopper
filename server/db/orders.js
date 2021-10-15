const client = require('./client');

async function createOrder({
    userId,
    orderDate,
    deliveryDate,
    totalPrice
}) {
    try {
        const { rows: [order] } = await client.query(`
            INSERT INTO orders( "userId", "orderDate", "deliveryDate", "totalPrice") 
            VALUES($1, $2, $3) 
            ON CONFLICT (email) DO NOTHING
            ON CONFLICT (name) DO NOTHING 
            RETURNING id, email, password, name, address, "billingInfo";
      `, [orderDate]);

        return user;
    } catch (error) {
        throw error;
    }
}

async function getOrderByUserId({
    email,
    password,
}) {
    if(!email || !password){
        return;
    }
    try {
     const user = await getUserByEmail(email);
     
     if(password === user.password){
         delete user.password
         return user
     }else{
         return;
     }
    } catch (error) {
        throw error;
    }
}

async function getOrderById(userId) {
    try {
        const { rows: [user] } = await client.query(`
            SELECT id
            FROM users
            WHERE id = ${userId}
      `);

        if (!user) {
            return null
        }

        return user;
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
        const { rows: [routine] } = await client.query(`
            UPDATE routines
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields));
        return routine;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    createOrder,
    getOrderByUserId,
    getOrderById,
    updateOrder,


}