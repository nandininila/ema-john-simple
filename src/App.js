import React from 'react';
import './App.css';
// import Product from './components/Product/Product';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Header from './components/Header/Header';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';


function App() {
  return (
    <div>
      <Header></Header>

      <Router>
        <Routes>

          {/* default page show korar jnno */}
          <Route path='/' element={<Shop></Shop>}></Route>

          <Route exact path='/shop' element={<Shop></Shop>}></Route>

          <Route exact path='/review' element={<Review></Review>}></Route>

          <Route path='/inventory' element={<Inventory></Inventory>}></Route>

          {/* dynamic data set */}
          <Route path='/product/:ProductKey' element={<ProductDetail></ProductDetail>}></Route>

          <Route exact path='*' element={<NotFound></NotFound>}></Route>

        </Routes>
      </Router>

    </div>
  );
}

export default App;
