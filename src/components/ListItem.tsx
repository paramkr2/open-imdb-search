import  React,{useContext,useEffect,useState } from 'react';
import {Box,Card,CardContent,Typography,CardMedia,CardHeader,Avatar , Button} from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import {Link} from 'react-router-dom'
import FadeInSection from './FadeInSection'
import {FavoritesContext} from '../context/FavoritesContext'
import '../styles/ListItem.css'

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
	},[])

	const addToFavorites = () => {
		console.log('adding',item)
		dispatch({type:'ADD',item:item})
		setPresent(true);

	}

	const removeFromFavorites = () => {
		dispatch({type:'REMOVE',item:item})
		setPresent(false)
	}

	return (
	<FadeInSection>
	  <div className="itemContainer">
	    <Link to={`/item/${imdbID}`}>
	      <div className="title">{Title}</div>
	    </Link> 
	    <div className="poster"><img src={Poster} height="400" width="400" alt="Poster" /></div>
	    
	    <div>Year: {Year}</div>
	    <div className="buttonWrapper">
	      {!present ? (
	        <button className="add" onClick={addToFavorites}>Add</button>
	      ) : (
	        <button className="remove" onClick={removeFromFavorites}>Remove</button>
	      )}
	    </div>
	  </div>
	</FadeInSection>
	)
}

export default ListItem;