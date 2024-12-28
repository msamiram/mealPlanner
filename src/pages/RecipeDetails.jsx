import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../styles/RecipeCard.css";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=388fb8e890054971b0ebf1a0c63fbc44`);
        setRecipe(response.data);
      } catch (err) {
        setError('Failed to fetch recipe details.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!recipe) {
    return <div>Recipe not found!</div>;
  }

  return (
    <div >
      <h1 className='details-title' >{recipe.title}</h1>
      <div className="recipe-details">
        <img className='details-img' src={recipe.image} alt={recipe.title} />
        <div className='instructions'>
          <h3>Instructions:</h3>
          <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} /></div>
        <div className='ingridients'>
          <h3 className='details-ingridients' >Ingredients:</h3>
          <ul>
            {recipe.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;


