//const usersBaseUrl = 'http://localhost:3134/api/users'
const cartsBaseUrl = 'http://localhost:3134/api/carts'

const username = localStorage.getItem('username')

// export async function getUserByUsername(username) {
//     try {
//         const result = await fetch(`${usersBaseUrl}/${username}`)

//         const user = result.json()

//         return user

//     } catch (error) {
//         throw error
//     }
// }

export async function getCartByUserId(userId) {

    try {

        const result = await fetch(`${cartsBaseUrl}/${userId}`)

        const cart = await result.json()

        return cart

    } catch (error) {
        console.log("Error in the cartUtil")
        throw error
    }

}