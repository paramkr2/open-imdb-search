import {  Route, Routes , useNavigate  } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/NavbarRb'
import ListMovies from './components/ListMovies'
import Favorites from './components/Favorites'
import ItemPage from './components/ItemPage'
import Footer from './components/Footer'

import './App.css'
import React,{useState} from 'react'
import {FavoritesProvider} from './context/FavoritesContext'
import { Box } from '@mui/material';

function App() {
  const [list,setList] = useState([])
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate()
  const search = async (name,page) => {
    try{
      navigate('/')
      setSearching(true)
      const api_url = `${import.meta.env.VITE_API_URL}/?apikey=${import.meta.env.VITE_API_KEY}&s=${name}&page=${page}`;
      const res = await fetch(api_url);
      const data = await res.json();
      setList(data.Search);
    }catch(err){
      console.log(err);
    }finally{
      setSearching(false)
    }
      
  }
  
  return (
    <FavoritesProvider>
      <div className='app'>
        <Navbar search={search} />
        <div class="main">
          <Routes>
            <Route path="/" exact element={<ListMovies list={list} search={search} searching={searching} setSearching={setSearching} />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/item/:imdbID" element={<ItemPage />} />
          </Routes>
          
        </div>
        <Footer/>
      </div>
    </FavoritesProvider>
  );
}

export default App
