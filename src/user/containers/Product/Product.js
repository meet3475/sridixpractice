import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getproduct } from '../../../redux/action/product.action';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { GET_ALLPRODUCTS } from '../../../redux/ActionType';

function Product(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigate
    const { category } = useParams(); // Get category from URL

    const products = useSelector((state) => state.products.products) || [];
    const location = useLocation();
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(6);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchData, setSearchData] = useState("");
    const [sort, setSort] = useState("lh");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('search');
        if (query) {
            setSearchData(query);
        }
    }, [location]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let response;
                if (selectedCategory === "All") {
                    response = await axios.get("https://dummyjson.com/products");
                    setCategories([]);
                } else {
                    response = await axios.get(`https://dummyjson.com/products/category/${selectedCategory}`);
                }

                const fetchedProducts = response.data.products || response.data;
                dispatch({ type: GET_ALLPRODUCTS, payload: fetchedProducts });
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [selectedCategory, dispatch]);


    useEffect(() => {
        dispatch(getproduct());
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (category) {
            setSelectedCategory(category);
        }
    }, [category]);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products/category-list');
                const allCategories = response.data;

                const categoryWithCounts = allCategories.map(category => {
                    const count = products.filter(product => product.category === category).length;
                    return { category, count };
                });

                setCategories(categoryWithCounts);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, [products]);


    const filteredProducts = selectedCategory === "All"
        ? products
        : products.filter(product => product.category === selectedCategory);

    const sortProducts = (data) => {
        return data.sort((a, b) => {
            if (sort === 'lh') {
                return a.price - b.price;
            } else if (sort === 'hl') {
                return b.price - a.price;
            } else if (sort === 'az') {
                return a.title.localeCompare(b.title);
            } else if (sort === 'za') {
                return b.title.localeCompare(a.title);
            }
            return 0;
        });
    };

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://dummyjson.com/products/search?q=${searchData}`);
            const Fdata = response.data.products;
            setSearchResults(sortProducts(Fdata));

        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    useEffect(() => {
        if (searchData) {
            handleSearch();
        } else {
            setSearchResults([]);
        }
    }, [searchData, sort]);

    const finalData = searchResults.length > 0 ? searchResults : sortProducts(currentProducts);

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        navigate(`/product/category/${category}`);
    };

    const handleProductsPerPageChange = (event) => {
        setProductsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const getCategoryClass = (category) => {
        return selectedCategory === category
            ? "bg-warning text-success"  
            : "";
    };

    return (
        <div>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Products</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Products</li>
                </ol>
            </div>
            {/* Single Page Header End */}
            {/* Fruits Shop Start */}
            <div className="container-fluid fruite">
                <div className="container py-5">
                    <h1 className="mt-4">Products Shop</h1>
                    <div className="row g-4">
                        <div className="col-lg-12">
                            <div className="row g-4">
                                <div className="col-xl-3">
                                    <div className="input-group w-100 mx-auto d-flex">
                                        <input
                                            type="search"
                                            className="form-control p-3"
                                            placeholder="Search Products"
                                            aria-describedby="search-icon-1"
                                            onChange={(event) => setSearchData(event.target.value)}
                                        />
                                        <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
                                    </div>
                                </div>
                                <div className="col-xl-3">
                                    <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                                        <label htmlFor="productsPerPage">Products Per Page:</label>
                                        <select
                                            id="productsPerPage"
                                            name="productsPerPage"
                                            className="border-0 form-select-sm bg-light me-3"
                                            onChange={handleProductsPerPageChange}
                                        >
                                            <option value="6">6</option>
                                            <option value="9">9</option>
                                            <option value="12">12</option>
                                            <option value="15">15</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-3" />
                                <div className="col-xl-3">
                                    <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                                        <label htmlFor="fruits">Default Sorting:</label>
                                        <select
                                            id="fruits"
                                            name="fruitlist"
                                            className="border-0 form-select-sm bg-light me-3"
                                            form="fruitform"
                                            onChange={(event) => setSort(event.target.value)}
                                        >
                                            <option value="lh">Price: Low to High</option>
                                            <option value="hl">Price: High to Low</option>
                                            <option value="az">Title: A to Z</option>
                                            <option value="za">Title: Z to A</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col-lg-3">
                                    <div className="row g-4">
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <h4>Categories</h4>
                                                <ul className="list-unstyled fruite-categorie">
                                                    <li>
                                                        <div
                                                            className={`d-flex justify-content-between fruite-name ${getCategoryClass("All")}`}
                                                            onClick={() => handleCategoryChange("All")}>
                                                            <a href="#"><i className="fas fa-apple-alt me-2" />All</a>
                                                        </div>
                                                    </li>
                                                    {categories.map(({ category}) => (
                                                        <li key={category}>
                                                            <div
                                                                className={`d-flex justify-content-between fruite-name ${getCategoryClass(category)}`}
                                                                onClick={() => handleCategoryChange(category)}>
                                                                <a href="#"><i className="fas fa-apple-alt me-2" />{capitalizeFirstLetter(category)}</a>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-9">
                                    <div className="row g-4 justify-content-center">
                                        {finalData.map((product) => (
                                            <div key={product.id} className="col-md-6 col-lg-6 col-xl-4">
                                                <Link to={`/productDetail/${product.id}`}>
                                                    <div className="rounded position-relative fruite-item">
                                                        <div className="fruite-img">
                                                            <img src={product.images[0]} style={{ height: "200px" }} className="img-fluid w-100 rounded-top" alt={product.title} />
                                                        </div>
                                                        <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                            <h5>{product.title.length > 20 ? product.title.substring(0, 20) + "..." : product.title}</h5>
                                                            <p>{product.description.length > 40 ? product.description.substring(0, 40) + "..." : product.description}</p>
                                                            <div>
                                                                <p className="text-dark fs-5 fw-bold mb-2">${product.price} / kg</p>
                                                                <p className="text-dark mb-0">Rating: {product.rating}</p>
                                                                <p className="text-dark mb-0">Discount: {product.discountPercentage}%</p>
                                                                <p className="text-dark mb-0">Stock: {product.stock}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Pagination */}
                                    <nav aria-label="Page navigation" className="mt-4">
                                        <ul className="pagination d-flex justify-content-center">
                                            {Array.from({ length: totalPages }, (_, index) => (
                                                <li
                                                    key={index + 1}
                                                    className={`page-item  ${currentPage === index + 1 ? "active" : ""}`}
                                                    onClick={() => handlePageChange(index + 1)}
                                                >
                                                    <a className="page-link" href="#">{index + 1}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Fruits Shop End */}
        </div>
    );
}

export default Product;

