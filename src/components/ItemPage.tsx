import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { FavoritesContext } from '../context/FavoritesContext';
import {Table,TableCell,TableRow,TableBody} from '@mui/material'



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
      console.log(data);
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
    <Box  sx={{paddingTop:'10px'}}>
      {item ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                image={item.Poster}
                alt={item.Title}
                sx={{
                  width: '400px',
                  objectFit: 'cover',
                  mx: 'auto',
                  display: 'block'
                }}
              />
              <CardContent>
                <Button onClick={toggleFavorite} fullWidth variant="contained" color={isFavorite ? "secondary" : "primary"}>
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>{item.Title}</Typography>
              <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
                <TableBody sx={{ width: "100%" }}>
                  {[ 'Genre', 'Year', 'Rated', 'Actors',  'Plot','Runtime','imdbRating', 'imdbVotes'
                  ].map((key) => (
                    <TableRow key={key}>
                      <TableCell sx={{ fontWeight: 'bold' }}>{key}</TableCell>
                      <TableCell sx={{
                        whiteSpace: "normal",
                        wordWrap: "break-word"
                      }}>
                        {String(item[key])}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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

// i will go row by row now. rows are seperated by '/'. Title/ actors/ country,genre,language/ metascore,rated,ratings/ plot / Released , runtime , type / Type,writer,year / imdbId,imdbRating,imdbVotes/