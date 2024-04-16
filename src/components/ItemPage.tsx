import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { FavoritesContext } from '../context/FavoritesContext';

const ItemPage = () => {
  const { imdbID } = useParams(); // Get the imdbID from the URL params
  const [item, setItem] = useState(null);
  const { favorites, dispatch } = useContext(FavoritesContext);
  const [isFavorite, setIsFavorite] = useState(false);

  // Function to fetch item details based on imdbID
  const fetchItemDetails = async () => {
    try {
      const api_url = `${import.meta.env.VITE_API_URL}/?apikey=${import.meta.env.VITE_API_KEY}&i=${imdbID}`;
      const res = await fetch(api_url);
      const data = await res.json();
      setItem(data);
    } catch (error) {
      console.error('Error fetching item details:', error);
    }
  };

  // Check if the current item is already in favorites
  useEffect(() => {
    setIsFavorite(favorites.some((fav) => fav.imdbID === imdbID));
  }, [favorites, imdbID]);

  // Function to add or remove item from favorites
  const toggleFavorite = () => {
    if (isFavorite) {
      // Remove item from favorites
      dispatch({ type: 'REMOVE', item: { imdbID: imdbID } });
    } else {
      // Add item to favorites
      dispatch({ type: 'ADD', item: { imdbID: imdbID, title: item?.Title || '' } });
    }
  };

  // Fetch item details when component mounts
  useEffect(() => {
    fetchItemDetails();
  }, []); // Only run once when component mounts

  return (
    <Box>
      {item ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                height="auto"
                image={item.Poster}
                alt={item.Title}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h4">{item.Title}</Typography>
              <Typography>{item.Year}</Typography>
              <Typography>{item.Plot}</Typography>
              <Typography>Awards: {item.Awards}</Typography>
              <Typography>Director: {item.Director}</Typography>
              <Typography>Actors: {item.Actors}</Typography>
              <Typography>Genre: {item.Genre}</Typography>
              <Typography>Language: {item.Language}</Typography>
              <Typography>Runtime: {item.Runtime}</Typography>
              <Typography>Released: {item.Released}</Typography>
              <Typography>IMDB Rating: {item.imdbRating}</Typography>
              <Button onClick={toggleFavorite}>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</Button>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
};

export default ItemPage;
