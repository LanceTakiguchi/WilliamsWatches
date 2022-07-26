"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const square_1 = require("square");
const app = (0, express_1.default)();
const port = 8080; // default port to listen
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});
// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
// square
const client = new square_1.Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: square_1.Environment.Sandbox
});
const { locationsApi, customersApi, ordersApi } = client;
const getLocations = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listLocationsResponse = yield locationsApi.listLocations();
        const locations = listLocationsResponse.result.locations;
        if (locations) {
            locations.forEach((location) => {
                if (location.address) {
                    // tslint:disable-next-line:no-console
                    console.log(location.id + ": " +
                        location.name + ", " +
                        location.address.addressLine1 + ", " +
                        location.address.locality);
                }
                else {
                    // tslint:disable-next-line:no-console
                    console.log(location.id + ": " +
                        location.name + ", ");
                }
            });
        }
    }
    catch (error) {
        if (error instanceof square_1.ApiError) {
            error.result.errors.forEach((e) => {
                // tslint:disable-next-line:no-console
                console.log(e.category);
                // tslint:disable-next-line:no-console
                console.log(e.code);
                // tslint:disable-next-line:no-console
                console.log(e.detail);
            });
        }
        else {
            // tslint:disable-next-line:no-console
            console.log("Unexpected error occurred: ", error);
        }
    }
});
console.log(getLocations());
//# sourceMappingURL=index.js.map