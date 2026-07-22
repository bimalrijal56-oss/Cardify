
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'

import App from './App.jsx'
import MyRoute from './Myroute.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'react-toastify/dist/ReactToastify.css'
import './assets/style.css'

import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: "5000",
  once: true,
});
createRoot(document.getElementById('root')).render(
  <>
    <MyRoute />
    <ToastContainer position="top-right" theme="colored" autoClose={5000} />
  </>,
)
