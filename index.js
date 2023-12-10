const express = require('express');
const app = express();
const cors = require("cors");
// const dotEnv = require("dotenv")

// dotEnv.config()

// const PORT = process.env.PORT || 4000;
// const HOST = process.env.HOST || "10.10.92.143"
app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const routes = require("./routes/index.routes");
app.use("/", routes);

try {
    db.Users.belongsTo(db.Roles, { as: "roles", foreignKey: "roleId"});
    db.Roles.hasMany(db.Users, { as: "users", foreignKey: "roleId"});
    db.Tests.belongsTo(db.Users, {as: "user", foreignKey: "userId"});
    db.Users.hasMany(db.Tests, {as: "tests", foreignKey: "userId"});
    db.Agencies.belongsTo(db.Users, {as: "user", foreignKey: "userId"});
    db.Users.hasMany(db.Agencies, {as: "agencies", foreignKey: "userId"});

    //M-M
    db.Packages.belongsToMany(db.Tests, {through: "PackageTests", foreignKey: "pkgId", onDelete: "cascade"});
    db.Tests.belongsToMany(db.Packages, {through: "PackageTests", foreignKey: "testId", onDelete: "cascade"});
} catch (error) {
    console.log(error);
}


db.sequelize.sync({ alter: true }).then(() => {
    app.listen(3002, () => {
        console.log("SERVER RUNNING ON PORT 3002");
    });

    // app.listen(PORT,HOST,() => console.log(`Server running on ${HOST} at ${PORT}`));
})