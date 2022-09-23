import React from 'react';
import logo from '../../images/logo.png'; // 1 level-up a hole ../
import './Header.css' //same folder hole ./

const Header = () => {
    return (
        <>
            <div className="container">

                <img className='logo' src={logo} alt="logo" srcSet="" />

                <nav>
                    <div>
                        <a href='/shop'>Shop</a>
                    </div>

                    <div>
                        <a href='/review'>Order Review</a>
                    </div>

                    <div>
                        <a href='/inventory'>Manage Inventory</a>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Header;