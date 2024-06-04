import axios from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";
import PopUpContext from "../modules/context/PopupContext";

export const addToBagMutation = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { setpopUpData } = useContext(PopUpContext);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { mutate: addToBag } = useMutation(async ({ productId, media, title }) => {
    await axios
      .post("http://localhost:3001/bag", {
        prod_id: productId,
        num: 1,
      })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) return;
        setpopUpData({
          itemImg: media,
          itemTitle: title,
          status: true,
        });
      });
    setTimeout(() => {
      setpopUpData({ status: false });
    }, 3000);
  });

  return { addToBag };
};

export const patchtoBagMutation = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { setpopUpData } = useContext(PopUpContext);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { mutate: patchtoBag } = useMutation(async ({ productId, productNum, media, title }) => {
    await axios
      .patch(`http://localhost:3001/bag/${productId}`, {
        num: (productNum += 1),
      })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) return;
        setpopUpData({
          itemImg: media,
          itemTitle: title,
          status: true,
        });
      });
    setTimeout(() => {
      setpopUpData({ status: false });
    }, 3000);
  });

  return { patchtoBag };
};
