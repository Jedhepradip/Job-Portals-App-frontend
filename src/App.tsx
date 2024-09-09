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
import Company from './Pages/Companyesshow'
import AdminJons from './Pages/JobsPostAdmin'
import CreateCompanyAdmin from './Pages/CreateCompanyAdmin'
import SetUpCompanyPage from "./Pages/SetUpCompanyPage"
import AdminCompanyEditForm from './Pages/EditCompany'
import AdminNewJobsPost from './Pages/PostJobsAdmin'

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
        <Route path='/Company' element={<Company />} />
        <Route path='/AdminJons' element={<AdminJons />} />
        <Route path='/CreateCompanyAdmin' element={<CreateCompanyAdmin />} />
        <Route path='/SetUpCompanyPage/:id' element={<SetUpCompanyPage />} />
        <Route path='/AdminCompanyEditForm' element={<AdminCompanyEditForm />} />
        <Route path='/AdminNewJobsPost' element={<AdminNewJobsPost />} />
      </Routes>
      <Footer />
    </BrowserRouter >
  )
}

export default App
