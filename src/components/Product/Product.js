import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';

// kono data parameter hisebe newar jnno 'props' use hoise
const Product = (props) => {
    // props er moddhe kichu ase kina seta janar jnne, r akhane product ta holo property er naam 
    // console.log(props);

    const { img, name, seller, price, stock, key } = props.product //function er parameter er moto kaj kore
    return (
        <div className="product">
            <div>
                <img className='product-img' src={img} alt="product img" srcSet="" />
            </div>
            <div className="product-name">

                {/* ai Link ta holo react-router-dom */}
                <h4><Link className='link' to={'/product/' + key}>{name}</Link></h4>
                <p><small>by : {seller}</small></p>
                <p>${price}</p>
                <p><small>only {stock} left in stock - order soon</small></p>


                {/* ProductDetail components a Add to cart button ta dekhabo na,
                but shop.js a dekhabo.
                er jnne ProductDetail a value false,
                r aikhane value true.
                tai
                button ta conditionally dynamic korlam

                props.showAddToCart &&
                props.showAddToCart === true &&
            */}
                {props.showAddToCart === true &&

                    <button
                        className="main-button"
                        onClick={() => (props.handleAddProduct(props.product))} /* function auto execute jeno na hoy, tai er vitore 1ta () => likhte hoy */
                    >
                        <FontAwesomeIcon icon={faShoppingCart} /> add to cart
                    </button>
                }
            </div>
        </div>
    );
};

export default Product;