import React from 'react';
import './Review.css'
import { useEffect } from 'react';
import { useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif'
// import styles from './Review'

const Review = () => {

    // database er information load korbo
    const [cart, setCart] = useState([]);

    // giphy .gif er clickHandler, first a aitar value false hbe, coz, jodi cart empty hoy tobe ai state kaj korbe
    const [orderPlaced, setOrderPlaced] = useState(false);

    //place order button
    const handlePlaceOrder = () => {
        /** order place button a click korle 2ta kaj hbe
         * cart a ja ase sob clear hye jabe & thankyou .gif ta show hbe
        */


        // cart empty hye jabe
        setCart([]);
        // jodi cart empty hoy tobe ai state kaj korbe
        setOrderPlaced(true);
        // data base er order reset korar jnno call kora hoyeche
        processOrder();

    }



    //remove product
    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }




    useEffect(() => {
        //cart er vitore data gulo rakhbo
        const savedCart = getDatabaseCart();
        // console.log(savedCart); jegulo click korci tarder full object

        const productKeys = Object.keys(savedCart);
        // console.log(productKeys); only click kora database er productKeys gulo show hbe

        /* 
            localStores er productKeys gulo k map kore, 
            localStores er sob product gulo theke find kore
            database er key er sathe jegulo match kore sei product gulo,
            & 
            jei key gulo localStores a match korse tar quantity gulo k
            const cartProducts a rakha holo

            product.quantity = getDatabaseCart()[key];
            localStores er [key] gulo tar matching countable number

        */
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);


    }, []);

    //.gif ta show tbe

    let thankyou;
    if (orderPlaced) {

        const styles = {
            img: {
                width: "95%"
            }
        }

        thankyou = <img style={styles.img} className='happyImg' src={happyImage} alt="" srcSet='' />
    }



    return (
        <div>
            <h1>Cart Items : {cart.length}</h1>

            {/* order review te product er review gulo show korabo */}
            <div className="twin-container">
                <div className="product-container">
                    {
                        cart.map(pd =>
                            <ReviewItem
                                key={pd.key}
                                removeProduct={removeProduct}
                                product={pd}
                            >
                            </ReviewItem>)
                    }

                    {/* .gif ta show tbe */}
                    {thankyou}

                </div>

                <div className="cart-container">
                    <Cart cart={cart}>
                        <button onClick={handlePlaceOrder} className='main-button'>Place Order</button>
                    </Cart>
                </div>

            </div>

        </div>
    );
};

export default Review;