import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SearchAppBar from "../../component/Layout/Header";
import GetGoods from "../../hooks/getGoods";

const ProductPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = JSON.parse(searchParams.get("id"));
  const { Goods } = GetGoods();
  const myProd = Goods && Goods.find((good) => +good.id === id);

  const leftImages = myProd && myProd.media.slice(0, 3);
  const rightImage = myProd && myProd.media[1];

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 10 },
          "@media (min-width:1920px)": {
            maxWidth: "1600px",
          },
        }}
      >
        <SearchAppBar />
        <Grid container spacing={2} pl={3} pt={3}>
          <Grid item xs={12}>
            <Stack spacing={2}>
              <Breadcrumbs>
                <Link underline="hover" color="inherit" href="/">
                  Bosh sahifa
                </Link>
                <Link underline="hover" color="inherit" href="/material-ui/getting-started/installation/">
                  {myProd.type}
                </Link>
                <Typography>{myProd.title}</Typography>
              </Breadcrumbs>
            </Stack>
          </Grid>
          {/* Main Content */}
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              {/* Left Side Images */}
              <Stack spacing={2}>
                {leftImages &&
                  leftImages.map((image, index) => (
                    <Box
                      key={index}
                      component="img"
                      src={image}
                      alt={myProd && myProd.title}
                      sx={{ width: "100px", height: "120px", boxShadow: 3 }}
                    />
                  ))}
              </Stack>
              {/* Big Image */}
              <Box
                component="img"
                src={rightImage}
                alt={myProd && myProd.title}
                sx={{ width: "400px", height: "500px", boxShadow: 3 }}
              />
              {/* Product Details */}
              <Container sx={{ width: "50%" }}>
                <Stack spacing={2} pl={3}>
                  <Stack direction="row" alignItems="center">
                    <Rating name="product-rating" value={myProd.rating} precision={0.5} readOnly size="small" />
                    <Typography variant="body2" color="textSecondary">
                      {myProd.rating.toFixed(1)} (501 baholar)
                    </Typography>
                  </Stack>
                  {/* Title of Product */}
                  <Typography variant="h5">{myProd.title}</Typography>
                  {/* Description of Product */}
                  <Typography variant="body1">Sotuvchi: Hummere</Typography>
                  <Typography variant="body1">Yetkazib Berish: 1 kun, bepul</Typography>
                  {/* Price of Product */}
                  <hr />
                  {/* Quantity Input */}
                  <TextField
                    value={quantity}
                    inputProps={{ min: 1, style: { textAlign: "center" } }}
                    size="small"
                    variant="outlined"
                    readOnly
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton onClick={handleDecrement} size="small">
                            <RemoveIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleIncrement} size="small">
                            <AddIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ width: "160px" }}
                  />
                  <Typography variant="h6">{myProd.price} so'm</Typography>

                  {/* Add to Cart Button */}

                  <Button
                    sx={{
                      width: "100%",
                      height: "7vh",
                      bgcolor: "#F5F5F5",
                      color: "black",
                      textTransform: "lowercase",
                      display: "flex",
                      alignItems: "center", // Align items vertically
                      justifyContent: "flex-start", // Align items at the start of the button
                      "&:hover": {
                        bgcolor: "#E5E4E2",
                      },
                    }}
                  >
                    <Card
                      sx={{
                        width: "30%",
                        height: "30px",
                        bgcolor: "Yellow",
                        mr: 2,
                        textAlign: "center",
                        paddingTop: 1,
                      }}
                    >
                      Oyiga 5 270 so'mdan
                    </Card>
                    muddatli to'lov
                  </Button>

                  <Stack direction="row" spacing={1}>
                    <Button sx={{ width: "45%", bgcolor: "#8A2BE2", borderRadius: "10px" }} variant="contained">
                      Savatga qo'shish
                    </Button>
                    <Button
                      sx={{
                        width: "55%",
                        height: "7vh",
                        borderRadius: "10px",
                        color: "#8A2BE2",
                        borderColor: "#8A2BE2",
                      }}
                      variant="outlined"
                      size="small"
                    >
                      Tugmani 1 bosishda xarid qilish
                    </Button>
                  </Stack>
                  <Stack>
                    <Box
                      sx={{ width: "95%", height: "30vh", border: "1px solid gray", borderRadius: "20px", padding: 2 }}
                    >
                      <Typography sx={{ fontSize: "18px" }} variant="h6">
                        {" "}
                        1 kundan boshlab texkor yetkazma
                      </Typography>
                      <Typography variant="p">Uzum buyurtmalarni topshirish punktida yoki kuryer orqali</Typography>
                      <hr></hr>

                      <Typography sx={{ fontSize: "18px" }} variant="h6">
                        Qulay usulda xavfsiz toʻlov
                      </Typography>
                      <Typography variant="p">Karta orqali, naqd pulda yoki boʻlib toʻlang</Typography>
                      {/* Add small square avatars as cards */}
                      <Box display="flex" alignItems="center" textAlign="center">
                        <Card sx={{ width: 40, height: 40, mr: 1 }}>
                          <CardContent>
                            <Typography textAlign="center">Visa</Typography>
                          </CardContent>
                        </Card>
                        <Card sx={{ width: 40, height: 40, mr: 1 }}>
                          <CardContent>
                            <Typography textAlign="center">A2</Typography>
                          </CardContent>
                        </Card>
                        <Card sx={{ width: 40, height: 40, mr: 1 }}>
                          <CardContent>
                            <Typography textAlign="center">A3</Typography>
                          </CardContent>
                        </Card>
                        <Card sx={{ width: 40, height: 40, mr: 1 }}>
                          <CardContent>
                            <Typography textAlign="center">A4</Typography>
                          </CardContent>
                        </Card>
                        <Card sx={{ width: 40, height: 40, mr: 1 }}>
                          <CardContent>
                            <Typography textAlign="center">A5</Typography>
                          </CardContent>
                        </Card>
                        <Card sx={{ width: 40, height: 40, mr: 1 }}>
                          <CardContent>
                            <Typography textAlign="center">A6</Typography>
                          </CardContent>
                        </Card>
                        <Card sx={{ width: 40, height: 40, mr: 1 }}>
                          <CardContent>
                            <Typography textAlign="center">A7</Typography>
                          </CardContent>
                        </Card>
                      </Box>
                      <hr></hr>

                      <Typography sx={{ fontSize: "18px" }} variant="h6">
                        Qaytarish oson va tez
                      </Typography>
                      <Typography variant="p">
                        Tovarlarni 10 kun ichida qabul qilamiz va darhol pulini qaytaramiz
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography sx={{ fontSize: "20px" }} variant="p">
                    Mahsulot haqida qiaqacha
                  </Typography>
                  <Typography variant="body1">.{myProd.description}</Typography>
                </Stack>
              </Container>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProductPage;
