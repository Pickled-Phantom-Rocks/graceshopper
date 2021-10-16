const client = require('./client')

async function addProductToCart ({ cartId, productId, productPrice, quantityOfItem }) {
    try {
		const { rows: [cart_product]} = await client.query(`
			INSERT INTO cart_products("cartId", "productId", "productPrice", "quantityOfItem")
			VALUES($1, $2, $3, $4)
			RETURNING *;
		`, [cartId, productId, productPrice, quantityOfItem]);

		return cart_product;
    } catch (error) {
        throw error;
    }
}

async function getCart_ProductById(id) {
	try {
		const { rows: [cart_product]} = await client.query(`
			SELECT *
			FROM cart_products
			WHERE id=$id;
		`, [id]);

		return cart_product;
	} catch(error) {
		throw error;
	}
}

async function getCart_ProductByCartId(cartId) {
    try {
		const { rows: [cart_product]} = await client.query(`
			SELECT *
			FROM cart_products
			WHERE "cartId"=$1;
		`, [cartId]);


		return cart_product;
	} catch(error) {
		throw error;
	}
}

async function updateCart_Product ({ id, ...fields}) {
        const setString = Object.keys(fields).map(
          (key, index) => `"${ key }"=$${ index + 1 }`
        ).join(', ');
      
        if (setString.length === 0) {
          return;
        }
      
        try {
          const { rows: [ cart_product ]} = await client.query(`
            UPDATE cart_products
            SET ${ setString }
            WHERE id=${id}
            RETURNING *;
          `, Object.values(fields));
          return cart_product;
      
        } catch (error) {
          throw error;
        }
      };

async function deleteCart_Product (id) {
    try {
		const { rows: [cart_product]} = await client.query(`
			DELETE FROM cart_products
			WHERE id=$1
			RETURNING *;
		`, [id]);

		return cart_product;
	} catch(error) {
		throw error;
	}
}

async function canEditCart_Product () {
    
}

module.exports = {
    addProductToCart,
    getCart_ProductById,
    getCart_ProductByCartId,
    updateCart_Product,
    deleteCart_Product

};