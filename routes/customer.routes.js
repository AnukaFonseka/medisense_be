const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const customerController = require("../controller/customer.controller")

function getCustomerRoutes() {
    const router = express.Router();

    router.use(express.json());
    router.use(authMiddleware);
    router.post("/registerCustomer", customerController.registerCustomer);

    return router;
}

module.exports = getCustomerRoutes();