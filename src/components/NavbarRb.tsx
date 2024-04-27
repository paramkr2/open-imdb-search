import React , {useContext,useEffect,useState} from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import "../styles/Navbar.css";
import { Link } from 'react-router-dom';
import {FavoritesContext} from '../context/FavoritesContext'

const  NavBar = () => {
  const {favorites,_} = useContext(FavoritesContext)
  const [cartCount,setCartCount] = useState(0)

  useEffect( ()=> {
    console.log(favorites)
    setCartCount( favorites.reduce((acc,item ) => { return acc+1 } , 0 ) );
  },[favorites])


   const handleSearchSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    const {search} = this.props;
    if (event.key === 'Enter') {
      await search(event.target.value )
    }
  };


  return (
    <Navbar className="navbar">
        <Navbar.Brand href="#">Movie DB</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/favorites" >
              <BookmarksOutlinedIcon className="bookmark" ></BookmarksOutlinedIcon>
                <span className="bookmark-count">{cartCount}</span>
            </Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
  
}

export default NavBar;