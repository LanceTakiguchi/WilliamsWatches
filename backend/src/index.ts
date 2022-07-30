import express from "express";
import { Client, Environment, ApiError } from "square";
import { toJson } from "./helper";

const app = express();
const port = 8080; // default port to listen

const client = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Sandbox
});
const { locationsApi, customersApi, ordersApi } = client;

// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("status 200");
});

app.get("/catalog", async (req, res) => {
    try {
        const types = req.query?.types && typeof req.query?.types === 'string' ? req.query.types : undefined;
        const response = await client.catalogApi.listCatalog(undefined, types);
        if (response.result && response.statusCode === 200) {
            console.log('200')
            const result = response.result;
            console.log('square catalog');
            console.log(toJson(result))
            res.send(toJson(result))
        } else {
            console.log('response error', response.statusCode);
            res.send({})
        }
    } catch (err) {
        console.log(err);
        res.send(err)
    }
})

app.get("/batchInventory", async (req, res) => {
    try {
        const catalogObjectIdsString = req.query?.ids && typeof req.query?.ids === 'string' ? req.query.ids : undefined;

        const catalogObjectIds = catalogObjectIdsString.split(',');
        if (!(catalogObjectIdsString && catalogObjectIds && catalogObjectIds.length > 0)) {
            res.send('error 400: invalid or missing ids')
        }

        const response = await client.inventoryApi.batchRetrieveInventoryCounts({
            // catalogObjectIds: [
            //   'I5MRGXSYMBUKCF2YKLWSOWZD',
            //   'MTHPI7YFVLAXIW3PVSRLK2OR',
            //   'T2FNAH6QPWCG4OWB54XKVXXD'
            // ]
            catalogObjectIds
        });
        if (response.result && response.statusCode === 200) {
            console.log('200')
            const result = response.result;
            console.log('square inventory');
            console.log(toJson(result))
            res.send(toJson(result))
        } else {
            console.log('response error', response.statusCode);
            res.send({})
        }
    } catch (err) {
        console.log(err);
        res.send(err)
    }
})

app.get("/idempotency", async (req, res) => {
    console.log('init /idempotency')
    try {
        const {
            scrypt
        } = await import('node:crypto');

        // Using the factory defaults.
        scrypt('password', 'salt' + Math.random(), 64, async (err, derivedKey) => {
            if (err) throw err;
            const result = await derivedKey.toString('hex');
            console.log("derivedKey.toString('hex'):", result);  // '3745e48...08d59ae'
            res.send({idempotency: result})
        });
    } catch (err) {
        console.log(err);
        res.send(err)
    }
})
// https://developer.squareup.com/explorer/square/orders-api/create-order
// try {
//     const response = await client.ordersApi.createOrder({
//       order: {
//         locationId: 'LVN2REE3ETHXP',
//         lineItems: [
//           {
//             name: 'Submariner Original, Black',
//             quantity: '1',
//             catalogObjectId: 'KGIJAH5GRGO2WVT53YRVHJGI',
//             basePriceMoney: {
//               amount: 10600,
//               currency: 'USD'
//             }
//           }
//         ]
//       },
//       idempotencyKey: '2da55989-2365-484e-b672-70e0358be621'
//     });

//     console.log(response.result);
//   } catch(error) {
//     console.log(error);
//   }

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});