import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getproduct } from '../../../redux/action/product.action';
import { decrementQuantity, incrementQuantity, removeFromCart } from '../../../redux/slice/cart.slice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';


function Cart() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products) || [];
    const cart = useSelector(state => state.cart);

    const cartData = cart.cart.map((v) => {
        const productData = products.find((v1) => Number(v1.id) === Number(v.id));
        return { ...productData, quantity: v.quantity };
    });

    const totalAmt = cartData.reduce((acc, v) => acc + v.quantity * v.price, 0);

    useEffect(() => {
        dispatch(getproduct());
    }, [dispatch]);

    const handlePlus = (id) => {
        dispatch(incrementQuantity(Number(id)));
        toast.success("Item quantity increased!");
    };

    const handleMinus = (id) => {
        dispatch(decrementQuantity(Number(id)));
        toast.info("Item quantity decreased!");
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Confirm Delete',
            text: 'Are you sure you want to remove this item from the cart?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeFromCart(Number(id)));
                toast.error("Item removed from cart!");
            } else {
                toast.info("Item not removed.");
            }
        });
    };

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Cart</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Cart</li>
                </ol>
            </div>
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Products</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartData.map((v) => (
                                        <tr key={v.id}>
                                            <th scope="row">
                                                <div className="d-flex align-items-center">
                                                    <img src={v.images && v.images[0] ? v.images[0] : ''} className="img-fluid me-5 rounded-circle" style={{ width: 80, height: 80 }} alt="" />
                                                </div>
                                            </th>
                                            <td>
                                                <p className="mb-0 mt-4">{v.title}</p>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">{v.price} $</p>
                                            </td>
                                            <td>
                                                <div className="input-group quantity mt-4" style={{ width: 100 }}>
                                                    <div className="input-group-btn">
                                                        <button onClick={() => handleMinus(v.id)} disabled={v.quantity <= 1} className="btn btn-sm btn-minus rounded-circle bg-light border">
                                                            <i className="fa fa-minus" />
                                                        </button>
                                                    </div>
                                                    <span className="form-control form-control-sm text-center border-0">{v.quantity}</span>
                                                    <div className="input-group-btn">
                                                        <button onClick={() => handlePlus(v.id)} className="btn btn-sm btn-plus rounded-circle bg-light border">
                                                            <i className="fa fa-plus" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">{(v.price * v.quantity).toFixed(2)}$</p>
                                            </td>
                                            <td>
                                                <button onClick={() => handleDelete(v.id)} className="btn btn-md rounded-circle bg-light border mt-4">
                                                    <i className="fa fa-times text-danger" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="row g-4 justify-content-end">
                        <div className="col-8" />
                        <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                            <div className="rounded">
                                <div className="p-4">
                                    <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                                    <div className="d-flex justify-content-between mb-4">
                                        <h5 className="mb-0 me-4">Subtotal:</h5>
                                        <p className="mb-0">${totalAmt.toFixed(2)}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <h5 className="mb-0 me-4">Shipping</h5>
                                        <div className>
                                            <p className="mb-0">Flat rate: $100.00</p>
                                        </div>
                                    </div>
                                    <p className="mb-0 text-end">Shipping to Ukraine.</p>
                                </div>
                                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                    <h5 className="mb-0 ps-4 me-4">Total</h5>
                                    <p className="mb-0 pe-4">${(totalAmt + 100).toFixed(2)}</p>
                                </div>
                                <button className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">Proceed Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
