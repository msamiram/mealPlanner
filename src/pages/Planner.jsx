
import React, { useState, useEffect, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '../styles/Planner.css';
import { fetchMealsFromAPI } from '../api/mealsSearchAPI';
import { Link } from 'react-router-dom';



const ItemTypes = {
  MEAL: 'meal',
};



const MealCard = ({ meal, onDelete, showDeleteButton = true }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.MEAL,
    item: meal,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className={`meal-card ${isDragging ? 'dragging' : ''}`}>
      <img src={meal.image} alt={meal.title} className="meal-image" />
      <h5>
        <Link to={`/recipe/${meal.id}`}>{meal.title}</Link>
      </h5>
      {showDeleteButton && <button onClick={onDelete}>-</button>}
    </div>
  );
};





const MealSlot = ({ meal, onDrop, onDelete }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.MEAL,
    drop: (droppedMeal) => onDrop(droppedMeal),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={`meal-slot ${isOver ? 'hover' : ''}`}>
      {meal ? (
        <MealCard meal={meal} onDelete={onDelete} />
      ) : (
        <div className="drag-plus">
          <p>+</p>
        </div>
      )}
    </div>
  );
};

const Planner = () => {
  const [diet, setDiet] = useState('');
  const [mealType] = useState('');
  const [mealPlan, setMealPlan] = useState(() => {
    const savedPlan = localStorage.getItem('mealPlan');
    return savedPlan
      ? JSON.parse(savedPlan)
      : Array(7).fill({ breakfast: null, lunch: null, dinner: null, snacks: null });
  });
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
  }, [mealPlan]);

  const fetchMeals = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const fetchedMeals = await fetchMealsFromAPI({ query: searchQuery, diet, mealType });
      setMeals(fetchedMeals);
      setFilteredMeals(fetchedMeals);
    } catch (err) {
      setError('Failed to fetch meals. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, diet, mealType]);


  const shuffleArray = (array) => {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  };

  const generateMealPlan = () => {
    const shuffledMeals = shuffleArray(meals);

    if (shuffledMeals.length === 0) {
      alert('No meals found for the selected diet and meal type.');
      return;
    }

    const plan = Array(7).fill(null).map(() => ({
      breakfast: shuffledMeals.pop() || null,
      lunch: shuffledMeals.pop() || null,
      dinner: shuffledMeals.pop() || null,
      snacks: shuffledMeals.pop() || null,
    }));

    setMealPlan(plan);
  };

  const addMealToSlot = (meal, dayIndex, mealSlot) => {
    setMealPlan((prevPlan) =>
      prevPlan.map((day, index) =>
        index === dayIndex ? { ...day, [mealSlot]: meal } : day
      )
    );
  };


  const deleteMealFromSlot = (dayIndex, mealSlot) => {
    setMealPlan((prevPlan) =>
      prevPlan.map((day, index) =>
        index === dayIndex ? { ...day, [mealSlot]: null } : day
      )
    );
  };


  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query) {
      setFilteredMeals(meals);
    } else {
      const filtered = meals.filter((meal) =>
        meal.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMeals(filtered);
    }
  };


  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="planner">
        <div className="preferences">
          <select id="diet" value={diet} onChange={(e) => setDiet(e.target.value)}>
            <option value="">Select diet</option>
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="gluten free">Gluten Free</option>
            <option value="keto">Keto</option>
          </select>
          <button className='search-button' onClick={generateMealPlan}>Generate Meal Plan</button>
        </div>




        <div className="planner-container">
          <div className="week-view">
            {mealPlan.map((day, index) => (
              <div key={index} className="day">
                <h3>{weekdays[index % 7]}</h3>
                <div className="meal-slot-container">
                  {['breakfast', 'lunch', 'dinner', 'snacks'].map((mealSlot) => (
                    <MealSlot
                      key={mealSlot}
                      meal={day[mealSlot]}
                      onDrop={(meal) => addMealToSlot(meal, index, mealSlot)}
                      onDelete={() => deleteMealFromSlot(index, mealSlot)}
                    />

                  ))}

                </div>
              </div>
            ))}
          </div>
          <div className="sidebar">
            <h4>Available Meals</h4>
            <input
              type="text"
              placeholder="Search meals..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {isLoading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            {filteredMeals.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                showDeleteButton={false} 
              />
            ))}
          </div>


        </div>

      </div>
    </DndProvider>
  );
};

export default Planner;
