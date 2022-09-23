/*
import React, { useEffect, useState } from 'react';

const Shop = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);


    return (
        <div>
            <h1>This is Shop</h1>
            
            <ul>    
                {
                    products.map(product => 
                        <li>
                            {product.name}
                        </li>
                    )
                }
            </ul>
            
           
        </div>
    );
};

export default Shop;
*/

import fakeData from '../../fakeData';
import React, { useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


const Shop = () => {
    const first10 = fakeData.slice(0, 10);

    // eslint-disable-next-line
    const [products, setProducts] = useState(first10);

    const [cart, setCart] = useState([]);

    /**
         * Order Review te gele add kora product gulo localStores theke load kortechi, tai sekhane show kortese
         * but aikhane localStores theke Load kora hoyni bidhay reload korle sob chole jay
         * akhon seta add korbo
         * productKeys gulo dhore fakeData theke matching kore product gulo niye ashbo
         */
    useEffect(() => {
        const savedCart = getDatabaseCart();
        //console.log(savedCart);
        const productKeys = Object.keys(savedCart);
        //console.log(productKeys);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            // console.log(existingKey);
            product.quantity = savedCart[existingKey]
            // console.log(savedCart[existingKey]);
            return product;
        })
        //console.log(previousCart);
        setCart(previousCart);
    }, [])







    const handleAddProduct = (product) => {
        // console.log("Product added", product);

        // modify code
        /* amra age 1ta product bar bar add korci,
        but akhon seta korbona
        akhon sudhu quantity gulo barabo,
        mane, 2nd time add korte chaile tar quantity 1, 1 kore barabo.

        */
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;

            // ai product ta bade baki product gulo
            // cart a add korbo, then jetar 1 baralam seta add kore dibo
            const others = cart.filter(pd => pd.key !== toBeAddedKey);

            // filter korle 1ta array pawa jay
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }

        // ...cart hocche ager cart a ja ase seta add korbo+ naw jeta ase oita set cart a add krbo
        // const newCart = [...cart, product];
        setCart(newCart);


        /*Jkhn review.js a quantity add krlm, tokhon shop.js a quantity ta payni.
        amra setCart(newCart) a quantity jog na korei 
        newCart ta Cart component a pathiye dicilm,
        tai age Cart component a 'const newCart er cart' a quantity ta add kore then Cart component a pathabo, tai nicher code gulo modify kore upore lekha holo 
        
        shop er information gulo localStorage a pathabo, jeno seta cart a pete pari, ata redux diye kora jay
        const sameProduct = newCart.filter(pd => pd.key === product.key);
        const count = sameProduct.length; */



        /**
         * OverAll same kaj e kortechilam but quantity add korchilam na
         * tai akhon age product ta k khuje nicchi
         * seta theke amra quantity portechi
         * set quantity amra sameProduct.quantity = count; a set kortechi
         * tarpor oita chara bakigulo k cart a copy kortechi
         * tarpor seta k amra newCart = [...others, sameProduct]; a bosiye dicchi
         * 
         * let count = 1; 'jodi quantity na thake tobe initial 1 hobe' 
         * r jodi beri hoy tobe bariye nicchi 'sameProduct.quantity = count;'
         * 
         * setCart(newCart) ata 2-jaygay, 2-condition a set korchi
         */

        addToDatabaseCart(product.key, count);
    }

    return (
        <div className="twin-container">
            <div className="product-container">


                {/* ProductDetail components a Add to cart button ta dekhabo na,
                but shop.js a dekhabo.
                er jnne ProductDetail a value false,
                r aikhane value true */}
                {
                    products.map(pd => <Product
                        key={pd.key}
                        showAddToCart={true}
                        handleAddProduct={handleAddProduct}
                        product={pd}></Product>)
                }

            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to='/review'>
                        <button className='main-button'>Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;