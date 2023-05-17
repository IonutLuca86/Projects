/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import './RecipeCard.css'
import { FaRegClock , FaPizzaSlice} from 'react-icons/fa'


function truncate(input) {
    if (input.length <= 22)
        return input;
    else    
        return input.slice(0,22)+"...";
}

 const RecipeCard = ({props}) => {  
     
   
return (
    <div className="card-container">
        <Link to={"/recipe/"+ props.id} >
        <img src={props.image} alt="recipe"  className="recipe-image"></img>
        <div className="recipe-description">
            <div><p className="recipe-title">
                {truncate(props.title)}</p></div>
            
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