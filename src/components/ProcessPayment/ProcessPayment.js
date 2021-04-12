import React from 'react';
import { CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
import SplictCardForm from './SplictCardForm';

const stripePromise = loadStripe('pk_test_51IfRFMCDHzoU1X18BxenH7lO3sF7M5ZjiJPzLWoTwsN5I3KrHzf8aG30CXL2TrBGOjaNvLrxKFYjFqEzNLh8NAmI00Cp3JhFMn');


const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>

            <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
        </Elements>
    );
};

export default ProcessPayment;