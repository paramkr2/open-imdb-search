import React, { useState ,useEffect } from 'react';
import Box from '@mui/material/Box';
import { Grid, TextField, Button, CircularProgress , Skeleton ,Pagination} from '@mui/material';

import ListItem from './ListItem';

const ListMovies = ({list,search}) => {
  const [searching, setSearching] = useState(false);
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
  }

  const handlePageChange = (event,value)=>{
  	setSearching(true);
  	setPage(value);
  	sessionStorage.setItem('page', value);
  }

  return (
    <Box sx={{
      marginBottom: 2,
      '& .searchButton': {
        borderRadius: 8,
        border: '1px solid transparent',
        padding: '0.6em 1.2em',
        fontSize: '1em',
        fontWeight: 500,
        fontFamily: 'inherit',
        backgroundColor: '#1a1a1a',
        cursor: 'pointer',
        transition: 'border-color 0.25s',
        '&:hover': {
          borderColor: '#646cff',
        },
        '&:focus, &:focus-visible': {
          outline: '4px auto -webkit-focus-ring-color',
        },
      }
    }}>


      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          name='movieSearch'
          id="outlined-basic"
          label="Search for movies"
          variant="outlined"
        />
        {searching ? (
          <CircularProgress color="secondary" />
        ) : (
          <Button className="searchButton" type='submit' variant="contained">Search</Button>
        )}
      </Box>
      	<Pagination
	        count={10} // Total number of pages
	        page={page} // Current page
	        onChange={handlePageChange} // Page change handler
	        variant="outlined"
	        color="primary"
	        shape="rounded"
	      />
      <Grid container spacing={2}>
        {list && list.map((list) => (
          <Grid item key={list.imdbID} xs={12} sm={6} md={4} lg={3}>
            <ListItem key={list.imdbID} item={list} />
          </Grid>
        ))}
        {searching &&
		  <Grid item xs={12} sm={6} md={4} lg={3}>
		    <Skeleton variant="rectangular" width={210} height={194} /> {/* Match the height of CardMedia */}
		    <Skeleton variant="rectangular" width={210} height={48} /> {/* Height of CardHeader */}
		    <Skeleton variant="rectangular" width={210} height={96} /> {/* Height of CardContent */}
		  </Grid>
		}
      </Grid>

      

    </Box>
  );
};

export default ListMovies;
