import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    const { img, name, seller, price, stock } = props.product;
    return (
        <div className="single-product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                <br />
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock - Hurry!</small></p>
                <button onClick={() => props.handleAddCartProduct(props.product)} className="cart-button"><FontAwesomeIcon icon={faShoppingCart} />Add To Cart</button>

            </div>
        </div>
    );
};

export default Product;

