import React from 'react'
import { Formik, Field, ErrorMessage, Form } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'


const Register = () => {
    const navigate = useNavigate();





    const handleSubmit = async (values, { resetForm }) => {

        try {
            const response = await axios.post(
                "https://cardify-production-6e02.up.railway.app/sign-up",
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
            toast.error( error.response?.data?.error || "Something went wrong", {
                className: 'toast-error-glow',
            })
        }
    };

    return (

        <Formik
            initialValues={{ uname: '', email: '', pwd: '', cpwd: '' }}
            validationSchema={Yup.object({
                uname: Yup.string()
                    .required('username is required')
                    .min(3, 'username must be 3 character long')
                    .matches(/^[a-zA-z0-9\_\.]+$/, 'username is invalid'),

                email: Yup.string()
                    .required('email is required')
                    .matches(/^([a-zA-Z])[a-zA-Z0-9\-\.\_]+\@+([a-zA-Z])+\.+([a-z])/, 'invallid email'),

                pwd: Yup.string()
                    .required('password is required')
                    .min(8, 'password must be 8 characters long')
                    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$*!?]).{8,}$/, 'invalid password'),

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

                                    <div className="form-floating mb-3">
                                        <Field type="password" id="pwd" name="pwd" placeholder="Enter your password" className="form-control" required />
                                        <label htmlFor="pwd">Password</label>
                                        <ErrorMessage name='pwd'>
                                            {(msg) => <span className='text-danger'>{msg}</span>}
                                        </ErrorMessage>
                                    </div>




                                    <div>
                                        <button type="submit" className=" submit btn btn-primary  w-50 ">Register</button>
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