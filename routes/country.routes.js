const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const countryController = require("../controller/country.controller")

function getCountryRoutes() {
    const router = express.Router();

    router.use(express.json());
    router.use(authMiddleware);

    router.post("/registerCountry", countryController.createCountry);
    router.get("/getAllCountries" ,countryController.getAllCountries);

    return router;
}
module.exports = getCountryRoutes(); 