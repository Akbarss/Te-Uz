import { createContext } from "react";

const searchContext = createContext({
  searchText: "",
  textLength: false,
});
export default searchContext;
