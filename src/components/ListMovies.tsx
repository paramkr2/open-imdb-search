import React, { useState ,useEffect } from 'react';
import Box from '@mui/material/Box';
import { Grid, TextField, Button, CircularProgress , Skeleton ,Pagination , Stack} from '@mui/material';

import ListItem from './ListItem';
import "../styles/ListMovies.css"
const ListMovies = ({list,search,searching,setSearching}) => {
  
  const [page,setPage] = useState(()=> sessionStorage.getItem('page')|| 1 );
  const [searchQuery , setSearchQuery] = useState(()=> sessionStorage.getItem('searchQuery')|| 'fifa' );

  useEffect( ()=>{
  		if( searchQuery != null ){
    		search( searchQuery , page ).then( ()=> { setSearching(false)})
    	}
   },[page,searchQuery]);

  const handleSubmit = async (event) => {
  	 event.preventDefault();
  	 setSearchQuery(event.target.movieSearch.value)
  	 sessionStorage.setItem('searchQuery', event.target.movieSearch.value);
  	 setPage(1);
  }

  const handlePageChange = (event,value)=>{
  	setSearching(true);
  	setPage(value);
  	sessionStorage.setItem('page', value);
  }

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} className="searchBarWrapper">
        <input className="searchBar" name='movieSearch' label="Search for movies" />
      	<button className="searchButton" type='submit' >Search</button> 
      </Box>
     
	  	<Pagination
	        count={10} // Total number of pages
	        page={page} // Current page
	        onChange={handlePageChange} // Page change handler
	        variant="outlined"
	        
	      />
	  
      <Grid container spacing={2} className="gridContainer"> {/* margin 0 , since without it we have some -16 top and left padding  */}
        {searching &&
		  	Array.from({ length: 3 }, (_, index) => (
			  <Grid item key={index} xs={12} sm={6} md={4} lg={3} style={{ padding: '10px' }}>
			    <Stack spacing={2}> {/* Add margin to create space */}
			      <Skeleton variant="rectangular" height={20} />
			      <Skeleton variant="rectangular" height={194} />
			      <Skeleton variant="rectangular" height={20} />
			    </Stack>
			   </Grid>
			))
		}

        {!searching && list && list.map((list) => (

          <Grid item key={list.imdbID} xs={12} sm={6} md={4} lg={3}>
            <ListItem key={list.imdbID} item={list} />
          </Grid>
        ))}
        
      </Grid>

      <Pagination
          count={10} // Total number of pages
          page={page} // Current page
          onChange={handlePageChange} // Page change handler
          variant="outlined"
          
        />
      

    </>
  );
};

export default ListMovies;
