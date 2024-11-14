import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getcategory } from '../../../redux/action/category.action';

function Category(props) {

    const dispatch = useDispatch();

    const category = useSelector((state) => state.category.category) || [];
    console.log(category);

    useEffect(() => {
        dispatch(getcategory())
    }, [dispatch])

    return (
        <div>
            <div className="col-lg-9">
                <div className="row g-4 justify-content-center">
                    {
                        category.map((v) => (
                            <div className="col-md-6 col-lg-6 col-xl-4">
                                <div className="rounded position-relative fruite-item">
                                    <div className="fruite-img">
                                        <img src={v.images} style={{ height: "200px" }} className="img-fluid w-100 rounded-top" alt />
                                    </div>
                                    <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                        <h4>{v.title.length > 20 ? v.title.substring(0, 20) + "..." : v.title}</h4>
                                        <p>{v.description.length > 40 ? v.description.substring(0, 40) + "..." : v.description}</p>
                                        <div className="d-flex justify-content-between flex-lg-wrap">
                                            <p className="text-dark fs-5 fw-bold mb-0">${v.price} / kg</p>
                                            <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <div className="col-12">
                        <div className="pagination d-flex justify-content-center mt-5">
                            <a href="#" className="rounded">«</a>
                            <a href="#" className="active rounded">1</a>
                            <a href="#" className="rounded">2</a>
                            <a href="#" className="rounded">3</a>
                            <a href="#" className="rounded">4</a>
                            <a href="#" className="rounded">5</a>
                            <a href="#" className="rounded">6</a>
                            <a href="#" className="rounded">»</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Category;