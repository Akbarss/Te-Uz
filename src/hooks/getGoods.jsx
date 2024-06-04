import axios from "axios";
import { useContext, useMemo } from "react";
import { useQuery } from "react-query";
import searchContext from "../modules/context/searchContext";

const GetGoods = () => {
  const { searchText } = useContext(searchContext);

  const bagQuery = useQuery("bagData", async () => {
    const response = await axios.get("http://localhost:3001/bag");
    return response.data;
  });

  const goodsQuery = useQuery("goodsData", async () => {
    const response = await axios.get("http://localhost:3001/goods");
    return response.data;
  });

  const isLoading = bagQuery.isLoading || goodsQuery.isLoading;
  const isError = bagQuery.isError || goodsQuery.isError;

  const filteredGoods = useMemo(() => {
    if (searchText.length >= 2) {
      if (!goodsQuery.data) return [];
      return goodsQuery.data.filter((item) => item.title.toLowerCase().includes(searchText.toLowerCase()));
    } else {
      return [];
    }
  }, [goodsQuery.data, searchText]);

  const res = useMemo(() => {
    if (!goodsQuery.data || !bagQuery.data) return [];
    return goodsQuery.data.filter((goodsItem) => bagQuery.data.some((bagItem) => goodsItem.id === bagItem.prod_id));
  }, [goodsQuery.data, bagQuery.data]);

  return {
    res,
    Goods: goodsQuery.data,
    searchHintGoods: filteredGoods,
    bagGoods: bagQuery.data,
    isLoading,
    isError,
  };
};

export default GetGoods;
