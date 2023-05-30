/* eslint-disable react/prop-types */
import { useState,useEffect } from "react";
import GetRecipes from "./GetRecipes";
import RecipeCard from "./RecipeCard";
import './SearchedRecipes.css'

let newPosts = [];
const perPage = 28;

function SearchedRecipes({search,options,total,searchedRecipies,setSearchedRecipies,setShowSearchBar}) {
    
    const [sortType, setSortType] = useState("");
    const [isSorted,setIsSorded] = useState(false)
    const [orderedList,setOrderedList] = useState([]);
    const [next,setNext] = useState(perPage);
    
    
    
  
    
    useEffect(() => {      
        UpdateRecipes(sortType);              
    },[sortType])

   useEffect(() => {
    UpdateRecipes(sortType)
   },[searchedRecipies])
    
    const getMore =async (offset) => { 
            let oldRecipes  = searchedRecipies;                 
            const newRecipes = await GetRecipes(search,options,offset);
            console.log(newRecipes.results)
            newPosts = oldRecipes.concat(newRecipes.results);            
            setSearchedRecipies(newPosts);
           
                }
const handleClick = () => { 
     getMore(next);
     setNext(next+perPage);    
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
   console.log(orderedList)
    return(
        <>
        <div className="top-container">
            <p className="total"><b><i>{total}</i></b> recipes found for <i>{search}</i></p>
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
                      <RecipeCard key={index} recipe={recipe} setShowSearchBar={setShowSearchBar} />   
                );                
            }) : searchedRecipies.map((recipe,index) => {
                return(                    
                      <RecipeCard key={index} recipe={recipe} setShowSearchBar={setShowSearchBar} />   
                );                
            })}            
            
        </div>
        <div className="loadmore">
            <p className="total">{next>total? total:next}/{total}</p>
            <div className="buttons">
            <button onClick={() => handleClick()} className="loadbtn">Load More</button>
            <button onClick={scrollToTop} className="loadbtn">Back To Top</button>
            </div>
            
        </div>
        </>
    )

}

export default SearchedRecipes
