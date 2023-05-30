import { useState,useEffect } from 'react'
import './Home.css'
import RecipeCard from '../components/RecipeCard'
import '@splidejs/react-splide/css';
import GeoRecipes from '../components/GeoRecipes';
import { Link } from 'react-router-dom';
import getPopular from '../components/GetPopulars';



export default function Home() {
    
    const [popular,setPopular] = useState([]);
     
    
    const LoadRecipes = async() => {setPopular(await getPopular())}

    useEffect(() => {
        LoadRecipes();
      
    },[])
   
    return(
        <>
        {/* <Searchbar submited={submited} setSubmited={setSubmited} search={search} setSearch={setSearch} 
        options={options} setOptions={setOptions} setSearchedRecipies={setSearchedRecipies}
         setTotal={setTotal} defaultOptions={defaultOptions} /> */}
        {/* {submited? <Searched search={search} options={options} total={total} 
                  searchedRecipies={searchedRecipies} setSearchedRecipies={setSearchedRecipies} />  */}
           <div className='main-container'>
            <div className='popular'>
                <div className='fline'>
                <h1 className='popular-title'>Popular Recipes worldwide</h1>
                <Link to="/populars" className='seeAll'>See More</Link> 
                </div>
                <div className='pop-recipes'>
                    {popular.recipes?.slice(0,6).map((recipe) => {
                        return(<RecipeCard key={recipe.id} recipe={recipe}></RecipeCard>
                      );                        
                    })}  
                    </div>                            
            </div>
            <div className='popular'>
             <GeoRecipes limit={6}></GeoRecipes> 
           </div>
        </div>
        
        </>
    )
}