/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners';
import RecipeCard from './RecipeCard';
import GetCuisine from './GetCuisine';
import { Link } from 'react-router-dom';


export default function GeoRecipes({limit}) {
  let cuisine;
  const [geoRecipes,setGeoRecipes] = useState([]);
  const [currCoords,setCurrCoords] = useState([]);
  const path = window.location.pathname;
  const [showButton,setShowButton] = useState(false);
  const getPath = () => {
    if(path === "/georecipes")
      setShowButton(true);
    else
      setShowButton(false)

  }


  useEffect(() => {
    LoadData(); 
    getPath();    
  },[])

  const LoadData = async () => {
    let coords = await GetCoords();
    setCurrCoords(coords);       
    let location = await GetLocation(currCoords[0],currCoords[1]);    
    cuisine = await GetCuisine(location[0],location[1]); 
    console.log(cuisine)          
    let response = await GetGeoRecipes(cuisine,20);
    console.log(response)
    setGeoRecipes(response);
  }

  async function GetGeoRecipes(cuisine) { 
  let recipes;
     try {
      const local = sessionStorage.getItem(`${cuisine}`);
      if(local) 
        recipes = (JSON.parse(local))
      else {
        const ApiKey = '27bb6d5c926f4d7a9031e952cb4c9849';
        const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${ApiKey}`
        +`&cuisine=${cuisine}&number=24`;
        const data = await fetch(url);
        recipes = await data.json();        
        console.log(recipes.results)
        sessionStorage.setItem(`${cuisine}`, JSON.stringify(recipes))
      }
    }
    catch(e) {console.log(e)}
    return recipes;
  }

  async function GetCoords() {
    let latitude;
    let longitude;
    navigator.geolocation.getCurrentPosition((position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      return ([latitude,longitude]);
    })
  }
  async function GetLocation(lat,long) {
    const url = `https://api-bdc.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en&key=bdc_f4cb1400f8ae4072bc0b86a260744892`;
    const response = await fetch(url);
    const data = await response.json();
    return ([data.continent,data.countryCode]);
  }


  return (
    geoRecipes? 
    <>
    
    <div className='fline'>
                <h1 className='popular-title'>Popular Recipes from your region</h1>
                {showButton?  <></>: <Link to="/georecipes" className='seeAll'>See More</Link>} 
                </div>
    <div className='pop-recipes'>      
        {geoRecipes.results?.slice(0,limit).map(recipe => {
            return (
                <RecipeCard key={recipe.id} recipe={recipe} ></RecipeCard>
            )
        })}
      </div>
    </>
    
        
  
    : <BeatLoader className='loader'></BeatLoader>
  )

}