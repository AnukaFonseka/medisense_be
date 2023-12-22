const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const cashierController = require("../controller/cashier.controller")

function getCashierRoutes() {
    const router = express.Router();

    router.use(express.json());
    router.use(authMiddleware);

    //GET
    router.get("/getCashierList", cashierController.getCashierList);

    
    return router;

}
module.exports = getCashierRoutes(); 