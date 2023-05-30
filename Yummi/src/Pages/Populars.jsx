import RecipeCard from "../components/RecipeCard";
import getPopulars from '../components/GetPopulars'
import { useEffect, useState } from "react";

function Populars() {
    const [popular,setPopular] = useState([]);
    const LoadPopulars =async () => { 
            setPopular(await getPopulars())
    }
    useEffect(() => {
        LoadPopulars();
    },[])
  return (
   
      <div className='main-container'>
            <div className='popular'>
                <h1 className='popular-title'>Popular Recipes worldwide</h1> 
                <div className='pop-recipes'>
                    {popular.recipes?.map((recipe) => {
                        return(<RecipeCard key={recipe.id} props={recipe}></RecipeCard>
                      );                        
                    })}  
                    </div>                            
            </div>
            </div>
    
  )
}

export default Populars
