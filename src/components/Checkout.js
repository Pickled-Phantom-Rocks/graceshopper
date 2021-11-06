import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import {EditUser, EditUserBilling } from './users';


export default function Checkout(props) {
    const { userId, baseURL, userToken, productList, totalCartPrice } = props

    const [userData, setUserData] = useState({})
    const [confirmAddress, setConfirmAddress] = useState(false)
    const [confirmBilling, setConfirmBilling] = useState(false)
    const [secCodeInput, setSecCodeInput] = useState("")
    const [error, setError] = useState("")
    const [showEditAddress, setShowEditAddress] = useState(false)
    const [showEditBilling, setShowEditBilling] = useState(false)

    async function getCurrentUserById(Id) {

        const userObject = await fetch(`${baseURL}/users/${Id}`)

        const data = await userObject.json()

        console.log(data)
        setUserData(data)

    }

    useEffect(() => {
        getCurrentUserById(userId)
    }, [])
    console.log("productList in checkout", productList)

    function renderMailAddress(userObj) {
        //shows the address if it is available
        const {address, city, name, state} = userObj

        return (
            <div>
                <div>
                    <h4>Mailing Address</h4>
                    <p>Name: {name}</p>
                    <p>Address: {address}, {city}, {state}</p>
                </div>

                <div>
                    <label style={{marginRight: "0.5em"}}>Confirm mailing address?</label>
                    <input onClick={() => setConfirmAddress(!confirmAddress)} type="checkbox" />
                    <button style={{marginLeft: "2em"}} onClick={() => setShowEditAddress(!showEditAddress)}>Edit Address Information</button>
                </div>

                <div>
                    {showEditAddress ? <EditUser baseURL={baseURL} userToken={userToken} userId={userId} /> : null}
                </div>
            </div>
        )
    }

    async function handlePayNow() {
        //IF address and payment is confirmed, then...
        //create an order for user with the products inside the cart set to processing

        if (!confirmAddress) {
            setError("Please confirm your mailing address!")
            return
        }

        if (secCodeInput === "") {
            setError("Please enter the 3 digit security code for your card!")
            return
        }

        if (secCodeInput !== userData.billingInfo.slice(21, 24)) {
            setError("Incorrect security code, Please try again!")
            return
        }

        if (!confirmBilling) {
            setError("Please confirm your billing information!")
            return
        }

        setError("")


        //this is where the order will be created
        //reference "productList" for list of products in cart

        
    
    }

    function renderBillingInfo(userObj) {
        //shows billing info (credit card/3 digit security code) if available
        const {billingInfo, email} = userObj

        let secureCard = billingInfo
        if (billingInfo) {
            secureCard = billingInfo.slice(15, 19)
        }
        
        return (
            <div>
                <div>
                    <h3>Billing Information</h3>
                    <h5 style={{color: "red"}}>{error}</h5>
                    <p>Card Number: ****-****-****-{secureCard}</p>
                    <p>Security Code: <input type="password" maxLength="3" onChange={e => setSecCodeInput(e.target.value)}/></p>
                </div>
            {/* {secCodeInput} */}

                <div>
                    <label style={{marginRight: "0.5em"}}>Confirm billing information?</label>
                    <input onClick={() => setConfirmBilling(!confirmBilling)} type="checkbox" />
                </div>

                <div style={{display: "flex"}}>
                    <button onClick={handlePayNow}>Pay Now</button>
                    <button style={{marginLeft: "2em"}} onClick={() => setShowEditBilling(!showEditBilling)}>Edit Billing Info</button>
                </div>

                <div>
                    {showEditBilling ? <EditUserBilling baseURL={baseURL} userToken={userToken} userId={userId} /> : null}
                </div>
            </div>
        )
    }


    function renderAddressRequest() {
        //IF no address available...
        //renders a form to add an address to the account

        return (
            <div>

                <h1>Please enter your mailing address!</h1>

                <EditUser baseURL={baseURL} userToken={userToken} userId={userId} />

            </div>
        )

    }


    function renderBillingRequest() {
        //IF no billing info available...
        //renders a form to add payment info to the account

        return (
            <div>
                <h1>Please enter your billing information!</h1>

                <EditUserBilling baseURL={baseURL} userToken={userToken} userId={userId} />
            </div>
        )

    }

    console.log("Total cart price in checkout: ", totalCartPrice)

    return (
        <>
        
        <div>
            <h1>Total Price: {`$${totalCartPrice}`}</h1>
        </div>

        <div>
            <Link to="/cart"><button>Back to your cart</button></Link>
        </div>

        {userData.address && userData.city && userData.state ? renderMailAddress(userData) : renderAddressRequest()}
        {userData.billingInfo ? renderBillingInfo(userData) : renderBillingRequest()}



        </>
    )
}
