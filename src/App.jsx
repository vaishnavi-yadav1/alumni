import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
function App() {
  

  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/contactus' element={<ContactUs/>}/>
    <Route path='/directory' element={<Directory/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/event' element={<Event/>}/>
    <Route path='/signin' element={<SignIn/>}/>
    <Route path='/signup' element={<SignUp/>}/>
  </Routes> 
  </BrowserRouter>
  )
}

export default App
