import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Favorites.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState(
    JSON.parse(sessionStorage.getItem("favorites")) || []
  );

  const removeFavorite = (recipeId) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== recipeId);
    setFavorites(updatedFavorites);
    sessionStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const savedFavorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <div className="favorites-container">
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorite recipes yet.</p>
      ) : (
        <div className="recipe-grid">
          {favorites.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.title || "Recipe"} />
              
              <Link to={`/recipe/${recipe.id}`}><h3>{recipe.title || "Recipe Title"}</h3></Link>
              <button
                className="remove-favorite-button"
                onClick={() => removeFavorite(recipe.id)}
              >
                -
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;

