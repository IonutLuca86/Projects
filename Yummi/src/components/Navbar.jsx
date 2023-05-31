/* eslint-disable react/prop-types */
import './navbar.css'
import {Link} from 'react-router-dom'
import logo from '../assets/logo-no-background.png'
import {BsGeoAltFill} from 'react-icons/bs'
import {FaHome, FaSearch} from 'react-icons/fa'
import {GiPopeCrown} from 'react-icons/gi'
import Searchbar from './Searchbar'
import { useState } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'


const defaultOptions = {
    regions: [],
    mealtypes: [],
    diets: [],
    intolerances: []
}


export default function Navigationbar() {

   const [search,setSearch] = useState("");
    const [options,setOptions] = useState(defaultOptions);
    const [submited, setSubmited] = useState(false);
    const [searchedRecipies, setSearchedRecipies] = useState([]);   
    const [total, setTotal] = useState();  
    const [showSearchbar,setShowSearchBar] = useState(false);
   
    
    
    
    return(
        <>
        <div className='navbar-container'>
            <div>
                <Link to="/">
                    <img src={logo} alt="website logo" className='logo'></img>
                </Link>
            </div>
            <div className='navlinks-container'>
                <Link to="/" className='navlink' onClick={() => setShowSearchBar(false)}><FaHome size={35} /></Link>
                <Link to="/populars" className='navlink' onClick={() => setShowSearchBar(false)}><GiPopeCrown size={37}/></Link>
                <Link to="/georecipes" className='navlink' onClick={() => setShowSearchBar(false)}><BsGeoAltFill size={32} /></Link>
                <Link to="/favorites" className='navlink' onClick={() => setShowSearchBar(false)}><AiOutlineHeart size={32} /></Link>
                <button onClick={() => setShowSearchBar(!showSearchbar)} className='navbar-searchbtn'><FaSearch size={35}/></button>
            </div>
        </div>        
          {showSearchbar?  
          <Searchbar submited={submited} setSubmited={setSubmited} search={search} setSearch={setSearch} 
        options={options} setOptions={setOptions} setSearchedRecipies={setSearchedRecipies}
         searchedRecipies={searchedRecipies}  total={total} setTotal={setTotal} defaultOptions={defaultOptions} 
         setShowSearchBar={setShowSearchBar}/>  
          : <></> }
          
        
          </>
       
    )
}