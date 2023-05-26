import { useState,useEffect } from 'react'
import './Home.css'
import RecipeCard from '../components/RecipeCard'
import '@splidejs/react-splide/css';
import GeoRecipes from '../components/GeoRecipes';
import Searchbar from '../components/Searchbar';
import Searched from './Searched';
import getPopular from '../components/GetPopulars';

const defaultOptions = {
    regions: [],
    mealtypes: [],
    diets: [],
    intolerances: []
}


export default function Home() {
    
    const [popular,setPopular] = useState([]);
    const [search,setSearch] = useState("");
    const [options,setOptions] = useState(defaultOptions);
    const [submited, setSubmited] = useState(false);
    const [searchedRecipies, setSearchedRecipies] = useState([]);
   
    const [total, setTotal] = useState();  
    
    const LoadRecipes = async() => {setPopular(await getPopular())}

    useEffect(() => {
        LoadRecipes();
      
    },[])
   
    return(
        <>
        <Searchbar submited={submited} setSubmited={setSubmited} search={search} setSearch={setSearch} 
        options={options} setOptions={setOptions} setSearchedRecipies={setSearchedRecipies}
         setTotal={setTotal} defaultOptions={defaultOptions} />
        {submited? <Searched search={search} options={options} total={total} 
                  searchedRecipies={searchedRecipies} setSearchedRecipies={setSearchedRecipies} /> 
          : <div className='main-container'>
            <div className='popular'>
                <h1 className='popular-title'>Popular Recipes worldwide</h1> 
                <div className='pop-recipes'>
                    {popular.recipes?.slice(0,6).map((recipe) => {
                        return(<RecipeCard key={recipe.id} props={recipe}></RecipeCard>
                      );                        
                    })}  
                    </div>                            
            </div>
            <div className='popular'>
             <GeoRecipes limit={6}></GeoRecipes> 
           </div>
        </div>}
        
        </>
    )
}