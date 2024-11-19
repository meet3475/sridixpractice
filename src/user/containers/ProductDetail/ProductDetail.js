import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getproduct } from '../../../redux/action/product.action';
import { addToCart } from '../../../redux/slice/cart.slice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function ProductDetail(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [productDetail, setProductDetail] = useState([]);
    const [count, setCount] = useState(1);
    const products = useSelector((state) => state.products.products) || [];
    console.log(products);

    const data = products.find((v) => Number(v.id) === Number(id));
    console.log(data);


    const [buttonText, setButtonText] = useState("Add to Cart");
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    let sliderRef1 = useRef(null);
    let sliderRef2 = useRef(null);



    useEffect(() => {
        setNav1(sliderRef1);
        setNav2(sliderRef2);
    }, []);

    useEffect(() => {
        dispatch(getproduct());
    }, [dispatch]);

    useEffect(() => {
        if (data) {
            setProductDetail(data);
            const cartItem = cart.find((item) => Number(item.id) === Number(id));
            if (cartItem) {
                setCount(cartItem.quantity);
                setButtonText("Update to Cart");
            } else {
                setButtonText("Add to Cart");
            }

        }
    }, [data, cart, id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    const handleAddToCart = () => {
        dispatch(addToCart({ id, count }));

        const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, quantity: count } : item
        );


        if (!updatedCart.find((item) => item.id === id)) {
            updatedCart.push({ id, quantity: count });
        }

        localStorage.setItem('cart', JSON.stringify(updatedCart));
        toast.success(buttonText === "Add to Cart" ? "Product Added!" : "Cart Updated!");
        setButtonText("Update to Cart");
    };


    const handlePlus = () => {
        console.log("plus done");
        const newCount = count + 1;
        setCount(newCount);
        const updatedCart = cart.map((item) =>
            Number(item.id) === Number(id) ? { ...item, quantity: newCount } : item
        );
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    const handleMinus = () => {
        console.log("minus done");
        if (count > 1) {
            const newCount = count - 1;
            setCount(newCount);

            const updatedCart = cart.map((item) =>
                Number(item.id) === Number(id) ? { ...item, quantity: newCount } : item
            );
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    }

    

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Product Detail</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Product Detail</li>
                </ol>
            </div>

            <div className="container-fluid mt-5">
                <div className="container">
                    <div className="row g-4 mb-3">
                        <div className="col-lg-6">
                            <Slider asNavFor={nav2} ref={slider => (sliderRef1 = slider)}  infinite={false}>
                                {productDetail.images && productDetail.images.length > 0 ? (
                                    productDetail.images.map((image, index) => (
                                        <div key={index} className="item">
                                            <img
                                                src={image}
                                                className="img-fluid rounded"
                                                style={{ height: "450px", width: "100%" }}
                                                alt={`Product image ${index + 1}`}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className="item">
                                        <img src="path/to/default/image.jpg" className="img-fluid rounded" alt="Default Product" />
                                    </div>
                                )}
                            </Slider>

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
                                    <button onClick={handleMinus} className="btn btn-sm btn-minus rounded-circle bg-light border">
                                        <i className="fa fa-minus" />
                                    </button>
                                </div>
                                <span className="form-control form-control-sm text-center border-0">{count}</span>
                                <div className="input-group-btn">
                                    <button onClick={handlePlus} className="btn btn-sm btn-plus rounded-circle bg-light border">
                                        <i className="fa fa-plus" />
                                    </button>
                                </div>
                            </div>
                            <a onClick={handleAddToCart} href="#" className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary">
                                <i className="fa fa-shopping-bag me-2 text-primary" /> {buttonText}
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            <div className="container-fluid">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-6">
                            <Slider
                                asNavFor={nav1}
                                ref={slider => (sliderRef2 = slider)}
                                slidesToShow={ productDetail.images && productDetail.images.length > 1 ? productDetail.images.length : 1}
                                focusOnSelect={true}
                                infinite={false}
                            >
                                {productDetail.images && productDetail.images.length > 0 ? (
                                    productDetail.images.map((image, index) => (
                                        <div key={index} className="item">
                                            <img
                                                src={image}
                                                className="img-fluid rounded"
                                                style={{ height: "250px", width: "90%", marginLeft: "10px" }}
                                                alt={`Product image ${index + 1}`}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className="item">
                                        <img src="path/to/default/image.jpg" className="img-fluid rounded" alt="Default Product" />
                                    </div>
                                )}
                            </Slider>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default ProductDetail;


