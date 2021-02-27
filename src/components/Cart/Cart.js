import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price;
    }

    let shippingCost = 0.00;
    if(total > 35){
        shippingCost = 0
    }else if(total > 15){
        shippingCost = 4.99;
    }else if(total > 0){
        shippingCost = 12.99;
    }
    const formatNumber = num => Number(num.toFixed(2));

    const tax = formatNumber(total/10);

    const GrandTotal = formatNumber(total + shippingCost + tax);

    
    return (
        <div>
            <h5>Order Summery: </h5>
            <p>Total Item Ordered: {cart.length}</p>
            <p>Total Item Price: {formatNumber(total)}</p>
            <p>Shipping Charge: $ {shippingCost}</p>
            <p><small>Govt. Tax: {tax}</small></p>
            <p>Total Price: {GrandTotal}</p>
        </div>
    );
};



export default Cart;