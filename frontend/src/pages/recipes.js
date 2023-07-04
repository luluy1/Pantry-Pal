import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_KEY, ENGINE_ID } from '../api/key.js'
import Cookies from 'universal-cookie';
import './recipes.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const BASE_URL = "http://localhost:8000";
const cookies = new Cookies();
const userId = cookies.get("today");
// const userId = "test-person";

const RecipeSearch = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getIngredientsFromBackend();
  }, []);

  useEffect(() => {
    if (ingredients.length > 0) {
      searchRecipes();
    }
  }, [ingredients]);

  const getIngredientsFromBackend =  () => {
    try {
      axios
      .get(`${BASE_URL}/api/groceries/?user=${userId}`)
      .then((response) => {
        // Extract the ingredients field from each element in the array
        setIngredients(response.data.flatMap((element) => element.ingredients));
      })
      .catch((err) => console.log(err));
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  const searchRecipes = async () => {
    try {
      const results = [];

      for (const ingredient of ingredients) {
        const response = await axios.get(
          `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${ENGINE_ID}&q=${ingredient} recipes`
        );
      
        const recipes = response.data.items.map((item) => {
          return {
            name: item.title,
            url: item.link
          };
        });

        results.push(...recipes);
      }

      setRecipes(results);
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
  };

  return (
    <div className = "Recipe-Container">
      <h2 className = "Title" >possible recipes:</h2>
      <div className = "Buttons">
        <button className = "Search" onClick={searchRecipes}>search recipes</button>
        <Link to="/input" style={{ textDecoration: 'none' }}>
          <Button className = "go-to-input" variant="primary">go to input ingredients</Button>
        </Link>
      </div>
      {recipes.length > 0 ? (
        <ul className = "Recipe-List">
          {recipes.map((recipe, index) => (
            <div className = "Recipe">
              <li key={index}>
                <a className = "Link" href={recipe.url}>{recipe.name}</a>
              </li>
            </div>
          ))}
        </ul>
      ) : (
        <p className = "No-Recipes">no recipes found with your ingredients...</p>
      )}
    </div>
  );
};

export default RecipeSearch;
