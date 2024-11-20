import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

function Header(props) {
  const cart = useSelector(state => state.cart);
  const navigate = useNavigate();

  const totalCartCount = cart.cart.length;
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUser(loggedInUser);
    }
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

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
            <div className={`collapse navbar-collapse`} id="navbarCollapse">
              <div className={`navbar-nav mx-auto`}>
                <NavLink to='/' className="nav-item nav-link active">Home</NavLink>
                <NavLink to='/product' className="nav-item nav-link">Product</NavLink>
                <NavLink to='/cart' className="nav-item nav-link">Cart</NavLink>

                {!isLoggedIn ? (
                  <NavLink to='/authform' className="nav-item nav-link">Login/Signup</NavLink>
                ) : (
                  <div className="d-flex m-3 me-0 align-items-center">
                    <div className="position-relative me-4 my-auto">
                      <i className="fas fa-user fa-2x" onClick={() => setDropdownVisible(!dropdownVisible)} />
                      {
                        dropdownVisible && (
                          <div className="dropdown-menu show" style={{ position: 'absolute', top: '40px' }}>
                            <div className="dropdown-item">Name: {user.name}</div>
                            <div className="dropdown-item">Email: {user.email}</div>
                            <div className="dropdown-item">Mobile: {user.moblie}</div>
                            <div className="dropdown-item">Address: {user.address}</div>
                            <div className="dropdown-item text-danger" onClick={handleLogout}>Logout</div>
                          </div>
                        )
                      }
                    </div>
                  </div>
                )}
              </div>
              <div className="d-flex m-3 me-0 align-items-center">
                <NavLink to={`/cart`} className="position-relative me-4 my-auto">
                  <i className="fa fa-shopping-bag fa-2x" />
                  <span
                    className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                    style={{ top: '-5px', left: 15, height: 20, minWidth: 20 }}
                  >
                    {totalCartCount}
                  </span>
                </NavLink>
              </div>
            </div>
          </nav>
        </div>
      </div>
      {/* Navbar End */}
    </div>
  );
}

export default Header;
