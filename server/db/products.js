const client = require('./client')

async function createProducts({name, description, quantityAvailable, price, photoName}) {

    try {

        const { rows: [ products ] } = await client.query(`
            INSERT INTO products(name, description, "quantityAvailable", price, "photoName")
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
        `, [name, description, quantityAvailable, price, photoName])

        return products

    } catch (error) {
        throw error
    }

}

async function getAllProducts() {

    try {

        const { rows: [ products ] } = await client.query(`
            SELECT *
            FROM products;
        `)

        console.log("GetAllProducts: ", products)
        return products

    } catch (error) {
        throw error
    }

}

async function getProductById({productId}) {

    try {

        const { rows: product } = await client.query(`
            SELECT *
            FROM products
            WHERE products.id=$1;
        `, [productId])

        console.log("GetProductById: ", product, "productID that was passed in: ", productId)
        return product

    } catch (error) {
        throw error
    }

}


module.exports = {
    createProducts,
    getAllProducts,
    getProductById
}