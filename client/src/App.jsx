import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import PrivateRoute from './components/PrivateRoute.jsx'
import Profile from "./pages/Profile.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Directory from "./pages/Directory.jsx";
import SignIn from "./pages/SignIn.jsx";
import Event from "./pages/Event.jsx";
import SignUp from "./pages/SignUp.jsx";
import Header from "./components/Header.jsx";
import Donate from "./pages/Donate.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/search" element={<Directory />} />
        <Route path="/event" element={<Event />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/donate" element={<Donate />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
