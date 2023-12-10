const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const agenciesController = require("../controller/agencies.controller")

function getAgencyRoutes() {
    const router = express.Router();

    router.use(express.json());
    router.use(authMiddleware);

    router.post("/addAgency", agenciesController.createAgency);
    

    
    
    return router;

}
module.exports = getAgencyRoutes();