import { useState,useEffect } from 'react'
import './Home.css'
import RecipeCard from '../components/RecipeCard'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';


export default function Home() {
    const [popular,setPopular] = useState([]);
    
    const getPopular = async () => {
    const apiKey = 'f27d562bd85b4cd5a482eb0b9108beeb';
    try {
        const url = `https://api.spoonacular.com/recipes/random?number=9&apiKey=${apiKey}`;
        const response = await fetch(url);
        const result = await response.json();               
        setPopular(result.recipes);        
      } catch (e) {
        console.log(e);
      }
    }
    //  const getRandom = async (search) => {
    // const apiKey = '27bb6d5c926f4d7a9031e952cb4c9849';
    // try {
    //     const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${search}&addRecipeInformation=true`;
    //     const response = await fetch(url);
    //     const result = await response.json();               
    //     setRecipes(result.results);
    //     console.log(result.results);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }

    useEffect(() => {
        getPopular()
    },[])
   console.log(popular)
    return(
        <div className='main-container'>
            <div className='popular'>
                <h1 className='popular-title'>Popular Recipes</h1>
                <Splide  options = {{perPage: 6,
                    breakpoints: { 
                                1680: {
                                perPage: 5,
                            },
                                1430: {
                                perPage: 4,
                            },
                                1150: {
                                perPage: 3,
                            },
                                860: {
                                perPage: 2,
                            },
                                580: {
                                perPage: 1,
                            }},
                      rewind: true, width: '90vw', gap: '0.5rem', perMove: 1
                 }}>                           
                    {popular.map((recipe) => {
                        return(                    
                            
                                <SplideSlide key={recipe.id}>
                                    <RecipeCard props={recipe}></RecipeCard>
                                </SplideSlide>                    
                      );                        
                    })}                      
              </Splide> 
           
            
            </div>
         
        </div>
    )
}