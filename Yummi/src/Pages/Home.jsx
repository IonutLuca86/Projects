import { useState,useEffect } from 'react'
import './Home.css'
import RecipeCard from '../components/RecipeCard'
import '@splidejs/react-splide/css';
import GeoRecipes from '../components/GeoRecipes';
import Searchbar from '../components/Searchbar';
import Searched from './Searched';

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
    
    const getPopular = async () => {
    const apiKey = 'f27d562bd85b4cd5a482eb0b9108beeb';
    try {
        const localPop = sessionStorage.getItem('popRecipes');
      if(localPop) 
        setPopular(JSON.parse(localPop))
      else {
        const url = `https://api.spoonacular.com/recipes/random?number=50&apiKey=${apiKey}`;
        const response = await fetch(url);
        const result = await response.json();               
        setPopular(result);
        console.log(result.recipes)
        sessionStorage.setItem('popRecipes', JSON.stringify(result));
        }        
      } catch (e) {
        console.log(e);
      }
    }

    useEffect(() => {
        getPopular()
      
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