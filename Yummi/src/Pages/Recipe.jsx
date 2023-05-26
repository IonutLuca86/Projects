/* eslint-disable react/prop-types */

import './Recipe.css'
import {  useParams } from 'react-router-dom'
import { useState,useEffect } from 'react';
import parse from 'html-react-parser'
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners';

const Similars = () => {
const params = useParams();
    const [similars, setSimilars] = useState([]);
    const getSimilars = async (id) => {
    const apiKey = '95c09065f6a64154ab4d56a5ef9c980d';
    try {
        const url = `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${apiKey}`;
        const response = await fetch(url);
        const result = await response.json();               
        setSimilars(result);        
      } catch (e) {
        console.log(e);
      }
    }
      useEffect(() => {        
        getSimilars(params.id)
    },[])
    return (
        similars ?
        <>
        <h2 className='ingredients-title'>Similars Recipes:</h2>
         <hr className='solid' />       
                    <ul className='list'>
                            {similars.map((similar) =>
                                
                                <li key={similar.id} >
                                    <Link to={"/recipes/" + similar.id} reloadDocument className='similar'>
                                        {similar.title}</Link></li>                          
                          )}                        
              </ul>
                </> : <></>
    )
}

const Wines = ({props}) => {
    if(Object.keys(props).length === 0 || props.pairingText === '')
    return(
        <></>
    )
    else
        return (
        props ?
        <div className='wine-container'>
        <h2 className='recipe-title'>Wine suggestion:</h2>
        <h4>{props.pairingText} </h4>                      
                    <ul className='list'>
                            {props.productMatches.map((wine) =>                                
                                <div key={wine.id} className='wineCard'>                                    
                                        <img src={wine.imageUrl} alt="wine"></img>
                                        <a href={wine.link} target='_blank' className='wineLink' rel="noreferrer">{wine.title}</a>                                                             
                                </div>    
                        )}                        
              </ul>
               </div> : <></>
    )
}

export default function Recipe() {
    
    const params = useParams();   
    const [recipe,setRecipe] =useState();
    const [wineList, setWineList] = useState();
    const [btnIngredients,setBtnIngredients] = useState(true);
    const [btnInstructions,setBtnInstructions] = useState(false);
    const [btnSimilars,setBtnSimilars] = useState(false);

    const getRecipe = async (id) => {
    const apiKey = '27bb6d5c926f4d7a9031e952cb4c9849';
    try {
        const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&includeNutrition=true`;
        const response = await fetch(url);
        const result = await response.json();               
        setRecipe(result);
        setWineList(result.winePairing) 
        console.log(result)       
      } catch (e) {
        console.log(e);
      }
    }

  

    useEffect(() => {
        getRecipe(params.id)               
    },[])  

    const summary = '<h3>'+recipe?.summary.split('. ',1)+'</h3>'; // splits and saves the first sentence of summary atribute of the recipe
    
    const Ingredients = () => {
        return (
                <div className='ingredients'>           
                        <h2 className='ingredients-title'>Ingredients : </h2> 
                        <hr className='solid' />           
                    <div>
                        <ul className='list'>
                            {recipe.extendedIngredients.map((ingredient) =>
                                <li key={ingredient.id} className='list-element'>{ingredient.original}</li>
                            )}                        
                        </ul>
                        </div>
                        </div>
        )
    }
    const Instructions = () => {
        return (
            <div className='instructions' >            
                        <h2 className='ingredients-title'>Instructions : </h2> 
                        <hr className='solid' />            
                    <div>
                        <ol className='list'>
                            {recipe.analyzedInstructions.map((instruction,index) => {
                                return <div key={index} >
                                    {instruction.steps.map((step) => <li key={step.number}>
                                        <span>{step.step}</span></li>)}
                                </div>
                                
                            } 
                            )}                        
                        </ol>
                        <h5>You can find more detailed information about this recipe 
                            <a href={recipe.sourceUrl} target='_blank' className='wineLink' rel="noreferrer"> here</a> !</h5>
                    </div>
                </div>       
        )
    }
    const DisplayIngredients = () => {
        setBtnIngredients(true);
        setBtnInstructions(false);
        setBtnSimilars(false);
    } 
    const DisplayInStructions = () => {
        setBtnIngredients(false);
        setBtnInstructions(true);
        setBtnSimilars(false);
    }
    const DisplaySimilars = () => {
        setBtnIngredients(false);
        setBtnInstructions(false);
        setBtnSimilars(true);
    }       
            
    

        return (
            recipe ?
            
                <div className='recipe-info'>                           
                    <div className="title-container"> 
                        <h1 className='recipe-title'>{recipe.title}</h1>
                        <div className='title-info'>                       
                            <div className='image-container'>                   
                            <img src={recipe.image} alt="recipe image"                             
                            className='recipe-img' ></img>                      
                        </div>
                            <div className='summary'>                            
                                <span className='summary-text'>{parse(summary)}</span>
                                <div className='health-info'>
                                    <div className='hinfo-border'>
                                        <h5 >Time to prepare</h5>
                                        <h4 >{recipe.readyInMinutes} minutes</h4>
                                    </div> 
                                    <div className='hinfo-border'>
                                        <h5>Servings</h5>
                                        <h4>{recipe.servings} portions</h4>
                                    </div> 
                                    <div className='hinfo-border'>
                                        <h6>Health score</h6>
                                        <h4 className='last'>{recipe.healthScore} points</h4>
                                    </div>   
                                </div> 
                                <div className='recipe-buttons'>
                                    <button className='recipe-button' onClick={DisplayIngredients}>Ingredients</button>
                                    <button className='recipe-button' onClick={DisplayInStructions}>Instructions</button>
                                    <button className='recipe-button-last' onClick={DisplaySimilars}>Similars</button>                                    
                                </div>
                                
                            </div>
                        </div> 
                        <div className='display-info'>
                                    <div className="recipe-ingredients"> 
                                        {btnIngredients && <Ingredients />}
                                        {btnInstructions && <Instructions />}
                                        {btnSimilars && <Similars />}
                                    </div>  
                                    <div className='aside'>
                                    <div className="nutrition-info" >
                                        <h3 className='nutrition-title'>Nutritions Facts : </h3>
                                        <hr className='solid'></hr>                    
                                        <p className="serving">Serving size : <span>
                                            {recipe.nutrition.weightPerServing.amount}{recipe.nutrition.weightPerServing.unit}</span></p>
                                            <hr className="light"/>
                                            <p className="caloric">Caloric breakdown: </p>
                                            <div className="caloricinfo">
                                            <p>Carbs: <span>
                                            {recipe.nutrition.caloricBreakdown.percentCarbs}%</span></p>
                                            <p>Fat: <span>
                                            {recipe.nutrition.caloricBreakdown.percentFat}%</span></p>
                                            <p>Protein: <span>
                                            {recipe.nutrition.caloricBreakdown.percentProtein}%</span></p>
                                            </div>
                                            <hr className="light"/>
                                            <div className="nutrients">
                                            {recipe.nutrition.nutrients.map((nutrient,index) => <p key={index} className="nutrient">{nutrient.name}: <span>
                                            {nutrient.amount}{nutrient.unit}</span></p> )}
                                            </div>                    
                                    
                                   
                                    </div>  
                                </div>
                                
                             
                                </div>
                    </div>
                


                
            <Wines props={wineList} />
            
          
            
            </div> : <BeatLoader className='loader' />
            
        )
   
}