export async function getCartByUserId(userId, baseURL) {

    try {
        const result = await fetch(`${baseURL}/carts/${userId}`)
        const data = await result.json()
        return data

    } catch (error) {
        console.log("Error in the cartUtil")
        throw error
    }

}

export async function createCartForUser(userId, baseURL) {
    try {
        const result = await fetch(`${baseURL}/carts/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await result.json()
        return data
    } catch (error) {
        throw error
    }
}

export async function addToUsersCart(cartId, productId, productPrice, quantityOfItem, baseUrl) {
    try {
        const result = await fetch(`${baseUrl}/cart-products/${cartId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productId, productPrice, quantityOfItem
            })
        })
        const data = await result.json()
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function updateItemQuantityAvailable(userToken, productId, quantityAvailable, baseUrl) {
    try {
        const fields = {}
        if (quantityAvailable) {
            fields.quantity = quantityAvailable
        }
        const result = await fetch (`${baseUrl}/products/${productId}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify({
                fields
            })
        })
        const data = await result.json()
        return data
    } catch (error) {
        throw error
    }
}

export async function getAllCartProductsByCartId(cartId, baseUrl) {
    try {
        const result = await fetch(`${baseUrl}/cart-products/${cartId}`)
        const data = await result.json()
        return data
    } catch (error) {
        throw error
    }
}

export async function deleteProductFromCartByProductId(ProductId, baseUrl) {
    try {
        const result = await fetch(`${baseUrl}/cart-products/${ProductId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await result.json()
        return data
    } catch (error) {
        throw error
    }
}

export async function convertToOrder(baseURL, userId, userToken, orderDate, totalCartPrice, productList){
    try {
        const orderStatus = 'Created';
        const totalPrice = totalCartPrice;
        const cart = {orderDate, totalPrice, orderStatus};
        const result = await fetch(`${baseURL}/orders/${userId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify(cart)
        })
        .then(res => res.json())
        .then((result) => {
            const orderId = result.id;
            productList.map(async (prod) => {
                const {description, id: productId, name, photoName, productPrice: priceWhenOrdered, quantityOfItem: quantityOrdered} = prod;
                const sent = {orderId, productId, quantityOrdered, priceWhenOrdered, name, description, photoName};
                const prodResult = await fetch(`${baseURL}/order_products/`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${userToken}`
                    },
                    body: JSON.stringify(sent)
                })
                .then(res => res.json())
                .then((result) => {
                    if(result.status == 204){
                        deleteProductFromCartByProductId(productId, baseURL);
                        alert("Your order was successfully created.");
                        return true;
                    } else {
                        alert("Something went wrong. Please try again.");
                    }
                })
                .catch(err => console.error(err))
            })
        })
        return result;
    } catch(error){
        throw error
    }


}