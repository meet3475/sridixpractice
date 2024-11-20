import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from '../../user/components/Header/Header';
import Footer from '../../user/components/Footer/Footer';
import Home from '../../user/containers/Home/Home';
import Product from '../../user/containers/Product/Product';
import Cart from '../../user/containers/Cart/Cart';
import ProductDetail from '../../user/containers/ProductDetail/ProductDetail';
import AuthForm from '../../user/containers/AuthForm/AuthForm';

function UserRoutes(props) {
    const location = useLocation();

    const hideHeaderFooterRoutes = ['/authform'];

    const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);

    return (
        <div>
            {!shouldHideHeaderFooter && <Header />}
            <Routes>
                <Route exact path="/authform" element={<AuthForm />} />
                <Route exact path="/" element={<Home />} />
                <Route exact path="/product" element={<Product />} />
                <Route exact path="/product/category/:category" element={<Product />} />
                <Route exact path="/productdetail/:id" element={<ProductDetail />} />
                <Route exact path="/cart" element={<Cart />} />
            </Routes>
            {!shouldHideHeaderFooter && <Footer />}
        </div>
    );
}

export default UserRoutes;
