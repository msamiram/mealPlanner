
export const fetchMealsFromAPI = async ({
    query = '',
    diet = '',
    mealType = '',
    minCalories = 0,
    maxCalories = 500,
    cuisine = '',
    ingredients = '',
    excludeIngredients = ''
  }) => {
    const apiKey = '388fb8e890054971b0ebf1a0c63fbc44'; 
    let url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&diet=${diet}&mealType=${mealType}&minCalories=${minCalories}&maxCalories=${maxCalories}&cuisine=${cuisine}&apiKey=${apiKey}&number=30`;
  
    if (ingredients) {
      url += `&includeIngredients=${ingredients.replace(/\s+/g, "")}`;
    }
  
    if (excludeIngredients) {
      url += `&excludeIngredients=${excludeIngredients.replace(/\s+/g, "")}`;
    }
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching meals:', error);
      throw error;
    }
  };
  


  