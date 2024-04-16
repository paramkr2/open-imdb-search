import React, { createContext, useReducer, Dispatch, ReactNode , useEffect } from 'react';

// Define the type for the item object
interface Item {
  imdbID: string;
  title: string;
}
const initialState:Item[] = []

// Define the type for the action objects
type Action = AddAction | RemoveAction;

interface AddAction {
  type: 'ADD';
  item: Item;
}

interface RemoveAction {
  type: 'REMOVE';
  item: Item;
}

interface FavoritesContextType {
  fav: Item[];
  dispatch: Dispatch<Action>;
}

// Create the context object
export const FavoritesContext = createContext<FavoritesContextType | null>({ fav: [], dispatch: () => {} });

// Define the reducer function
const reducer = (state: Item[], action: Action) => {
	console.log('action',action)
  switch (action.type) {
    case 'ADD':
      return [...state, action.item];
    case 'REMOVE':
      return state.filter(item => item.imdbID !== action.item.imdbID);
    default:
      return state;
  }
};

// Create the provider component
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, dispatch] = useReducer(reducer, initialState , ()=> {
  	const data = localStorage.getItem('favorites');
  	return data ? JSON.parse(data):initialState

  });

  useEffect( ()=>{
  	localStorage.setItem('favorites',JSON.stringify(favorites));

  },[favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};
