const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const customerController = require("../controller/customer.controller");

function getCustomerRoutes() {
    const router = express.Router();

    router.use(express.json());
    router.use(authMiddleware);

    router.post("/registerCustomer", customerController.registerCustomer);
    router.post("/addCustomerTestsAndPackages/:customerId/:admissionId", customerController.createCustomerTestsAndPackages);
    router.get("/getAllCustomers", customerController.getAllCustomers);
    router.get("/getCustomerById/:customerId", customerController.getCustomerById);

    return router;
}

module.exports = getCustomerRoutes();