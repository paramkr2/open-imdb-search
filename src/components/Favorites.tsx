import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material'; // Import Material-UI components
import DeleteIcon from '@mui/icons-material/Delete'; // Import delete icon from Material-UI

const Favorites = () => {
  const { favorites, dispatch } = useContext(FavoritesContext);

  return (
    <TableContainer component={Paper} sx={{ display: 'flex', justifyContent: 'center' }}> {/* Flexbox styles for centering */}
      <Table sx={{ maxWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Poster</TableCell>
            <TableCell>Title</TableCell>
            <TableCell align="right">Year</TableCell>
            <TableCell align="right">Actions</TableCell> {/* Added Actions column for remove button */}
          </TableRow>
        </TableHead>
        <TableBody>
          {favorites.map((item) => (
            <TableRow key={item.imdbID} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell> <img src={item.Poster} alt={item.Title} height="100" /></TableCell>
              <TableCell component="th" scope="row">{item.Title}</TableCell>
              <TableCell align="right">{item.Year}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => dispatch({ type: 'REMOVE', item: item })}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Favorites;