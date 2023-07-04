import React, { useState } from 'react';
import './inputIngredients.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const BASE_URL = 'http://localhost:8000';

const InputIngredients = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const cookies = new Cookies();
  const userId = cookies.get("today")
  // const userId = "test-person"

  useEffect(() => {
    refreshList();
    console.log(userId)
  }, [])

  const refreshList = () => {
    axios
      .get(`${BASE_URL}/api/groceries/?user=${userId}`)
      .then((response) => {
        // Extract the ingredients field from each element in the array
        setItems(response.data.flatMap((element) => element.ingredients));
    
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
      const updatedItems = [...items, inputValue];
      setInputValue('');
      setItems(updatedItems);
      handleSaveItems(updatedItems);
    }
  };

  const handleSaveItems = async (items) => {
    try {
      const clonedItems = [...items];
      await updateUserArray(clonedItems);
      console.log('Array updated successfully');
    } catch (error) {
      console.error('Error updating user array:', error);
    }
  };

  async function updateUserArray(arr) {
    try {
      // Check if the user exists
      const response = await axios.get(`${BASE_URL}/api/groceries/?user=${userId}`);
      const user = response.data[0]; 
  
      if (user) {
        // User exists, update the array
        user.ingredients = arr;
        await axios.put(`${BASE_URL}/api/groceries/${user.id}/`, {ingredients: user.ingredients});
        console.log('Array updated successfully.');
      } else {
        // User doesn't exist, create a new user
        const newUser = {
          user: userId,
          ingredients: arr,
          recipeURL: []
        };
        await axios.post(`${BASE_URL}/api/groceries/`, newUser);
        console.log('New user created successfully.');
      }
    } catch (error) {
      console.error('Error updating user array:', error);
    }
  }

  const handleDeleteItem = (deleteItem) => {
    const updatedItems = items.filter((item) => item !== deleteItem);
    setItems(updatedItems);
    console.log(updatedItems);
    handleSaveItems(updatedItems);
  }

  const ItemComponent = ({ item, onDelete, index }) => {
    return (
      <div className = "Ingredient" key = {index}>
          <li>{item}</li>
          <button className = "list-button" onClick={() => onDelete(item)}></button>
      </div>
    );
  };

  return (
    <div className = "Input-Container">
      <div className = "Add-Ingredient">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="enter an item"
        />
        <button onClick={handleAddItem}>
          add
        </button>
      </div>
      <div className="Item-List">
        <ul>
          {items.length > 0 ? (
            items.map((item, index) => (
              <ItemComponent item = {item} onDelete = {handleDeleteItem} index = {index}/>
            ))
          ) : (
            <p>no items yet</p>
          )}
        </ul>
      </div>
      <div className = "Redirect">
        <Link to="/recipes">
          <Button className = "go-to-recipes Button" variant="primary">
            <span className = "link-text">go to recipes</span>
          </Button>
        </Link>
        <Link to="/login">
          <Button className = "go-to-login Button" variant="primary">
            <span className = "link-text">input a new date</span>
          </Button>
        </Link>
      </div>
      
    </div>
  );
}

export default InputIngredients;