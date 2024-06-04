import { createContext } from "react";

const PopUpContext = createContext({
  itemImg: "",
  itemTitle: "",
  status: false,
});

export default PopUpContext;
