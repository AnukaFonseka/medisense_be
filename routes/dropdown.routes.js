const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const dropdownController = require("../controller/dropdown.controller")

function getDropdownRoutes() {
    const router = express.Router();

    router.use(express.json());
    router.use(authMiddleware);

    //GET
    router.get("/getPaymentMethods", dropdownController.getPaymentMethods);

    
    return router;

}
module.exports = getDropdownRoutes(); 