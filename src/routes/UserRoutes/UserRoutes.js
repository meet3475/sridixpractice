import React from 'react';
import Header from '../../user/components/Header/Header';
import Footer from '../../user/components/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from '../../user/containers/Home/Home';
import Product from '../../user/containers/Product/Product';
import Cart from '../../user/containers/Cart/Cart';
import ProductDetail from '../../user/containers/ProductDetail/ProductDetail';


function UserRoutes(props) {
    return (
        <div>
            <Header/>
            <Routes>
                    <Route exact path="/" element={<Home/>} />
                    <Route exact path="/product" element={<Product />} />
                    <Route exact path="/product/category/:category" element={<Product/>} />
                    <Route exact path="/productdetail/:id" element={<ProductDetail/>} />
                    <Route exact path="/cart" element={<Cart/>} />
                </Routes>
            <Footer/>
        </div>
    );
}

export default UserRoutes;