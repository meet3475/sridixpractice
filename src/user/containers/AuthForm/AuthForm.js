import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

function AuthForm(props) {
    const [type, setType] = useState('login');

    const navigate = useNavigate();

    const staticUsers = [
        { userId: 1, name: "Meet Dobariya", moblie: "9016758258", email: "meetdobariya480@gamil.com", password: "Meet@123", address: "123 Street A" },
        { userId: 2, name: "Ronit Balar", moblie: "9876543210", email: "ronitbalar456@gamil.com", password: "Ronit@456", address: "456 Street B" },
        { userId: 3, name: "Mahavir Malaviya", moblie: "9122334455", email: "mahavir789@gamil.com", password: "Mahavir@789", address: "789 Street C" },
        { userId: 4, name: "Mihir Paramar", moblie: "8566778899", email: "mihir111@gamil.com", password: "Mihir@111", address: "111 Street D" },
        { userId: 5, name: "Nevil Sidhdhapara", moblie: "7677889900", email: "nevil222@gamil.com", password: "Nevil Sidhdhapara", address: "222 Street E" },
    ];

    let authSchema = {}, initialVal = {};

    if (type === 'signup') {
        authSchema = yup.object({
            name: yup.string().required("Enter your name").min(3, "Name must be at least 3 characters long"),
            email: yup.string().required("Enter your email").email("Enter valid email"),
            password: yup.string().required("Enter your Password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/,
                "Password must include at least 1 uppercase, 1 lowercase, 1 number, and 1 special character"),
            moblie: yup.string().required("Enter your moblie no.").matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
        });

        initialVal = {
            name: '',
            email: '',
            password: '',
            moblie: '',
            address: ''
        }
    } else if (type === 'login') {
        authSchema = yup.object({
            email: yup.string().required("Enter your email").email("Enter valid email"),
            password: yup.string().required("Enter your Password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/,
                "Password must include at least 1 uppercase, 1 lowercase, 1 number, and 1 special character")
        });

        initialVal = {
            email: '',
            password: '',
        }
    }

    let formikObj = useFormik({
        initialValues: initialVal,
        validationSchema: authSchema,
        enableReinitialize: true,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: values => {
            if (type === 'signup') {
                const newUser = {
                    userId: staticUsers.length + 1,
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    moblie: values.moblie,
                    address: values.address
                };
                const usersInStorage = JSON.parse(localStorage.getItem('users')) || staticUsers;
                if (usersInStorage.find(user => user.email === values.email)) {
                    alert('User already exists');
                    return;
                }
                localStorage.setItem('loggedInUser', JSON.stringify(newUser));
                alert('Signup successful and logged in');
                navigate("/");
            } else if (type === 'login') {
                const usersInStorage = JSON.parse(localStorage.getItem('users')) || staticUsers;
                const user = usersInStorage.find(user => user.email === values.email && user.password === values.password);
                if (user) {
                    localStorage.setItem('loggedInUser', JSON.stringify(user));
                    alert('Login successful');
                    navigate("/");
                } else {
                    alert('Incorrect email or password');
                }
            }
        },

    });

    let { handleSubmit, handleChange, handleBlur, handleFocus, touched, errors, values } = formikObj;

    return (
        <div>
            <div className="container-fluid fruite py-5">
                <div className="container py-5">
                    <a href="/" className="navbar-brand"><h1 className="text-primary display-6">Products</h1></a>
                    <h2>{type === 'login' ? 'Login Page' : 'Signup Page'}</h2>
                    <form onSubmit={handleSubmit} method='post'>
                        <div>
                            {
                                type === 'signup' ? (
                                    <>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name='name'
                                                id='name'
                                                placeholder="Please enter your name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                onFocus={handleFocus}
                                                value={values.name}
                                            />
                                            <span style={{ color: "red" }}>
                                                {errors.name && (touched.name || values.name) ? errors.name : null}
                                            </span>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email address</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name='email'
                                                id='email'
                                                placeholder="Please enter your Email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                onFocus={handleFocus}
                                                value={values.email}
                                            />
                                            <span style={{ color: "red" }}>{errors.email && (touched.email || values.email) ? errors.email : null}</span>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="moblie" className="form-label">Moblie No</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name='moblie'
                                                id='moblie'
                                                placeholder="Please enter your moblie"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                onFocus={handleFocus}
                                                value={values.moblie}
                                            />
                                            <span style={{ color: "red" }}>{errors.moblie && (touched.moblie || values.moblie) ? errors.moblie : null}</span>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="address" className="form-label">Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name='address'
                                                id='address'
                                                placeholder="Please enter your address"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                onFocus={handleFocus}
                                                value={values.address}
                                            />
                                            <span style={{ color: "red" }}>{errors.address && (touched.address || values.address) ? errors.address : null}</span>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name='password'
                                                id='password'
                                                placeholder="Please enter your password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                onFocus={handleFocus}
                                                value={values.password}
                                            />
                                            <span style={{ color: "red" }}>{errors.password && (touched.password || values.password) ? errors.password : null}</span>
                                        </div>
                                    </>
                                ) : null
                            }


                            {
                                type === 'login' ? (
                                    <>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email address</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name='email'
                                                id='email'
                                                placeholder="Please enter your Email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                onFocus={handleFocus}
                                                value={values.email}
                                            />
                                            <span style={{ color: "red" }}>{errors.email && (touched.email || values.email) ? errors.email : null}</span>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name='password'
                                                id='password'
                                                placeholder="Please enter your password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                onFocus={handleFocus}
                                                value={values.password}
                                            />
                                            <span style={{ color: "red" }}>{errors.password && (touched.password || values.password) ? errors.password : null}</span>
                                        </div>
                                    </>
                                ) : null
                            }

                            {
                                type === 'signup' ?
                                    <p>Already have an account? <a href="#" class="link-primary" onClick={() => setType('login')}>Login</a></p>
                                    :
                                    <>
                                        <p>Don't have an account? <a href="#" class="link-primary" onClick={() => setType('signup')}>Signup</a></p>
                                    </>
                            }

                            <div>
                                <button type="submit" className="btn btn-primary">
                                    {type === 'login' ? 'Login' : 'Signup'}
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AuthForm;
