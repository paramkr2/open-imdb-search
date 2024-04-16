import React , {useContext} from 'react';
import {FavoritesContext} from '../context/FavoritesContext'
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'; // Import Material-UI components

const Favorites = () => {
	const { favorites , dispatch } = useContext(FavoritesContext);
	
	return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Year</TableCell>
            <TableCell align="right">imdbId&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {favorites.map((item) => (
            <TableRow key={item.imdbID} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {item.Title}
              </TableCell>
              <TableCell align="right">{item.Year}</TableCell>
              <TableCell align="right">{item.imdbID}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

}

export default Favorites;