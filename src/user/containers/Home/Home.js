import React, { useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useDispatch, useSelector } from 'react-redux';
import { getproduct } from '../../../redux/action/product.action';
import { Link } from 'react-router-dom';


function Home(props) {

    const dispatch = useDispatch();

    const products = useSelector((state) => state.products.products) || [];
    console.log(products);

    useEffect(() => {
        dispatch(getproduct())
        const storedProducts = JSON.parse(localStorage.getItem("products"));
        if (storedProducts) {
            console.log("Products from localStorage:", storedProducts);
        }

    }, [dispatch])

    const firstProductPerCategory = products.reduce((acc, product) => {
        if (!acc.some(item => item.category === product.category)) {
            acc.push(product);
        }
        return acc;
    }, []);


    let products_carousel = {
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<div class="owl-prev"><i class="bi bi-arrow-left"></i></div>',
            '<div class="owl-next"><i class="bi bi-arrow-right"></i></div>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    }

    return (
        <div>
            {/* Hero Start */}
            <div className="container-fluid py-5 mb-5 hero-header">
                <div className="container py-5">
                    <div className="row g-5 align-items-center">
                        <div className="col-md-12 col-lg-7">
                            <h4 className="mb-3 text-secondary">100% Organic Foods</h4>
                            <h1 className="mb-5 display-3 text-primary">Organic Veggies &amp; Fruits Foods</h1>
                            <div className="position-relative mx-auto">
                                <input className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill" type="number" placeholder="Search" />
                                <button type="submit" className="btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100" style={{ top: 0, right: '25%' }}>Submit Now</button>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-5">
                            <div id="carouselId" className="carousel slide position-relative" data-bs-ride="carousel">
                                <div className="carousel-inner" role="listbox">
                                    <div className="carousel-item active rounded">
                                        <img src="img/hero-img-1.png" className="img-fluid w-100 h-100 bg-secondary rounded" alt="First slide" />
                                        <a href="#" className="btn px-4 py-2 text-white rounded">Fruites</a>
                                    </div>
                                    <div className="carousel-item rounded">
                                        <img src="img/hero-img-2.jpg" className="img-fluid w-100 h-100 rounded" alt="Second slide" />
                                        <a href="#" className="btn px-4 py-2 text-white rounded">Vesitables</a>
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true" />
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Hero End */}
            {/* Vesitable Shop Start*/}
            <div className="container-fluid vesitable py-5">
                <div className="container py-5">
                    <h2>Category List : </h2>
                    <OwlCarousel {...products_carousel} className="owl-carousel vegetable-carousel justify-content-center">
                        {
                            firstProductPerCategory.map((v) => (
                                <div className="border border-primary rounded position-relative vesitable-item" key={v.id}>
                                    <div className="vesitable-img">
                                        <img src={v.images[0]} style={{ height: "200px" }} className="img-fluid w-100 rounded-top" alt="" />
                                    </div>
                                    <div className="p-4 rounded-bottom">
                                        <h5>Category: {v.category}</h5>
                                        <h6>{v.title.length > 20 ? v.title.substring(0, 20) + "..." : v.title}</h6>
                                        <p>{v.description.length > 40 ? v.description.substring(0, 40) + "..." : v.description}</p>
                                        <div className="justify-content-between flex-lg-wrap">
                                            <p className="text-dark fs-5 fw-bold mb-0">${v.price} / kg</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </OwlCarousel >
                </div>
            </div>
            {/* Vesitable Shop End */}
            {/* Vesitable Shop Start*/}
            <div className="container-fluid vesitable py-5">
                <div className="container py-5">
                    <h2>Products List : </h2>
                    <OwlCarousel {...products_carousel} className="owl-carousel vegetable-carousel justify-content-center">
                        {
                            products.map((v) => (
                                <Link to={`/productDetail/${v.id}`}>
                                <div className="border border-primary rounded position-relative vesitable-item">
                                    <div className="vesitable-img">
                                        <img src={v.images[0]} style={{ height: "200px" }} className="img-fluid w-100 rounded-top" alt />
                                    </div>
                                    <div className="p-4 rounded-bottom">
                                        <h4>{v.title.length > 15 ? v.title.substring(0, 15) + "..." : v.title}</h4>
                                        <p>{v.description.length > 40 ? v.description.substring(0, 40) + "..." : v.description}</p>
                                        <div className="justify-content-between flex-lg-wrap">
                                            <p className="text-dark fs-5 fw-bold mb-0">${v.price} / kg</p>
                                            <p className="text-dark mb-0"> rating : {v.rating}</p>
                                            <p className="text-dark mb-0">Discount : {v.discountPercentage}%</p>
                                        </div>
                                    </div>
                                </div>
                                </Link>
                            ))
                        }
                    </OwlCarousel >
                </div>
            </div>
            {/* Vesitable Shop End */}
            {/* Featurs Start */}
            <div className="container-fluid service py-5">
                <div className="container py-5">
                    <div className="row g-4 justify-content-center">
                        <div className="col-md-6 col-lg-4">
                            <a href="#">
                                <div className="service-item bg-secondary rounded border border-secondary">
                                    <img src="img/featur-1.jpg" className="img-fluid rounded-top w-100" alt />
                                    <div className="px-4 rounded-bottom">
                                        <div className="service-content bg-primary text-center p-4 rounded">
                                            <h5 className="text-white">Fresh Apples</h5>
                                            <h3 className="mb-0">20% OFF</h3>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <a href="#">
                                <div className="service-item bg-dark rounded border border-dark">
                                    <img src="img/featur-2.jpg" className="img-fluid rounded-top w-100" alt />
                                    <div className="px-4 rounded-bottom">
                                        <div className="service-content bg-light text-center p-4 rounded">
                                            <h5 className="text-primary">Tasty Fruits</h5>
                                            <h3 className="mb-0">Free delivery</h3>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <a href="#">
                                <div className="service-item bg-primary rounded border border-primary">
                                    <img src="img/featur-3.jpg" className="img-fluid rounded-top w-100" alt />
                                    <div className="px-4 rounded-bottom">
                                        <div className="service-content bg-secondary text-center p-4 rounded">
                                            <h5 className="text-white">Exotic Vegitable</h5>
                                            <h3 className="mb-0">Discount 30$</h3>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Featurs End */}

            {/* Bestsaler Product End */}
            {/* Fact Start */}
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="bg-light p-5 rounded">
                        <div className="row g-4 justify-content-center">
                            <div className="col-md-6 col-lg-6 col-xl-3">
                                <div className="counter bg-white rounded p-5">
                                    <i className="fa fa-users text-secondary" />
                                    <h4>satisfied customers</h4>
                                    <h1>1963</h1>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-xl-3">
                                <div className="counter bg-white rounded p-5">
                                    <i className="fa fa-users text-secondary" />
                                    <h4>quality of service</h4>
                                    <h1>99%</h1>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-xl-3">
                                <div className="counter bg-white rounded p-5">
                                    <i className="fa fa-users text-secondary" />
                                    <h4>quality certificates</h4>
                                    <h1>33</h1>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-xl-3">
                                <div className="counter bg-white rounded p-5">
                                    <i className="fa fa-users text-secondary" />
                                    <h4>Available Products</h4>
                                    <h1>789</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Fact Start */}
        </div>
    );
}

export default Home;