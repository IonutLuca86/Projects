/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import './RecipeCard.css'
import { FaRegClock , FaPizzaSlice} from 'react-icons/fa'
import ImageCheck from '../components/ImageCheck'
import comingSoon from '../assets/coming-soon.png'




function truncate(input) {      
        return input.slice(0,20)+"...";
}

const Vegetarian = () => {return (<><p className="vegetarian">Vegetarian</p></>)}
const Vegan = () => {return (<><p className="vegan">Vegan</p></>)}
const Gluten = () => {return (<><p className="gluten">GlutenFree</p></>)}
const Dairy = () => {return (<><p className="dairy">DairyFree</p></>)}
const VHealthy = () => {return (<><p className="vhealthy">VeryHealthy</p></>)}
const Cheap = () => {return (<><p className="cheap">Cheap</p></>)}
        
    
 const RecipeCard = ({recipe,setShowSearchBar}) => {  
    
    console.log(recipe) 
   
return (
    <div className="card-container">
        <Link to={"/recipe/"+ recipe.id} className="card-link" onClick={() => setShowSearchBar(false)}>
        <div className="card-img">
        <img src={ImageCheck(recipe)?   recipe.image: comingSoon} 
                           className='recipe-image'></img>
        <div className="tags">
                {recipe.vegetarian? <Vegetarian />:<></>}
                {recipe.vegan? <Vegan />:<></>}
                {recipe.glutenFree? <Gluten />:<></>}
                {recipe.dairyFree? <Dairy />:<></>}
                {recipe.veryHealthy? <VHealthy />:<></>}
                {recipe.cheap? <Cheap />:<></>}
            </div> 
                   
        </div> 
        <div className="card-info">
            <div><p className="recipe-card-title">
                {recipe.title.length < 20? recipe.title:truncate(recipe.title)}</p>
            </div>
            
            <div className="servings">
                <div className="time">
                    <FaRegClock />
                    <h5 className="text">{recipe.readyInMinutes} min</h5>
                </div>
                <div className="portions">
                    <FaPizzaSlice />
                    <h5 className="text">{recipe.servings}</h5>
                </div>
                
            </div>
            </div>       
            
       
        
        </Link>
    </div>
)
}


export default RecipeCard;