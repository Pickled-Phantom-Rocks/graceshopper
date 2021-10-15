const client = require('./client')

async function createCarts({userId, age, isActive}) {

    try {

        const { rows: [ carts ] } = await client.query(`
            INSERT INTO carts("userId", age, "isActive")
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [userId, age, isActive])

        return carts

    } catch (error) {

    }

}


module.exports = {
    createCarts
}