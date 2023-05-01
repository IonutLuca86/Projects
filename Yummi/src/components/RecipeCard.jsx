import { Link } from "react-router-dom";
import './RecipeCard.css'

 const RecipeCard = ({props}) => {
   
return (
    <div className="card-container">
        <Link to={"/recipes/" +props.id } >
        <img src={props.image} alt="recipe"  className="recipe-image"></img>
        <div className="recipe-info">
            <h2 className="recipe-title">{props.title}</h2>
            <div className="servings">
                <h5>Time to prepare</h5>
                <h5>Servings</h5>
            </div>
        </div>
        
        </Link>
    </div>
)
}


export default RecipeCard;