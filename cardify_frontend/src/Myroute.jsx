import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Homepage from './Pages/Homepage'
import Base from './Base'
import Login from './Pages/Login'
import Register from './Pages/Register'
import CardDetails from './Pages/CardDetails'
import CardPreview from './Pages/CardPreview'
import Card from './Pages/Card'
import Cardlist from './Pages/Cardlist'
import Dashboardnav from './Components/Dashboardnav'
import Dashboard from './Pages/Dashboard'
import Dashboardbase from './Dashboardbase'
import AboutUs from './Pages/AboutUs'



const Myroute = () => {
  return (
    <BrowserRouter>
    <Routes>
        
        <Route path="/" element={<Base />}>
        
      <Route index element={<Homepage/>}></Route>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/aboutus' element={<AboutUs />}/>
  
        </Route>
        <Route path="/" element={<Dashboardbase />}>
    

      <Route path='/card-details' element={<CardDetails />}/>
      <Route path='/card-preview'element={<CardPreview />}/>
      <Route path='/card-preview/:uuid' element={<CardPreview />}/>
      <Route path='/cardlist' element={<Cardlist />} />
      <Route path='/dashboard' element={<Dashboard />} />


      
    </Route>
         <Route path='/card/:uuid' element={<Card />}/>
    </Routes>
      
    </BrowserRouter>
  )
}

export default Myroute
