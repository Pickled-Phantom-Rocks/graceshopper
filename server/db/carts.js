const client = require('./client')

async function createCarts({name, description, quantityAvailable, price, photoName}) {

    try {

        const { rows: [ products ] } = await client.query(`
            INSERT INTO products(name, description, "quantityAvailable", price, "photoName")
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
        `, [name, description, quantityAvailable, price, photoName])

        console.log(products)
        return products

    } catch (error) {

    }

}


module.exports = {
    createCarts
}