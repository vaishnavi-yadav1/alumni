import { useSelector } from "react-redux"
import { Outlet,Navigate } from "react-router-dom"

export default function PrivateRoute() {
    const {currentAlumni}=useSelector((state)=>state.alumni);
  return currentAlumni? <Outlet/> : <Navigate to='/signin'/>
}



