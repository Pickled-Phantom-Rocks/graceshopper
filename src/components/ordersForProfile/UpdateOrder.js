import React, { useState, useEffect } from 'react';
import {
    useHistory
} from "react-router-dom";
import { fetchOrderList } from './ordersUtils';

const UpdateOrder = (props) => {

    const handleUpdateOrder = async (event) => {
        event.preventDefault();
        // const data = await API.getAllActivities();
        // const allActivities = await data.json();
        // const duplicateActivity = allActivities.find(activity => name === activity.name)
        // if (duplicateActivity) {
        //     alert('Error, that activity already exists');
        //     return;
        // }
        try {
            // const response = await createNewActivity(name, description);
            // const data = await response.json();
            // setName("");
            // setDescription("");
            // setFormSubmittedSuccessfully(true)
            // history.push("/activities");
        } catch (error) {
            setError(error.message)
        }
    }

    return <form onSubmit={handleUpdateOrder}>
			    <h1>Update Order Status</h1>
    			<div>
                    <label for="Created"><input type="radio" name="Created" value={"Easy"}>Easy</input></label>
                    <input type="radio" name="Processing" value={"Medium"}><label for="Processing">Medium</label></input>
                    <input type="radio" name="Cancelled" value={"Hard"}><label for="Cancelled">Hard</label></input>
                    <input type="radio" name="Completed" value={"Hard"}><label for="Completed">Hard</label></input>
                    <label for="Name"><b>Name</b></label>
                        <input
                            type="text" required
                            name="Name"
                            placeholder="Enter Your Activity Name"
                            value={name}
                            onChange=
                            {(event) => setName(event.target.value)}></input>
                    <label for="description"><b>Description</b></label>
                        <input
                            type="text" required
                            name="description"
                            placeholder="Enter Your Activity Description"
                            value={description}
                            onChange=
                            {(event) => setDescription(event.target.value)}></input>
				</div>
				<button type="submit" >Submit</button>
            </form>
}

export default UpdateOrder;