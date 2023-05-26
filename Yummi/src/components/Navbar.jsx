/* eslint-disable react/prop-types */
import './navbar.css'
import {Link} from 'react-router-dom'
import logo from '../assets/logo-no-background.png'
import {BsGeoAltFill} from 'react-icons/bs'
import {FaHome} from 'react-icons/fa'
import {GiPopeCrown} from 'react-icons/gi'




export default function Navigationbar() {

   
    
    return(
        <>
        <div className='navbar-container'>
            <div>
                <Link to="/">
                    <img src={logo} alt="website logo" className='logo'></img>
                </Link>
            </div>
            <div className='navlinks-container'>
                <Link to="/" className='navlink'><FaHome size={35} /></Link>
                <Link to="/populars" className='navlink'><GiPopeCrown size={37}/></Link>
                <Link to="/georecipes" className='navlink'><BsGeoAltFill size={32} /></Link>
            </div>
        </div>        
            
           
        </>
       
    )
}