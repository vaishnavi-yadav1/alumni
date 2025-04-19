import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import PrivateRoute from './components/PrivateRoute.jsx'
import Profile from "./pages/Profile.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Directory from "./pages/Directory.jsx";
import SignIn from "./pages/SignIn.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import SignUp from "./pages/SignUp.jsx";
import Header from "./components/Header.jsx";
import Donate from "./pages/Donate.jsx";
import CreateJob from "./pages/CreateJob.jsx";
import JobListings from "./pages/JobListings.jsx"
import  ShowEvent from "./pages/ShowEvent.jsx"

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
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/show-job" element={<JobListings/>} />
        <Route path="/show-events" element={<ShowEvent />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-job" element={<CreateJob/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
