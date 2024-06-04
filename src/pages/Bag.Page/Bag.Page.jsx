import React, { useEffect, useMemo, useState } from "react";
import BagCard from "../../component/BagCard";
import ProductCard from "../../component/productCard";
import BagGoods from "../../hooks/getGoods";

const BagPage = () => {
  const [time, setTime] = useState("");
  const { Goods, res, bagLoading, goodsloading, bagError, goodError } = BagGoods();

  useEffect(() => {
    const currentDate = new Date();
    const tomorrowDate = new Date();

    tomorrowDate.setDate(currentDate.getDate() + 1);
    setTime(tomorrowDate.toDateString());
  }, []);

  const popProds = useMemo(() => (Goods ? Goods.filter((good) => good.type === "PC") : []), [Goods]);

  return (
    <>
      {res && res.map((data) => <BagCard goods={data} key={data.id} />)}
      {popProds.map((good) => (
        <ProductCard good={good} key={good.id} />
      ))}
    </>
  );
};

export default BagPage;
