import express from "express";
import { Client, Environment, ApiError } from "square";

const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );

// square
const client = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Sandbox
  });
  const { locationsApi, customersApi, ordersApi } = client;
  const getLocations = async () => {
    try {
      const listLocationsResponse = await locationsApi.listLocations();

      const locations = listLocationsResponse.result.locations;

      if (locations) {
        locations.forEach((location) => {
          if (location.address) {
            // tslint:disable-next-line:no-console
            console.log(
              location.id + ": " +
              location.name +", " +
              location.address.addressLine1 + ", " +
              location.address.locality
            );
          } else {
            // tslint:disable-next-line:no-console
            console.log(
              location.id + ": " +
              location.name +", "
            );
          }
        });
      }
    } catch (error) {
      if (error instanceof ApiError) {
        error.result.errors.forEach((e: { category: any; code: any; detail: any; }) => {
        // tslint:disable-next-line:no-console
          console.log(e.category);
          // tslint:disable-next-line:no-console
          console.log(e.code);
          // tslint:disable-next-line:no-console
          console.log(e.detail);
        });
      } else {
        // tslint:disable-next-line:no-console
        console.log("Unexpected error occurred: ", error);
      }
    }
  };

  console.log(getLocations())