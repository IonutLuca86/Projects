/* eslint-disable react/prop-types */
import './navbar.css'
import {Link} from 'react-router-dom'
import logo from '../assets/logo-no-background.png'




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
                <Link to="/" className='navlink'>Home</Link>
                <Link to="/popular" className='navlink'>Popular Recipes</Link>
                <Link to="/region" className='navlink'>Recipes form were you are</Link>
            </div>
        </div>        
            
           
        </>
       
    )
}