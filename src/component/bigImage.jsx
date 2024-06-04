import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import React from "react";

import productImage from "./Layout/image3.jpg"; // Importing the image file

function BigImage() {
  return (
    <Box sx={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", borderRadius: "10px" }}>
      <CardMedia
        component="img"
        alt="Product Image"
        src={productImage} // Using the imported image
        sx={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      />
    </Box>
  );
}

export default BigImage;
