
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar'
import Footer from "../components/Footer";


export default function Root() {
     
  return (
    <div className="page-container">         
        <Navbar  />
        <Outlet  /> 
        <Footer />      
         
    </div>
  )
}
