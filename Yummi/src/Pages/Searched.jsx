import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import './Searched.css'


export default function Searched() {
    const [searchedRecipies, setSearchedRecipies] = useState([]);
    let params = useParams();

    const getRecipes = async (search) => {
    const apiKey = '27bb6d5c926f4d7a9031e952cb4c9849';
    try {
        const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${search}&addRecipeInformation=true&number=40`;
        const response = await fetch(url);
        const result = await response.json();               
        setSearchedRecipies(result.results);
        console.log(result.results);
      } catch (e) {
        console.log(e);
      }
    }

    useEffect(() => {
        getRecipes(params.search)
    },[params.search])

    

    return(
        <>
        <div className="recipes-container">
            {searchedRecipies.map((recipe) => {
                return(                    
                      <RecipeCard key={recipe.id} props={recipe} />                  
                   
                );
                
            })}            
        </div>
        </>
    )

}