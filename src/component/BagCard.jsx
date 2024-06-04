import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import GetGoods from "../hooks/getGoods";
import { useDeleteData, useEditData } from "../modules/context/https";

const BagCard = ({ goods }) => {
  const { bagGoods } = GetGoods();
  const [showElement, setShowElement] = useState(true);
  const deleteDataMutation = useDeleteData();
  const editDataMutation = useEditData();

  const res = useMemo(() => bagGoods.find((prod) => goods.id === prod.prod_id), [bagGoods, goods.id]);

  const handleDelete = async () => {
    try {
      await deleteDataMutation.mutateAsync(`/bag/${res.id}`);
      setShowElement(false);
    } catch (error) {
      console.error("error", error);
      throw error;
    }
  };

  return (
    <>
      {showElement && (
        <Box bgcolor={"#fff"} boxShadow={3}>
          <Box>
            <Avatar src={goods.media[0]} alt="" />
            <Typography variant="h5">{goods.title.slice(0, 40)}</Typography>
            <Button onClick={handleDelete}>Delete</Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default BagCard;
