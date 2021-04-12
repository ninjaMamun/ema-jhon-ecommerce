import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css'

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [shippingData, setShippingData] = useState(null);
    const onSubmit = data => {
        setShippingData(data);

    }

    const handlePaymentSuccess = paymentId =>{
        const savedCart = getDatabaseCart();
        const orderDetails = { ...loggedInUser, products: savedCart, shipment: shippingData, orderTime: new Date(), paymentId }

        fetch('http://localhost:5000/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    processOrder();
                    alert('order placed successfully')
                }
            })
    }
 
    console.log(watch("example")); // watch input value by passing the name of it

    return (

        <div className="row">
            <div style={{display: shippingData ? 'none' : 'block'}} className="col-md-6">

                < form className="ship-form" onSubmit={handleSubmit(onSubmit)} >

                    < input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
                    {errors.name && <span className="error">Name is required</span>}

                    < input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your email" />
                    {errors.email && <span className="error">Email is required</span>}

                    < input name="address" ref={register({ required: true })} placeholder="Your address" />
                    {errors.address && <span className="error">address is required</span>}

                    < input name="phone" ref={register({ required: true })} placeholder="Your phone number" />
                    {errors.phone && <span className="error">Phone number is required</span>}

                    <input type="submit" />
                </form >

            </div>
            <div style={{display: shippingData ? 'block' : 'none'}}  className="col-md-6 mt-4 p-4">
                <h4>Please Pay</h4>
                <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>

            </div>
        </div>
    );
};

export default Shipment;