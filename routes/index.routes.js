const express = require("express");
const userRoutes = require("./user.routes");
const testRoutes = require("./test.routes");
const packageRoutes = require("./package.routes");

function routes() {

    const router = express.Router();

    router.use("/user", userRoutes);
    router.use("/test", testRoutes);
    router.use("/package", packageRoutes);


    
    return router;
}

module.exports = routes();
