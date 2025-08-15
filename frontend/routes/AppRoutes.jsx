import React from 'react'
import { BrowserRouter as Router, Routes , Route, BrowserRouter } from 'react-router-dom';
import Login from '../src/components/Login.jsx';
import Register from '../src/components/Register.jsx';
import Home from '../src/components/Home.jsx';
import Project from '../src/components/Project.jsx';


const AppRoutes = () => {
  return (
     <BrowserRouter>
     <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/register' element={<Register />} ></Route>
        <Route path='/project' element={<Project/>} ></Route>
     </Routes>
     </BrowserRouter>
  )
}

export default AppRoutes
