const getPopular = async () => {
    let popular;
    const apiKey = 'f27d562bd85b4cd5a482eb0b9108beeb';
    try {
        const localPop = sessionStorage.getItem('popRecipes');
      if(localPop) 
        popular = JSON.parse(localPop);
      else {
        const url = `https://api.spoonacular.com/recipes/random?number=50&apiKey=${apiKey}`;
        const response = await fetch(url);
        const result = await response.json();               
        popular = result;
        console.log(result.recipes)
        sessionStorage.setItem('popRecipes', JSON.stringify(result));
        }        
      } catch (e) {
        console.log(e);
      }
      return popular;
    }

    export default getPopular