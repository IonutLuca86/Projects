export default async function GetRecipes(query,options,offset) {
  console.log(offset)  
  let cuisine = options.regions.join(',');
  let mealtype = options.mealtypes.join(',');
  let diet = options.diets.join(',');
  let intolerances = options.intolerances.join(',');
  let recipes;
     try {
      const local = sessionStorage.getItem(`${query+cuisine+mealtype+diet+intolerances}`);
      if(local) 
        recipes = (JSON.parse(local))
      else {
        const ApiKey = '27bb6d5c926f4d7a9031e952cb4c9849';
        const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${ApiKey}`
      +`&query=${query}&cuisine=${cuisine}&` +
        `type=${mealtype}&` +
        `diet=${diet}&` +
        `intolerances=${intolerances}&` +
        `addRecipeInformation=true&addRecipeNutritionadd=true&fillIngredients=true&number=28&offset=${offset}`;
        const data = await fetch(url);
        recipes = await data.json();        
        console.log(recipes.results)
        sessionStorage.setItem(`${query+cuisine+mealtype+diet+intolerances}`, JSON.stringify(recipes))
      }
    }
    catch(e) {console.log(e)}
    return recipes;
  }