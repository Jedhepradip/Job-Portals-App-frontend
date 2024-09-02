import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import NotFound from './Pages/NotFound'
import Home from './Pages/Home'
import Jobs from './Pages/Jobs'
import Browse from './Pages/Browse'
import Footer from './components/Footer'
import Profile from './Pages/Profile'
import SignIn from './Pages/SignIn'
import Login from './Pages/Login'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Home />} />
        <Route path='/Jobs' element={<Jobs />} />
        <Route path='/Browse' element={<Browse />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/SignIn' element={<SignIn />} />
        <Route path='/Login' element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter >
  )
}

export default App
