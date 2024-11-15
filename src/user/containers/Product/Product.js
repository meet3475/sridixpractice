import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getproduct } from '../../../redux/action/product.action';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

function Product(props) {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products) || [];
    const location = useLocation(); 
    const [categories, setCategories] = useState([]); // For dynamic categories
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;
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
        dispatch(getproduct());
    }, [dispatch]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products/category-list');
                const allCategories = response.data; // Assuming API returns an array of categories

                // Compute product count for each category
                const categoryWithCounts = allCategories.map(category => {
                    const count = products.filter(product => product.category === category).length;
                    return { category, count };
                });

                // Filter out categories with zero products
                const filteredCategories = categoryWithCounts.filter(cat => cat.count > 0);
                setCategories(filteredCategories);
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

    return (
        <div>
            {/* Fruits Shop Start */}
            <div className="container-fluid fruite py-5">
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
                                            placeholder="keywords"
                                            aria-describedby="search-icon-1"
                                            onChange={(event) => setSearchData(event.target.value)}
                                        />
                                        <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
                                    </div>
                                </div>
                                <div className="col-6" />
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
                                                            className="d-flex justify-content-between fruite-name"
                                                            onClick={() => { setSelectedCategory("All"); setCurrentPage(1); }}>
                                                            <a href="#"><i className="fas fa-apple-alt me-2" />All</a>
                                                            <span>({products.length})</span>
                                                        </div>
                                                    </li>
                                                    {categories.map(({ category, count }) => (
                                                        <li key={category}>
                                                            <div
                                                                className="d-flex justify-content-between fruite-name"
                                                                onClick={() => { setSelectedCategory(category); setCurrentPage(1); }}>
                                                                <a href="#"><i className="fas fa-apple-alt me-2" />{capitalizeFirstLetter(category)}</a>
                                                                <span>({count})</span>
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
                                            {[...Array(totalPages).keys()].map(page => (
                                                <li key={page + 1} className={`page-item px-2 ${currentPage === page + 1 ? 'active' : ''}`}>
                                                    <button className="page-link" onClick={() => handlePageChange(page + 1)}>
                                                        {page + 1}
                                                    </button>
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

