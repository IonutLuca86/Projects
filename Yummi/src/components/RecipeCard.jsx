/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import './RecipeCard.css'
import { FaRegClock , FaPizzaSlice} from 'react-icons/fa'


function truncate(input) {      
        return input.slice(0,20)+"...";
}

const Vegetarian = () => {return (<><p className="vegetarian">Vegetarian</p></>)}
const Vegan = () => {return (<><p className="vegan">Vegan</p></>)}
const Gluten = () => {return (<><p className="gluten">GlutenFree</p></>)}
const Dairy = () => {return (<><p className="dairy">DairyFree</p></>)}
const VHealthy = () => {return (<><p className="vhealthy">VeryHealthy</p></>)}
const Cheap = () => {return (<><p className="cheap">Cheap</p></>)}
        
    
 const RecipeCard = ({props}) => {  
     
   
return (
    <div className="card-container">
        <Link to={"/recipe/"+ props.id} className="card-link">
        <div className="card-img">
        <img src={props.image} alt="recipe"  className="recipe-image"></img>
        <div className="tags">
                {props.vegetarian? <Vegetarian />:<></>}
                {props.vegan? <Vegan />:<></>}
                {props.glutenFree? <Gluten />:<></>}
                {props.dairyFree? <Dairy />:<></>}
                {props.veryHealthy? <VHealthy />:<></>}
                {props.cheap? <Cheap />:<></>}
            </div> 
                       
        </div> 
        <div className="card-info">
            <div><p className="recipe-card-title">
                {props.title.length < 20? props.title:truncate(props.title)}</p>
            </div>
            
            <div className="servings">
                <div className="time">
                    <FaRegClock />
                    <h5 className="text">{props.readyInMinutes} min</h5>
                </div>
                <div className="portions">
                    <FaPizzaSlice />
                    <h5 className="text">{props.servings}</h5>
                </div>
                
            </div>
            </div>       
            
       
        
        </Link>
    </div>
)
}


export default RecipeCard;