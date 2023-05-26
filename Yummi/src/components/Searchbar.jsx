/* eslint-disable react/prop-types */
import {  useState } from 'react'
import { FaHome, FaList, FaSearch } from 'react-icons/fa'
import FilterMenu from './FilterMenu'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import './navbar.css'
import {Link} from 'react-router-dom'
import GetRecipes from './GetRecipes'


function Searchbar({submited,setSubmited,search,setSearch,options,setOptions,setSearchedRecipies,setTotal,defaultOptions}) {

    
    const [buttonTrigger,setButtonTrigger] = useState(false);
    const [refresh,setRefresh] = useState(false);      
  
    const handleSubmit = async (e) =>{
        e.preventDefault(); 
        let recipes = await GetRecipes(search,options,0);
        console.log(recipes);
        setSearchedRecipies(recipes.results) 
        setTotal(recipes.totalResults)            
        setSubmited(!submited);
        setSearch("");
        //ClearAll();
    }

    const updateOptions = (option,title) => {
        const optionCont = options;
       
        if(title.toLowerCase() === "regions") {
            options.regions?.includes(option)? 
                optionCont.regions.splice(optionCont.regions.indexOf(option),1)
                : optionCont.regions?.push(option);      
        } 
        if(title.toLowerCase() === "diets") {
            options.diets?.includes(option)? 
                optionCont.diets.splice(optionCont.diets.indexOf(option),1)
                : optionCont.diets?.push(option);      
        }  
        if(title.toLowerCase() === "mealtypes") {
            options.mealtypes?.includes(option)? 
                optionCont.mealtypes.splice(optionCont.mealtypes.indexOf(option),1)
                : optionCont.mealtypes?.push(option);      
        } 
        if(title.toLowerCase() === "intolerances") {
            options.intolerances?.includes(option)? 
                optionCont.intolerances.splice(optionCont.intolerances.indexOf(option),1)
                : optionCont.intolerances?.push(option);      
        } 
            
        setOptions(optionCont)       
        setRefresh(!refresh)
       
    }
    const removeQuerry = (qname,qtitle) => {
        console.log(qname,qtitle)
        const check =JSON.parse(localStorage.getItem(`${qname}button`));
        if(check)
            updateOptions(qname,qtitle);
            localStorage.removeItem(`${qname}button`);
    }

    const SelectedOptions = () => {
        let selectedValues = [];
        let count = 0;
            for (const elem in options){
                selectedValues[count] = options[elem].map((opt) => {
                    return(<button key={opt} onClick={() =>removeQuerry(opt,elem)} className='querry-button'>{opt}<AiOutlineCloseCircle size={20}/></button>)
                })
                count++;
                }
        
        return selectedValues;
          
    }
    function ClearAll() {
        setOptions(defaultOptions);
    }
  return (
    <>
    <div className='searchbar'>
            <Link to="/" className="home-button" onClick={()=> setSubmited(!submited)}><FaHome size={35}/></Link>
            <form className='search-container' onSubmit={handleSubmit}>
                <input type="text" placeholder='Search...' 
                className='input-search' 
                onChange={(e) => setSearch(e.target.value)}/>
                <button type="submit" className='search-icon'><FaSearch size={20}/></button>  
            </form>
            <button className='filter-button' 
            onClick={() => setButtonTrigger(!buttonTrigger)}><FaList /></button>
            
            </div>
            <FilterMenu trigger={buttonTrigger} 
            setFilterTrigger={setButtonTrigger} updateOptions={updateOptions}
            clearAll={ClearAll}></FilterMenu>
            <div className='filter-select-display'>
            <SelectedOptions />
            </div></>
        
  )
}

export default Searchbar
