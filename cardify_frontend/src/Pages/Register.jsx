import React, { useState } from 'react'
import { Formik, Field, ErrorMessage, Form } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Register = () => {
    const navigate = useNavigate();



    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (values, { resetForm }) => {

        try {
            const response = await axios.post(
                "https://cardify-ge3r.onrender.com/sign-up",
                {
                    username: values.uname,
                    password: values.pwd,
                    email: values.email,
                    profession: values.profession,
                    institute: values.institute,
                    address: values.address,

                }
            );
            toast.success("Signup Successful", {
                className: 'toast-success-glow',
            });
            resetForm();
            navigate('/login');


        }
        catch (error) {
            console.log(error.response?.data || error.message)
            toast.error(error.response?.data?.error || "Something went wrong", {
                className: 'toast-error-glow',
            })
        }
    };

    return (

        <Formik
            initialValues={{
                uname: '',
                profession: '',
                institute: '',
                address: '',
                email: '',
                pwd: '',
                cpwd: ''
            }}
            validationSchema={Yup.object({
                uname: Yup.string()
                    .required('username is required')
                    .min(3, 'username must be 3 character long')
                    .matches(/^[a-zA-z0-9\_\.]+$/, 'username shouldnot contain spaces or special characters'),

                email: Yup.string()
                    .required('email is required')
                    .matches(/^([a-zA-Z])[a-zA-Z0-9\-\.\_]+\@+([a-zA-Z])+\.+([a-z])/, 'invalid email'),

                pwd: Yup.string()
                    .required('password is required')
                    .min(8, 'password must be 8 characters long')
                    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$*!?]).{8,}$/, 'password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),

                cpwd: Yup.string()
                    .oneOf([Yup.ref('pwd')], 'password did not match')


            })}

            onSubmit={handleSubmit}
        >

            {() => (

                <>
                    <div className="container my-5" id="register">
                        <div className="d-md-flex justify-content-evenly shadow p-3 border rounded-4 bg-white">
                            <div className="col-md-5 px-3">
                                <Form className='p-2'>
                                    <h3 className='text-dark'>Register yourself!!</h3>
                                    <hr className='text-dark' />



                                    <div className="form-floating mb-3">
                                        <Field type="text" id="uname" name="uname" placeholder="Enter your name" className="form-control" required />
                                        <label htmlFor="uname">Username</label>
                                        <ErrorMessage name='uname'>
                                            {(msg) => <span className='text-danger'>{msg}</span>}
                                        </ErrorMessage>
                                    </div>


                                    <div className="form-floating mb-3">
                                        <Field type="text" id="profession" name="profession" placeholder="Enter your profession" className="form-control" required />
                                        <label htmlFor="profession">Profession</label>

                                    </div>


                                    <div className="form-floating mb-3">
                                        <Field type="text" id="institute" name="institute" placeholder="Enter your institute" className="form-control" required />
                                        <label htmlFor="institute">Institute</label>

                                    </div>


                                    <div className="form-floating mb-3">
                                        <Field type="text" id="address" name="address" placeholder="Enter your address" className="form-control" required />
                                        <label htmlFor="address">Address</label>

                                    </div>


                                    <div className="form-floating mb-3">
                                        <Field type="text" id="email" name="email" placeholder="Enter your email" className="form-control" required />
                                        <label htmlFor="email">Email</label>
                                        <ErrorMessage name='email'>
                                            {(msg) => <span className='text-danger'>{msg}</span>}
                                        </ErrorMessage>
                                    </div>

                                    <div className="mb-3">
                                        <div className="form-floating position-relative">
                                            <Field
                                                type={showPassword ? 'text' : 'password'}
                                                id="pwd"
                                                name="pwd"
                                                placeholder="Enter your password"
                                                className="form-control pe-5"
                                                required
                                            />

                                            <label htmlFor="pwd">Password</label>

                                            <button
                                                type="button"
                                                className="eye-btn position-absolute top-50 end-0 translate-middle-y me-3"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>

                                        <ErrorMessage name="pwd">
                                            {(msg) => <span className="text-danger d-block mt-1">{msg}</span>}
                                        </ErrorMessage>
                                    </div>




                                    <div>
                                        <button type="submit" className=" submit btn btn-primary  w-50 ">Register</button>
                                    </div>

                                    <div className="py-3">
                                        <p className='text-dark fw-bold'>Already have account? <Link to="/login" className="loginhere text-primary">Login here</Link></p>
                                    </div>


                                </Form>
                            </div>
                            <div className="col-md-7">
                                <img src="signin-image.webp" alt="SIGN IN" height="100%" width="100%" className="img-fluid" />

                            </div>



                        </div>


                    </div>



                </>

            )}


        </Formik>
    )
}

export default Register