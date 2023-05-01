import './navbar.css'
import {Link} from 'react-router-dom'
import logo from '../assets/logo-no-background.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'



export default function Navigationbar() {

    const [search,setSearch] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        navigate('searched/'+search)
    }


    return(
        <div className='navbar-container'>
        <nav className='navbar'>
            <div className='logo-container'>
                <Link to="/">
                    <img src={logo} alt="website logo" className='logo'></img>
                </Link>
            </div>
            <ul className='navigation'>
                <Link to="/" className="navlink">Home</Link>
                <Link to="/about" className="navlink">About</Link>
                <Link to="/contact" className="navlink">Contact</Link>
            </ul>
        </nav>
        <nav className='searchbar'>
            <form className='search-container' onSubmit={handleSubmit}>
                <input type="text" placeholder='Search...' 
                className='input-search'
                onChange={(e) => setSearch(e.target.value)}/>
                <button className='filter-button'>Filter</button>
            </form>
        </nav>
        </div>
       
    )
}