import  React,{useContext,useEffect,useState } from 'react';
import {Box,Card,CardContent,Typography,CardMedia,CardHeader,Avatar , Button} from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';

import {FavoritesContext} from '../context/FavoritesContext'

const ListItem = ({item}) => {
	const {Title,Poster,Type,Year,imdbID} = item ;
	const {favorites,dispatch} = useContext(FavoritesContext);
	const [present,setPresent] = useState(false)

	useEffect( ()=>{
		// here check if already in favorites using imdbID . 
		for( const item of favorites){
			if(item.imdbID == imdbID ){
				setPresent(true)
			}
		}
	},[favorites])

	const addToFavorites = () => {
		console.log('adding',item)
		dispatch({type:'ADD',item:item})

	}

	const removeFromFavorites = () => {

	}

	return (
		<Box>

			<Card variant="outlined">
				 <CardHeader
			        avatar={
			          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
			            R
			          </Avatar>
			        }
			        action={
			          <IconButton aria-label="settings">
			            <MoreVertIcon/>
			          </IconButton>
			        }
			        title={Title}
			        subheader="September 14, 2016"
			      />
			      <CardMedia
			        component="img"
			        height="194"
			        image= {`${Poster}`}
			        alt="Paella dish"
			      />
				<CardContent>
			      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
			        {Title}
			      </Typography>
			      <Typography sx={{ mb: 1.5 }} color="text.secondary">
			        {Year}
			      </Typography>
		    </CardContent>
			{ ! present ? (
				<Button onClick={addToFavorites} > Add </Button> 
			):( <Button onClick={removeFromFavorites} > Remove </Button>
			)}

			</Card>
		</Box> 
		

	)
}

export default ListItem;