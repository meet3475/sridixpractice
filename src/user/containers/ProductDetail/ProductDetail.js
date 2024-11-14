import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getproduct } from '../../../redux/action/product.action';
import { addToCart } from '../../../redux/slice/cart.slice';


function ProductDetail(props) {

    const { id } = useParams()
    console.log(id);

    const dispatch = useDispatch();

    const [productDetail, setProductDetail] = useState([]);

    const [count, setCount] = useState(1);

    const products = useSelector((state) => state.products.products) || [];
    console.log(products);

    const data = products.find((v) => v.id == id);
    console.log("data", data);


    useEffect(() => {
        setProductDetail(data);
        dispatch(getproduct());
    }, [dispatch])


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

    const handleAddToCart = () => {
        console.log(count);
        dispatch(addToCart({ id, count }))

        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = [...currentCart, { id, quantity: count }];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }


    const handlePlus = () => {
        setCount(count + 1)
    }

    const handleminus = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    return (
        <div>
            < div className="container-fluid page-header py-5" >
                <h1 className="text-center text-white display-6">Product Detail</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Product Detail</li>
                </ol>
            </div >

            <div className="container-fluid py-5 mt-5">
                <div className="container py-5">
                    <div className="row g-4 mb-5">
                        <div className="col-lg-8 col-xl-9">
                            <div className="row g-4">
                                <div className="col-lg-6">
                                    <div className="border rounded">
                                        {productDetail.images && productDetail.images.length > 0 ? (
                                            productDetail.images.map((image, index) => (
                                                <a key={index} href="#">
                                                    <img
                                                        src={image}
                                                        className="img-fluid rounded mb-2"
                                                        alt={`Product image ${index + 1}`}
                                                    />
                                                </a>
                                            ))
                                        ) : (
                                            <p>No images available</p>
                                        )}
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <h4 className="fw-bold mb-3">{productDetail.title}</h4>
                                    <p className="mb-3">Category: {productDetail.category}</p>
                                    <h4 className="fw-bold mb-3">${productDetail.price}</h4>
                                    <div className="d-flex mb-4">
                                        <i className="fa fa-star text-secondary" />
                                        <i className="fa fa-star text-secondary" />
                                        <i className="fa fa-star text-secondary" />
                                        <i className="fa fa-star text-secondary" />
                                        <i className="fa fa-star" />
                                    </div>
                                    <p className="mb-4">{productDetail.description}</p>
                                    <div className="input-group quantity mb-5" style={{ width: 100 }}>
                                        <div className="input-group-btn">
                                            <button onClick={() => handleminus()} className="btn btn-sm btn-minus rounded-circle bg-light border">
                                                <i className="fa fa-minus" />
                                            </button>
                                        </div>
                                        <span className="form-control form-control-sm text-center border-0" >{count}</span>
                                        <div className="input-group-btn">
                                            <button onClick={() => handlePlus()} className="btn btn-sm btn-plus rounded-circle bg-light border">
                                                <i className="fa fa-plus" />
                                            </button>
                                        </div>
                                    </div>

                                    <a onClick={handleAddToCart} href='#' className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid vesitable py-5">
                <div className="container py-5">
                    <OwlCarousel {...products_carousel} className="owl-carousel vegetable-carousel justify-content-center">

                        <div className="border border-primary rounded position-relative vesitable-item">
                            <div className="vesitable-img">
                                {productDetail.images && productDetail.images.length > 0 ? (
                                    productDetail.images.map((image, index) => (
                                        <a key={index} href="#">
                                            <img
                                                src={image}
                                                className="img-fluid rounded mb-2"
                                                alt={`Product image ${index + 1}`}
                                            />
                                        </a>
                                    ))
                                ) : (
                                    <p>No images available</p>
                                )}
                            </div>
                        </div>
                    </OwlCarousel >
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;