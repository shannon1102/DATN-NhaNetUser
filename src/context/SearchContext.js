import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  search: "",
  searchProduct: {
    city:"",
    district:"",
    ward:"",
    minPrice:0,
    maxPrice: 99999999999,
    minSquaredMeterArea:0,
    maxSquaredMeterArea: 100000,
  }
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      console.log("Vao NewSearc".payload)
      return {...action.payload};
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        search: state.search,
        searchProduct: state.searchProduct,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};



















