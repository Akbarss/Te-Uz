import { Box, Container, CssBaseline, Grid, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Caroucel from "./component/Layout/Caroucel";
import SearchAppBar from "./component/Layout/Header";
import BigImage from "./component/bigImage";
import ProductCard from "./component/productCard";

function Home() {
  const { data, isLoading, isError } = useQuery("goods", async () => {
    const res = await axios.get("http://localhost:3001/goods");
    return res.data;
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const likedGoods = data.filter((good) => good.status === true);
  const saleGoods = data.filter((good) => good.isBlackFriday);

  const sortedGoods = [...likedGoods, ...saleGoods];

  const slicedGoods = sortedGoods.slice(0, 15);

  const Armchairs = data.filter((good) => good.type === "furniture");
  const PC = data.filter((good) => good.type === "PC");
  const TV = data.filter((good) => good.type === "TV");
  const Audio = data.filter((good) => good.type === "audio");
  const Kitchen = data.filter((good) => good.type === "kitchen");

  const sections = [
    { slider: "", type: "Armchairs", arr: Armchairs },
    { slider: "", type: "PC", arr: PC },
    { slider: "", type: "TV", arr: TV },
    { slider: "", type: "Audio", arr: Audio },
    { slider: "", type: "Kitchen", arr: Kitchen },
  ];

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="2lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 10 }, // Responsive padding
          "@media (min-width:1920px)": {
            maxWidth: "1600px",
          },
        }}
      >
        <SearchAppBar />
        <Caroucel />
        <Box mb={4} sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {slicedGoods.map((good) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={good.id}>
                <ProductCard good={good} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <BigImage />
        {sections.map((item, i) => (
          <Box mb={4} key={i}>
            <Typography variant="h5" gutterBottom>
              {item.type}
            </Typography>
            <Grid container spacing={2}>
              {item.arr.map((good) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={`${good.id}_${good.type}`}>
                  <ProductCard good={good} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Container>
    </>
  );
}

export default Home;
