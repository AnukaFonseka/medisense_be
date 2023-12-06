const express = require("express");
const userRoutes = require("./user.routes");
const testRoutes = require("./test.routes")

function routes() {

    const router = express.Router();

    router.use("/user", userRoutes);
    router.use("/test", testRoutes);


    
    return router;
}

module.exports = routes();
