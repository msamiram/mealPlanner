import React, { useRef, useEffect } from 'react';
import '../styles/Page.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const scrollContainerRef = useRef();

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const cards = container.innerHTML;
      container.innerHTML += cards; 

      // let scrollSpeed = 2; 
      // let scrollInterval = 10; 

      // function scrollContent() {
      //   container.scrollLeft += scrollSpeed;

      //   if (container.scrollLeft >= container.scrollWidth / 2) {
      //     container.scrollLeft = 0;
      //   }
      // }

      // const intervalId = setInterval(scrollContent, scrollInterval);

      // return () => clearInterval(intervalId);
    }
  }, []);

  const diets = [
    { name: 'Keto Diet', description: 'Low-carb, high-fat diet for weight loss and focus.', image: 'https://github.com/msamiram/mealPlanner/blob/main/public/images/keto.jpg?raw=true', link: 'https://en.wikipedia.org/wiki/Ketogenic_diet' },
    { name: 'Vegan Diet', description: 'Plant-based diet, rich in fiber and nutrients.', image: 'https://github.com/msamiram/mealPlanner/blob/main/public/images/vegan.jpg?raw=true', link: 'https://en.wikipedia.org/wiki/Veganism' },
    { name: 'Paleo Diet', description: 'Eat whole foods like lean meats, fish, and veggies.', image: 'https://github.com/msamiram/mealPlanner/blob/main/public/images/paleo.jpg?raw=true', link: 'https://en.wikipedia.org/wiki/Paleolithic_diet' },
    { name: 'Gluten-Free Diet', description: 'Avoid gluten while enjoying delicious meals.', image: 'https://github.com/msamiram/mealPlanner/blob/main/public/images/gluten.jpg?raw=true', link: 'https://en.wikipedia.org/wiki/Gluten-free_diet' },
  ];

  const featuredRecipes = [
    { id: 1, name: 'Grilled Veggie Delight', description: 'A quick and easy recipe packed with the freshness of grilled vegetables', image: 'https://github.com/msamiram/mealPlanner/blob/main/public/images/rec1.jpg?raw=true' },
    { id: 2, name: 'Mediterranean Chicken Platter', description: 'A tender chicken withbseasoned vegetables, and herbs.', image: 'https://github.com/msamiram/mealPlanner/blob/main/public/images/rec2.jpg?raw=true' },
    { id: 3, name: 'Spicy Chicken Skewers', description: 'Tasty and juicy chicken skewers marinated with spices.', image: 'https://github.com/msamiram/mealPlanner/blob/main/public/images/rec3.jpg?raw=true' },
  ];


  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Your Gateway to Delicious Recipes!</h1>
          <p className="hero-description">Discover recipes that nourish your body and delight your taste buds. Enjoy healthy eating with Meal Planner!</p>
          <div className="hero-buttons">
            <Link to="/planner" className="meal-plan-link">
              <button className="btn btn-primary">Meal Plan</button></Link>
            <Link to="/recipes" className="meal-plan-link">
              <button className="btn btn-secondary">Explore Recipes</button></Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://github.com/msamiram/mealPlanner/blob/main/public/images/img1.png?raw=true" alt="Delicious Food" className="image" />
        </div>
      </div>

      <div className="recipe-preview-section">
        <h2 className="section-title">Featured Recipes</h2>
        <div className="recipe-carousel">
          {featuredRecipes.map((recipe, index) => (
            <div key={index} className={`recipe-card-home ${index === 1 ? 'center-card' : ''}`}>
              <div className="card-image-container">
                <img src={recipe.image} alt={recipe.name} className="card-image" />
              </div>
              <div className="card-content">
                <h3 className="card-title">{recipe.name}</h3>
                <p className="card-description">{recipe.description}</p>
                <div className="card-footer">
                <Link to="/recipes" className="meal-plan-link"><button className="btn-add">+</button></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>

        <div className='diet-section'>
          <img className="spagetti-img" src="https://github.com/msamiram/mealPlanner/blob/main/public/images/img2.png?raw=true" alt="Delicious Food" />
          <div className="diet-desc-card">
            <div><h2 className="section-title">Explore Popular Diets</h2>
              <p className="section-description">Discover meal plans tailored to your lifestyle and health goals.</p></div>
            <div className="diets-cards" ref={scrollContainerRef}>
              {diets.map((diet, index) => (
                <div className="diet-card" key={index}>
                  <img src={diet.image} alt={diet.name} className="card-image" />
                  <h3>{diet.name}</h3>
                  <p>{diet.description}</p>
                  <a href={diet.link} className="btn btn-primary">Learn More</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="week-meal-plan">
        <h2 className="section-title">Discover our</h2>
        <div className="discover-links">
          <Link to="/recipes" className="meal-plan-link">
            <div className="discover-icon">
              <img className='discover-img' src="https://github.com/msamiram/mealPlanner/blob/main/public/images/recipes.png?raw=true" alt="" />
            </div>
          </Link>
          <Link to="/planner" className="meal-plan-link">
            <div className="discover-icon">
              <img className='discover-img' src="https://github.com/msamiram/mealPlanner/blob/main/public/images/planner.png?raw=true" alt="" />
            </div>
          </Link>
          <Link to="/favorites" className="meal-plan-link">
            <div className="discover-icon">
              <img className='discover-img' src="https://github.com/msamiram/mealPlanner/blob/main/public/images/favorites.png?raw=true" alt="" />
            </div>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Home;

