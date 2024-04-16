import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';

import Navbar from './components/Navbar'
import ListMovies from './components/ListMovies'
import Favorites from './components/Favorites'
import ItemPage from './components/ItemPage'

import './App.css'
import React,{useState} from 'react'
import {FavoritesProvider} from './context/FavoritesContext'


function App() {
  const [list,setList] = useState([])
   
  const search = async (name,page) => {
    const api_url = `${import.meta.env.VITE_API_URL}/?apikey=${import.meta.env.VITE_API_KEY}&s=${name}&page=${page}`;
    const res = await fetch(api_url);
    const data = await res.json();
    
    setList(data.Search);
  }
  return (
    <Router>
    <FavoritesProvider >
    <Navbar search={search}  />
    
      <Routes>
        <Route path="/" exact element={<ListMovies list={list} search={search} />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/item/:imdbID" element={<ItemPage/> } />
      </Routes>
    
  </FavoritesProvider > 
  </Router>
  )
}

export default App
