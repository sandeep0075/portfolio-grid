import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardMedia,
  CssBaseline,
  Grid,
  Typography,
  GlobalStyles,
  Container
} from '@mui/material';


const backendApiUrl = (pathname) => {
  return process.env.REACT_APP_API_URL + pathname;
};

export const PortfolioContent = () => {

  const initialState = [];

  const [portfolio, setPortfolio] = useState(initialState);

  useEffect(() => {
    const url = backendApiUrl(`v1/1/search.php?s=margarita`);
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setPortfolio(res.data.drinks)
        } else {
          throw new Error(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 6, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{ mb: 0 }}
        >
          Portfolio Grid 4
        </Typography>
        <Typography variant="p" align="center" color="text.primary" component="p">
          This grid shows the items pages in a popup
        </Typography>
      </Container>

      <Container maxWidth="md" component="main" sx={{ mb: 6 }}>
        <Grid container spacing={5} alignItems="flex-end">
          {portfolio.map((p) => (
            <Grid
              item
              key={p.idDrink}
              xs={12}
              sm={p.strDrink === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="194"
                  image={p.strDrinkThumb}
                  alt={p.strDrink}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default function Portfolio() {
  return <PortfolioContent />;
}