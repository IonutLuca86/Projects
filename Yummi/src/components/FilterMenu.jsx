/* eslint-disable react/prop-types */

import './FilterMenu.css'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import FilterOption from './FilterOption';


function FilterMenu({trigger,setFilterTrigger,updateOptions,ClearAll}) {
    const regions = ["African","American","Asian","British","Chinese","Eastern European",
                    "European","French","German","Greek","Indian","Irish","Italian","Japanese",
                    "Latin American","Mediteranean","Mexican","Nordic","Spanish",
                    "Thai","Vietnamese"];
    const mealTypes = ["Main-Course","Side Dish","Dessert", "Appetizer","Salad",
                    "Bread","Breakfast","Soup","Beverage","Sauce","Snack","Drink"];
    const diets = ["Vegetarian","Vegan","Gluten Free","Dairy Free","Lacto-Vegetarian","Ovo-Vegetarian"];
    const intolerances = ["Dairy","Egg","Gluten","Grain","Peanut","Seafood","Sesame",
                        "Shellfish","Soy","Sulfite","Tree Nut","Wheat"];
    
  
    

  return (
    trigger ? 
    <div className="filter-container">
    <div className='filter-close-container'>
        <button onClick={() => setFilterTrigger(!trigger)} className='filter-close-button'><AiOutlineCloseCircle className='filter-close-icon'/></button>
        <h2 className='filter-title'>Filter menu</h2>
    </div>  
    <div className='filter-options'>
        <FilterOption title={"Regions"} option={regions} updateOptions={updateOptions}></FilterOption>
        <FilterOption title={"MealTypes"} option={mealTypes} updateOptions={updateOptions}></FilterOption> 
        <FilterOption title={"Diets"} option={diets} updateOptions={updateOptions}></FilterOption>
        <FilterOption title={"Intolerances"} option={intolerances} updateOptions={updateOptions}></FilterOption>  
    </div>
      <div className='clear-button'>
        <button id="clearFilters"  className='clearBtn' onClick={() =>ClearAll()}>Clear All Filters</button>
      </div>
    </div> : "" 
  )
}

export default FilterMenu
