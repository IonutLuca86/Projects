/* eslint-disable react/prop-types */
import './navbar.css'
import {Link} from 'react-router-dom'
import logo from '../assets/logo-no-background.png'




export default function Navigationbar() {

   
    
    return(
        <>
        <div className='navbar-container'>
                <Link to="/">
                    <img src={logo} alt="website logo" className='logo'></img>
                </Link>
        </div>        
            
           
        </>
       
    )
}