import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: !state.loading };
    case SET_STORIES:
      console.log(action.payload.nbPages);
      return {
        ...state,
        news: action.payload.news,
        nbPages: action.payload.nbPages,
      };
    case HANDLE_SEARCH:
      return { ...state, searchValue: action.payload };
    case REMOVE_STORY:
      console.log(action.payload);
      return {
        ...state,
        page: action.payload,
      };
    case HANDLE_PAGE:
      console.log(action.payload);
      return {
        ...state,
        news: state.news.filter((story) => story.objectID !== action.payload),
      };
  }
};
export default reducer;
