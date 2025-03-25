import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

import Profile from './pages/Profile'
import ContactUs from './pages/ContactUs'
import Directory from './pages/Directory'
import SignIn from './pages/SignIn'
import Event from './pages/Event'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import Donate from './pages/Donate'
function App() {
  

  return (
  <BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/contactus' element={<ContactUs/>}/>
    <Route path='/directory' element={<Directory/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/event' element={<Event/>}/>
    <Route path='/signin' element={<SignIn/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/donate' element={<Donate/>}/>
  </Routes> 
  </BrowserRouter>
  )
}

export default App
