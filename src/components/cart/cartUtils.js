//const usersBaseUrl = 'http://localhost:3134/api/users'
//const cartsBaseUrl = 'http://localhost:3139/api/carts'


// export async function getUserByUsername(username) {
//     try {
//         const result = await fetch(`${usersBaseUrl}/${username}`)

//         const user = result.json()

//         return user

//     } catch (error) {
//         throw error
//     }
// }

export async function getCartByUserId(userId, baseURL) {

    try {

        //console.log("userIdPassed into utils", userId)
        const result = await fetch(`${baseURL}/carts/${userId}`)
        //console.log("RESULT CART UTIL", result)

        const data = await result.json()
        //console.log("CART from CARUTIL ", data)

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

export async function addProductToCart() {
    try {

    } catch (error) {
        throw error
    }
}