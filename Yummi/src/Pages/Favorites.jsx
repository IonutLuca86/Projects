import { useEffect, useState } from 'react';
import './Favorites.css'
import RecipeCard from '../components/RecipeCard';
import { Link } from 'react-router-dom';

function Favorites() {
    const [favorites,setFavorites] = useState([]);

    const getAllFavorites = () => {
        let fav = [];
        let keys = Object.keys(localStorage);
        let i= keys.length;
        while (i--) { 
            let temp = localStorage.getItem(keys[i])
            fav.push(JSON.parse(temp))}

        return fav;
    }
    useEffect(() => {
        setFavorites(getAllFavorites());
    },[])
    console.log(favorites)
  return (
    <div className='favorites-container'>
       <div className='popular'>
                <h1 className='popular-title'>Your favorit recipes</h1> 
                <div className={favorites.length<7? 'fav-recipes':'pop-recipes'}>
                    {favorites.map((recipe) => {
                        console.log(recipe)
                        return (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        )
                      
                    })}  
                    </div>                            
            </div>
    </div>
  )
}

export default Favorites
