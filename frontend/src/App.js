import './App.css';
import InputIngredients from './pages/inputIngredients.js';
import Recipes from './pages/recipes.js';
import Login from './pages/Login.js';
import History from './pages/history.js';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import React from 'react';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = '/' element = { <Login/> }/>
          <Route path = '/input' element = { <InputIngredients/> }/>
          <Route path = '/recipes' element = { <Recipes/> }/>
          <Route path = '/home' element = { <Login/> }/>
          <Route path = '/login' element = { <Login/> }/>
          <Route path = '/history' element = { <History/> }/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
