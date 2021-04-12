import React, { useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/products?search='+search)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [search])


    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('http://localhost:5000/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data))

    }, [])

    

    const handleAddCartProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            const count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }


        setCart(newCart);
        addToDatabaseCart(product.key, count);

    }

    const handleSearch = event =>{
        setSearch(event.target.value);
    }



    return (
        <div className="twin-container">
            <div className="product-container">
                <input onBlur={handleSearch} type="text" className="product-search" placeholder="Search"/>

                {
                    products.map(product => <Product showAddToCart={true} handleAddCartProduct={handleAddCartProduct} key={product.key} product={product}></Product>)
                }

            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="cart-button">Review Order</button>
                    </Link>
                </Cart>
            </div>



        </div>
    );
};

export default Shop;

