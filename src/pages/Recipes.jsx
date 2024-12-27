import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fetchMealsFromAPI } from "../api/mealsSearchAPI"; // Ensure the correct import path
import "../styles/Recipes.css";



const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [mealType, setMealType] = useState("");
  const [diet, setDiet] = useState("");
  const [caloriesRange, setCaloriesRange] = useState([0, 500]);
  const [ingredients, setIngredients] = useState("");
  const [excludeIngredients, setExcludeIngredients] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState(
    JSON.parse(sessionStorage.getItem("favorites")) || []
  );

  const fetchRecipes = async () => {
    try {
      setIsLoading(true);
      setError("");

      const meals = await fetchMealsFromAPI({
        query: search,
        diet: diet,
        mealType: mealType,
        minCalories: caloriesRange[0],
        maxCalories: caloriesRange[1],
        cuisine: cuisine,
        ingredients: ingredients,
        excludeIngredients: excludeIngredients,
      });

      setRecipes(meals);
    } catch (err) {
      setError(err.message || "Failed to fetch recipes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes();
  };

 
  const addToFavorites = (recipe) => {
    if (!favorites.some((fav) => fav.id === recipe.id)) {
      const updatedFavorites = [...favorites, recipe];
      setFavorites(updatedFavorites);
      sessionStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const isFavorite = (recipeId) => {
    return favorites.some((fav) => fav.id === recipeId);
  };

  return (
    <div className="recipes-container">
      <h1>Recipe Finder</h1>
      <div className="search-bar-container">
        <div className="search-filter">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
          
        />
        <button
          className="filter-icon"
          onClick={() => setFiltersVisible(!filtersVisible)}
        >
          🔍
        </button>
        </div>
        <button className="search-button" onClick={handleSearch}>Search</button>

      </div>

      {filtersVisible && (
        <div className="filter-options">
          <select
            onChange={(e) => setMealType(e.target.value)}
            value={mealType}
          >
            <option value="">Select Meal Type</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
          <select onChange={(e) => setDiet(e.target.value)} value={diet}>
            <option value="">Select Diet</option>
            <option value="keto">Keto</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten free">Gluten Free</option>
            <option value="paleo">Paleo</option>
          </select>
          <select
            onChange={(e) => setCuisine(e.target.value)}
            value={cuisine}
          >
            <option value="">Select Cuisine</option>
            <option value="italian">Italian</option>
            <option value="mexican">Mexican</option>
            <option value="indian">Indian</option>
          </select>
          <div className="calories-range">
            <input
              type="number"
              min="0"
              max="1000"
              value={caloriesRange[0]}
              onChange={(e) => {
                const value = e.target.value;
                setCaloriesRange([value === "" ? "" : Number(value), caloriesRange[1]]);
              }}
              placeholder="Min Calories"
            />
            <input
              type="number"
              min="0"
              max="1000"
              value={caloriesRange[1]}
              onChange={(e) => {
                const value = e.target.value;
                setCaloriesRange([caloriesRange[0], value === "" ? "" : Number(value)]);
              }}
              placeholder="Max Calories"
            />
          </div>
          <div className="ingredients-input">
            <input
              type="text"
              placeholder="Include ingredients (comma-separated)..."
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
            <input
              type="text"
              placeholder="Exclude ingredients (comma-separated)..."
              value={excludeIngredients}
              onChange={(e) => setExcludeIngredients(e.target.value)}
            />
          </div>
          <button onClick={fetchRecipes}>Apply Filters</button>
        </div>
      )}

      <div className="recipes-list">
        {isLoading && <div className="loading">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.title || "Recipe"} />
              
              <Link to={`/recipe/${recipe.id}`}><h3>{recipe.title || "Recipe Title"}</h3></Link>
              <button
                className="favorite-button"
                onClick={() => addToFavorites(recipe)}
                disabled={isFavorite(recipe.id)}
              >
                {isFavorite(recipe.id) ? "+" : "+"}
              </button>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipes;
