import React, { useContext, useEffect, useReducer } from "react";

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";
import reducer from "./reducer";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";

const initialState = {
  loading: false,
  news: [],
  searchValue: "react",
  page: 0,
  nbPages: 0,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async (url) => {
    try {
      dispatch({ type: SET_LOADING });
      const response = await fetch(url);
      const news = await response.json();
      console.log(news);
      dispatch({
        type: SET_STORIES,
        payload: { news: news.hits, nbPages: news.nbPages },
      });
      dispatch({ type: SET_LOADING });
    } catch (error) {
      dispatch({ type: SET_LOADING });
      console.log(error);
    }
  };
  const handleSearch = (value) => {
    dispatch({ type: HANDLE_SEARCH, payload: value });
  };
  const removeStory = (storyID) => {
    dispatch({ type: REMOVE_STORY, payload: storyID });
  };
  const handlePage = (action, page) => {
    let newPage = state.page;
    if (action === "prev") {
      state.page <= 0 ? (newPage = 50) : (newPage = newPage - 1);
    } else {
      state.page >= 50 ? (newPage = 0) : (newPage = newPage + 1);
    }
    dispatch({ type: REMOVE_STORY, payload: newPage });
  };
  useEffect(() => {
    fetchData(`${API_ENDPOINT}query=${state.searchValue}&page=${state.page}`);
  }, [state.searchValue, state.page]);
  return (
    <AppContext.Provider
      value={{
        ...state,
        handleSearch,
        removeStory,
        handlePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
