import React from 'react'
import { Formik, Field, ErrorMessage, Form } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        "https://cardify-production-6e02.up.railway.app/login",
        {
          email: values.email,
          password: values.pwd,
        });


        
        localStorage.setItem("username",response.data.username);
        localStorage.setItem("user_id",response.data.user_id);


      toast.success("Logged in Sucessfully", { className: 'toast-success-glow' },)


      resetForm();
      navigate('/dashboard');
    }
    catch (error) {
      console.log(error.response?.data || error.message)
      toast.error("Something went wrong", {
        className: 'toast-error-glow',
      })

    }
  }

  return (
    <Formik
      initialValues={{ uname: '', email: '', pwd: '', cpwd: '' }}
      validationSchema={Yup.object({


        email: Yup.string()
          .required('email is required')
          .matches(/^([a-zA-Z])[a-zA-Z0-9\-\.\_]+\@+([a-zA-Z])+\.+([a-z])/, 'invallid email'),

        pwd: Yup.string()
          .required('password is required')
          .min(8, 'password must be 8 characters long')
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$*!?]).{8,}$/, 'invalid password'),




      })}

      onSubmit={handleSubmit}
    >

      {() => (

        <>
          <div className="container my-5" id="register">
            <div className="d-md-flex justify-content-evenly shadow p-3 border rounded-4 bg-white">
              <div className="col-md-5 px-3">
                <Form className='p-2'>
                  <h3 className='text-dark'>Login to your account</h3>
                  <hr className='text-dark' />


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
                    <button type="submit" className=" submit btn btn-primary  w-50">Login</button>
                  </div>
                  <div className="py-3">
                    <p className='text-dark fw-bold'>Don't have an account? <Link to="/register" className="registerhere">Register here</Link></p>
                    <p className="small text-muted mt-3">
                      By logging in, you agree to Cardify's <br />
                      <Link to={"/aboutus"} className="text-info"> Terms</Link> &
                      <Link to={"/aboutus"} className="text-info"> Privacy Policy</Link>.
                    </p>

                  </div>

                </Form>
              </div>
              <div className="col-md-7">
                <img src="login.jpg" alt="Login" height="100%" width="100%" className="img-fluid border  rounded-3" />

              </div>



            </div>


          </div>



        </>

      )}


    </Formik>
  )
}

export default Login
