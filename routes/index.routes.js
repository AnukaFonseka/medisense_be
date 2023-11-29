const express = require("express");
const userRoutes = require("./user.routes");

function routes() {

    const router = express.Router();

    router.use("/user", userRoutes);


    
    return router;
}

module.exports = routes();
