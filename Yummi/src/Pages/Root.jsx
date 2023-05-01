
import { Outlet } from "react-router-dom";
//import {Link} from 'react-router-dom'
//import logo from '../assets/logo-no-background.png'
//import './Root.css'
import Navbar from '../components/Navbar'

export default function Root() {
  return (
    <>
          {/* <nav className="navbar">
            <div className='logo-container'>
                <Link to="/">
                    <img src={logo} alt="website logo" className='logo'></img>
                </Link>
            </div>
            <div className="searchbar-container">
              <input type="text" placeholder="Search..." className="searchbar"></input>
            </div>
            <div className='navigation'>
                <Link to="/" className="navlink">Home</Link>
                <Link to="/about" className="navlink">About</Link>
                <Link to="/contact" className="navlink">Contact</Link>
            </div>
        </nav>  */}
        <Navbar />
        <main><Outlet /></main>       
         
    </>
  )
}
