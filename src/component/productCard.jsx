import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom"; // Import useHistory
import { addToBagMutation, patchtoBagMutation } from "../hooks/addToBag";
import GetGoods from "../hooks/getGoods";

const ProductCard = ({ good }) => {
  const [liked, setLiked] = useState(false);
  const { bagGoods } = GetGoods();

  const { addToBag } = addToBagMutation();
  const { patchtoBag } = patchtoBagMutation();

  const { mutate: updateStatus } = useMutation(
    async (newStatus) =>
      await axios.patch(`http://localhost:3001/goods/${good.id}`, {
        status: newStatus,
      })
  );

  useEffect(() => {
    const likedGoods = JSON.parse(localStorage.getItem("likedGoods")) || [];
    if (likedGoods.some((item) => item.id === good.id)) {
      setLiked(true);
    }
  }, [good.id]);

  const handleLike = async (e) => {
    e.preventDefault();
    const newLiked = !liked;
    setLiked(newLiked);
    updateStatus(newLiked);
    let likedGoods = JSON.parse(localStorage.getItem("likedGoods")) || [];
    if (newLiked) {
      likedGoods.push(good);
    } else {
      likedGoods = likedGoods.filter((item) => item.id !== good.id);
    }
    localStorage.setItem("likedGoods", JSON.stringify(likedGoods));
  };

  const handleAddToBag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isProductExist = bagGoods.find((prod) => +prod.prod_id === +good.id);

    if (isProductExist === undefined) {
      addToBag(good && { productId: good.id, media: good.media[0], title: good.title });
    } else {
      isProductExist &&
        patchtoBag(
          good && {
            productId: isProductExist.id,
            productNum: isProductExist.num,
            media: good.media[0],
            title: good.title,
          }
        );
    }
  };

  return (
    <Link to={`product?id=${good.id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          width: "100%",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          alt={good.title}
          height="200px"
          image={good.media[0]}
          title={good.title}
          sx={{
            objectFit: "contain",
            zIndex: 1,
            transition: "transform 0.3s ease-in-out", // Add transition for smooth effect
            "&:hover": {
              transform: "scale(1.1)", // Scale image on hover
            },
          }}
        />
        <IconButton
          size="small"
          aria-label="like"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: 2,
          }}
          onClick={handleLike}
        >
          <FavoriteBorderOutlinedIcon sx={{ backgroundColor: liked ? "red" : "transparent" }} fontSize="small" />
        </IconButton>
        <CardContent sx={{ flex: "1 0 auto", paddingBottom: 0 }}>
          <Typography color={"#3B3C36"} variant="subtitle1" component="h6" noWrap>
            {good.title}
          </Typography>
          <Typography mt={2} marginBottom={"5%"} variant="caption" color="" component="mark">
            {Math.floor((good.price * 12) / 100)} So'm/oyiga
          </Typography>
          <Box mt={4} marginBottom={"10%"} display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Typography variant="body2" color="textSecondary" component="del">
                {good.price - Math.floor((good.price * good.salePercentage) / 100)} So'm
              </Typography>
              <Typography sx={{ fontSize: "16px" }} variant="body2" component="span">
                {good.price} So'm
              </Typography>
            </Box>
            <IconButton size="small" aria-label="add to bag" onClick={(e) => handleAddToBag(e)}>
              <AddOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
