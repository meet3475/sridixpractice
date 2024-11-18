import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function Header(props) {

  const cart = useSelector(state => state.cart)
  console.log(cart);

  const totalQtyData = cart.cart.reduce((acc, v) => acc + v.quantity, 0);
  console.log(totalQtyData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* Navbar start */}
      <div className={`container-fluid fixed-top`}>
        <div className="container topbar bg-primary d-none d-lg-block">
          <div className="d-flex justify-content-between">
            <div className="top-info ps-2">
              <small className="me-3"><i className="fas fa-map-marker-alt me-2 text-secondary" /> <a href="#" className="text-white">123 Street, New York</a></small>
              <small className="me-3"><i className="fas fa-envelope me-2 text-secondary" /><a href="#" className="text-white">Email@Example.com</a></small>
            </div>
            <div className="top-link pe-2">
              <a href="#" className="text-white"><small className="text-white mx-2">Privacy Policy</small>/</a>
              <a href="#" className="text-white"><small className="text-white mx-2">Terms of Use</small>/</a>
              <a href="#" className="text-white"><small className="text-white ms-2">Sales and Refunds</small></a>
            </div>
          </div>
        </div>
        <div className="container px-0">
          <nav className="navbar navbar-expand-xl">
            <a href="/" className="navbar-brand"><h1 className="text-primary display-6">Products</h1></a>
            <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
              <span className="fa fa-bars text-primary" />
            </button>
            <div className={`collapse navbar-collapse `} id="navbarCollapse">
              <div className={`navbar-nav mx-auto`}>
                <NavLink to='/' className="nav-item nav-link active">Home</NavLink>
                <NavLink to='/product' className="nav-item nav-link">Product</NavLink>
                <NavLink to='/cart' className="nav-item nav-link">Cart</NavLink>
              </div>
              <div className="d-flex m-3 me-0 align-items-center">
                <NavLink to={`/cart`} className="position-relative me-4 my-auto">
                  <i className="fa fa-shopping-bag fa-2x" />
                  <span
                    className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                    style={{ top: '-5px', left: 15, height: 20, minWidth: 20 }}
                  >
                    {totalQtyData}
                  </span>
                </NavLink>
              </div>

            </div>
          </nav>
        </div>
      </div>
      {/* Navbar End */}
      {/* Modal Search Start */}
      <div className="modal fade" id="searchModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body d-flex align-items-center">
              <div className="input-group w-75 mx-auto d-flex">
                <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Search End */}
    </div>
  );
}

export default Header;