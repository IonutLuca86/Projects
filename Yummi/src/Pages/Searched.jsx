import { useEffect, useState } from "react";
import GetRecipes from "../components/GetRecipes";
import RecipeCard from "../components/RecipeCard";
import './Searched.css'



let newPosts = [];
const perPage = 28;

export default function Searched({search,options,total,searchedRecipies,setSearchedRecipies}) {
      

    const [sortType, setSortType] = useState("");
    const [isSorted,setIsSorded] = useState(false)
    const [orderedList,setOrderedList] = useState([]);
    const [next,setNext] = useState(perPage);
    
   
    useEffect(() => {      
        UpdateRecipes(sortType);
       
    },[sortType])
      // useEffect(() => {
      //   setIsSorded(isSorted);
      // },[isSorted])

    const getMore =async (end) => {           
            const newRecipes = await GetRecipes(search,options,end);
            newPosts = searchedRecipies.concat(newRecipes);
            setSearchedRecipies(newPosts);
                }
const handleClick = () => {
    getMore(next+perPage);
    setNext(next+perPage)
   
}
  
 
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'      
    });
  };
  
   const UpdateRecipes = (type) => { 
    let sorted;
    switch(type) {
      case 'title1':
         sorted = [...searchedRecipies].sort((a,b) => a.title < b.title? -1:1);
        setOrderedList(sorted);
        setIsSorded(!isSorted);
        break;
      case 'title2':
        sorted = [...searchedRecipies].sort((a,b) => a.title < b.title? 1:-1);
        setOrderedList(sorted);
        setIsSorded(true);
        break;
      case 'time1':
        sorted = [...searchedRecipies].sort((a,b) => a.readyInMinutes < b.readyInMinutes? -1:1);
        setOrderedList(sorted);
        setIsSorded(true);
        break;
      case 'time2':
        sorted = [...searchedRecipies].sort((a,b) => a.readyInMinutes < b.readyInMinutes? 1:-1);
        setOrderedList(sorted);
        setIsSorded(true);
        break;
        case 'servings1':
        sorted = [...searchedRecipies].sort((a,b) => a.servings < b.servings? -1:1);
        setOrderedList(sorted);
        setIsSorded(true);
        break;
      case 'servings2':
        sorted = [...searchedRecipies].sort((a,b) => a.servings < b.servings? 1:-1);
        setOrderedList(sorted);
        setIsSorded(true);
        break;
    }
    } 
    
    return(
        <>
        <div className="top-container">
            <p className="total"><b><i>{total}</i></b> recipes found</p>
            <div className="sort-menu">
                <p className="total">Sort by</p>
                <select defaultValue={'none'} className='select' 
                    onChange={(e) => setSortType(e.target.value)}>
                    <option value="none" disabled>None</option>
                    <option value="title1">Title Ascending</option>
                    <option value="title2">Title Descending</option>
                    <option value="time1">Time Ascending</option>
                    <option value="time2">Time Descending</option>
                    <option value="servings1">Portions Ascending</option>
                    <option value="servings2">Portions Descending</option>
                </select>  
            </div>
        </div>
        <div className="recipes-container">
            {isSorted? orderedList.map((recipe,index) => {
                return(                    
                      <RecipeCard key={index} props={recipe} />   
                );                
            }) : searchedRecipies.map((recipe,index) => {
                return(                    
                      <RecipeCard key={index} props={recipe} />   
                );                
            })}            
        </div>
        <div className="loadmore">
            <p className="total">{next}/{total}</p>
            <div className="buttons">
            <button onClick={handleClick} className="loadbtn">Load More</button>
            <button onClick={scrollToTop} className="loadbtn">Back To Top</button>
            </div>
            
        </div>
        </>
    )

}