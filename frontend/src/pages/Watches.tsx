import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getCatalog, getInventory } from '../callbackend/request';
import { useContext, useEffect, useState } from 'react';
import CardActionArea from '@mui/material/CardActionArea';
import { OrderIdContext, OrderIdempotencyContext, PaymentIdempotencyContext } from '../Context';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // the catalog, an array

const theme = createTheme(); // MUI

// TODO: Read URL and load particular product accordingly
// TODO: Add a back button - clearing series

export default function WatchesCatalog() {
  const { orderId, changeOrderId } = useContext(OrderIdContext);
  const { orderIdempotency, changeOrderIdempotency } = useContext(OrderIdempotencyContext);
  const { paymentIdempotency, changePaymentIdempotency } = useContext(PaymentIdempotencyContext);

  const [catalog, setCatalog] = useState<any[]>([]); // TODO: type catalog
  const [series, setSeries] = useState<{ [key: string]: any }>({}); // TODO: type series
  const [inventory, setInventory] = useState<any[]>([]); // TODO: type inventory

  const changeSeries = (seriesId: string) => {
    if (catalog && catalog.length > 0) {
      const result = catalog.find(item => item.id === seriesId);
      result?.itemData && setSeries(result.itemData);
      console.log('series:', result?.itemData)
    }
  }

  useEffect(() => {
    try {
      const fetchCatalog = async () => {
        const data = await getCatalog('ITEM,IMAGE');
        // console.log('what is data', typeof data)
        console.log('what is catalog data', data)
        // const json = JSON.parse(data);

        if (data && data.objects) {
          console.log('got the catalog', data.objects)
          setCatalog(data.objects);
        }
      }

      fetchCatalog().catch(console.error);
    } catch (err) {
      console.log('error:', err)
    }
  }, [])

  useEffect(() => {
    console.log('there has been a series change')
    changeOrderId('made it to the series page')
    console.log('orderId:', orderId);
    console.log('orderIdempotency:', orderIdempotency)
    console.log('paymentIdempotency:', paymentIdempotency)
    try {
      if (series && series.variations && series.variations.length > 0) {
        console.log('we have enough of a series')
        const fetchInventory = async () => {
          const data = await getInventory(series.variations.map((variant: { id: string; }) => variant.id));
          // console.log('what is data', typeof data)
          // console.log('what is the inventory?:', data)
          // const json = JSON.parse(data);

          if (data && data.counts) {
            console.log('got the inventory:', data.counts)
            // data.counts[0]
            setInventory(data.counts);
          }
        }

        fetchInventory().catch(console.error);
      }
    } catch (err) {
      console.log('error:', err)
    }
  }, [series])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Watches
            </Typography>
            <Typography
              component="h2"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
              The Collection
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" paragraph>
              William's offers a wide assortment of watches to suit any wrist. Discover the broad selection of William's watches to find a perfect combination of style and functionality.
            </Typography>
            {/* <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack> */}
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {/* make a helper filter function and run it back on the request.ts */}
            {!(series?.variations && series?.variations.length > 0) && catalog && catalog.filter(item => item?.type == 'ITEM').map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardActionArea
                    onClick={() => changeSeries(card.id)}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        // 16:9
                        // pt: '56.25%',
                      }}
                      image={catalog.find(x => x.id == card?.itemData?.imageIds[0])?.imageData?.url}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      {card?.itemData?.name ?
                        <Typography gutterBottom variant="h5" component="h2">
                          {card.itemData.name}
                        </Typography>
                        : null}
                      {card?.itemData?.description ?
                        <Typography>
                          {card.itemData.description}
                        </Typography>
                        : null}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
            {series && series?.variations && series?.variations.length > 0 && series?.variations.map((card: any) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      // pt: '56.25%',
                    }}
                    image={catalog.find(x => x.id == series?.imageIds[0])?.imageData?.url}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    {series?.name && card?.itemVariationData?.name ?
                      <Typography gutterBottom variant="h5" component="h2">
                        {series.name} {card.itemVariationData.name}
                      </Typography>
                      : null}
                    {card?.itemVariationData?.sku ?
                      <Typography>
                        sku: {card.itemVariationData.sku}
                      </Typography>
                      : null}
                    {card?.itemVariationData?.priceMoney?.amount ?
                      <Typography>
                        ${card.itemVariationData.priceMoney.amount * .01}
                      </Typography>
                      : null}
                      <Typography sx={inventory.find(item => item.catalogObjectId === card.id)?.state == 'IN_STOCK' ? { color: 'success.main' } : { color: 'disabled.main' }}>
                      {/* textDecoration: "line-through" */}
                        {inventory.find(item => item.catalogObjectId === card.id)?.state == 'IN_STOCK' ? 'In Stock' : 'Out of Stock'}
                      </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="large">Add to cart</Button>
                    {/* <Button size="small">Edit</Button> */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}