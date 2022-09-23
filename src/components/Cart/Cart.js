import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart
    // console.log(cart);

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    // const total = cart.reduce((total, product) => total + product.price , 0)

    let items = 0;
    let tax = 0;
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];

        items = items + product.price;
        tax = tax + product.price / 10;
        total = total + product.price * product.quantity;
        // debugger; kono problem thakle
    }

    let shipping = 0;
    if (total > 500) {
        shipping = 0;
    }
    else if (total > 200) {
        shipping = 4.99;
    }
    else if (total > 0) {
        shipping = 12.99
    }


    return (
        <div className='cart'>
            <h3>Order Summary</h3>
            <p>Items ordered : {cart.length}</p>

            <table>
                <tbody>
                    <tr>
                        <td>Items :</td>
                        <td>${formatNumber(items)}</td>
                    </tr>
                </tbody>
                
                <tbody>
                    <tr>
                        <td>Shipping & Handling:</td>
                        <td>${formatNumber(shipping)}</td>
                    </tr>
                </tbody>

                <tbody>
                    <tr>
                        <td>Total before tax:</td>
                        <td>${formatNumber(total + shipping)}</td>
                    </tr>
                </tbody>

                <tbody>
                    <tr>
                        <td>Estimated Tax:</td>
                        <td>${formatNumber(tax)}</td>
                    </tr>
                </tbody>

                <tbody>
                    <tr className='total-row'>
                        <td>Order Total:</td>
                        <td>${formatNumber(total + shipping + tax)}</td>
                    </tr>
                </tbody>


            </table>

            <br />

            {/* Review Order a click korle
                Review components er vitore jabe
                seta korle chaile 
                <Link> route set korte hbe */}


            {/* 
            ai button ta shop.js a niye geci
            
            <Link to='/review'>
                <button className='main-button'>Review Order</button>
            </Link> 
            
            */}



            {
                props.children
            }

        </div>
    );
};

export default Cart;