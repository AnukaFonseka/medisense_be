const express = require("express");
const userRoutes = require("./user.routes");
const testRoutes = require("./test.routes")

function routes() {

    const router = express.Router();

    router.use("/user", userRoutes);
    router.use("/test", testRoutes);
    router.use("/package", packageRoutes);
    router.use("/agency", agencyRoutes);


    
    return router;
}

module.exports = routes();
